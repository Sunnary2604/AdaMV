import numpy
import sys
sys.path.append('py')
from view import *

MAX_NUM = 10

# Annealing algorithm Preliminary calculation of the aspect ratio and relative size of the input 
def asRatio(inputData,viewTypeContrains,rootFlag):
    if rootFlag == 'root':
        lnputAspectRatio =scaleRatio(inputData.val.width, inputData.val.height,viewTypeContrains,inputData.val.type)
        InputRelativeRatio = 1
    elif rootFlag == 'child':
        lnputAspectRatio = []
        InputRelativeRatio = []
        for c in inputData.child:
            lnputAspectRatio.append(scaleRatio(c.val.width, c.val.height,viewTypeContrains,c.val.type))
            InputRelativeRatio.append(c.val.width*c.val.height)
        sumInputRelativeRatio = sum(numpy.array(InputRelativeRatio))
        InputRelativeRatio = numpy.array(InputRelativeRatio)/sumInputRelativeRatio
    return [lnputAspectRatio, InputRelativeRatio]

def hideMetric(planning, outputDevice, initial_planning):
    if int(initial_planning.val.width) == int(outputDevice.width):
        return 1 - planning.val.width / outputDevice.width
    elif int(initial_planning.val.height) == int(outputDevice.height):
        return 1 - planning.val.height / outputDevice.height

# Calculate the aspect ratio and relative size ratio in the solution, as a percentage
aspectRatioNomalize = 10
def solutionRatio_SpaceUtility(drItem, inputViewNodes, viewTypeContrains, weight, outputDevice,convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight):
    drItemAspectRatio = []
    inputViewNodesAspectRatio = []
    aspectRatioWeight = []
    spaceUtilityScore = 0
    for drI in drItem:
        drItemAspectRatio.append(scaleRatio(drI.val.width, drI.val.height, viewTypeContrains,drI.val.type))
        matchedNodes = inputViewNodes[drI.val.InputJsonStoreOrder]
        drI.val.isRotate = IsRotate(drI.val.width, drI.val.height, matchedNodes.val.width,matchedNodes.val.height,viewTypeContrains,matchedNodes.val.type)
        inputViewNodesAspectRatio.append(scaleRatio(matchedNodes.val.width,matchedNodes.val.height, viewTypeContrains, matchedNodes.val.type))
        convertViewRelativeRatio.append(drI.val.width*drI.val.height)
        inputViewRelativeRatio.append(matchedNodes.val.width*matchedNodes.val.height)
        aspectRatioWeight.append(weight.aspectRatios[str(drI.val.InputJsonStoreOrder)])
        viewRelativeRatioWeight.append(weight.relativeRatios[str(drI.val.InputJsonStoreOrder)])
        spaceUtilityScore += drI.val.width*drI.val.height
    aspectRatioScore = numpy.dot(abs(numpy.array(drItemAspectRatio)-numpy.array(inputViewNodesAspectRatio))/(aspectRatioNomalize), numpy.array(aspectRatioWeight))
   
    return [aspectRatioScore, [convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight],1-spaceUtilityScore/(outputDevice.width*outputDevice.height)]

def scaleRatio(width, height,viewTypeContrains, type):
    x0 = viewTypeContrains[type].ar[0]
    x1 = viewTypeContrains[type].ar[1]
    if viewTypeContrains[type].rotate:
        r = width/height
        if r < x0 :
            scaleR = MAX_NUM
        elif r < 1:
            scaleR = ((1/r - 1/x0) / (1 - 1/x0))/2
        elif r<= x1:
            scaleR = ((r - 1) / (x1 - 1) + 1)/2
        else:
            scaleR = MAX_NUM
    else:
        r = width/height
        
        if r < x0 :
            scaleR = MAX_NUM
        elif r>=x0 and r <= x1:
            scaleR = r
        else:
            scaleR = MAX_NUM
    
    return scaleR
def IsRotate(width,height,matchedNodesWidth, matchedNodesHeight,viewTypeContrains,type):
    if viewTypeContrains[type].rotate:
        if abs(width/height-matchedNodesWidth/matchedNodesHeight) > abs(height/width-matchedNodesWidth/matchedNodesHeight):
            return True
        else:
            return False
    else:
        return False



# Space utilization
def space_utility(planning, outputDevice):
    metricSpaceUtility = planning.val.width* planning.val.height / (outputDevice.width*outputDevice.height)
    return 1-metricSpaceUtility


pageError = 1


def informationFlow(nodes, originalNodes, weight):
    # Find existing nodes from the original node
    filterOriginalNodes = []
    for i in nodes:
        filterOriginalNodes.append(originalNodes[i.val.InputJsonStoreOrder])
    leftAdjecent = adjacentMatrix(nodes, len(originalNodes))
    rightAdjecent = adjacentMatrix(filterOriginalNodes,len(originalNodes))
    m = []

    for i in leftAdjecent:
        if i not in m:
            m.append(i)
    for j in rightAdjecent:
        if j not in m:
            m.append(j)
    # One-dimensional matrix
    allLen = len(originalNodes)+len(m)

    leftWL = WL(allLen, nodes, leftAdjecent,m)
    rightWL = WL(allLen,filterOriginalNodes, rightAdjecent,m)

    metric_wl = 0
    sum_wl = 0
    for i in range(allLen):
        metric_wl += abs(leftWL[i]-rightWL[i])
        sum_wl += max(leftWL[i], rightWL[i])

    return (metric_wl/sum_wl)*weight.informationFlow


# Global flow of information between views
def globalInformation(deviceMatrix, outputDevices, matchDevice,matchView,globalIf,inputViewNodes,solution,weight):
    globalInfos = []
        # The whole interface
    for i in range(len(outputDevices)):
        for j in range(len(outputDevices[i+1:])):
            interfaces = []
            if len(deviceMatrix[outputDevices[i].id][outputDevices[i+j+1].id]) != 0:
                for test in range(len(matchDevice)):
                    if matchDevice[test] == i:
                        interfaces.append(matchView[test])
                    elif matchDevice[test] == i+j+1:
                        interfaces.append(matchView[test])
                if deviceMatrix[outputDevices[i].id][outputDevices[i+j+1].id][1] == 'h':
                    # left/right
                    if outputDevices[i].x < outputDevices[i+j+1].x:
                        maxX= outputDevices[i].x+outputDevices[i].width
                        interfaces0 = []
                        for vi in interfaces[0]:
                            if vi.val.x + vi.val.width == maxX:
                                interfaces0.append(vi)
                        minX = outputDevices[i+j+1].x
                        interfaces1 = []
                        for vj in interfaces[1]:ces1 = []
                        for vj in interfaces[0]:
                            if vj.val.x == minX:
                                interfaces1.append(vj)
                    for vi in interfaces0:
                        for vj in interfaces1:
                            if max(vi.val.y, vj.val.y) < min(vi.val.y+vi.val.height, vj.val.y+vj.val.height):
                                globalIf[vi.val.InputJsonStoreOrder][vj.val.InputJsonStoreOrder] = 1
                                globalIf[vj.val.InputJsonStoreOrder][vi.val.InputJsonStoreOrder] = 1
                elif deviceMatrix[outputDevices[i].id][outputDevices[i+j+1].id][1] == 'v':
                    # top/down
                    if outputDevices[i].y < outputDevices[i+j+1].y:
                        maxY= outputDevices[i].y+outputDevices[i].height
                        interfaces0 = []
                        for vi in interfaces[0]:
                            if vi.val.y + vi.val.height == maxY:
                                interfaces0.append(vi)
                        minY = outputDevices[i+j+1].y
                        interfaces1 = []
                        for vj in interfaces[1]:
                            if vj.val.y == minY:
                                interfaces1.append(vj)
                    elif outputDevices[i].y > outputDevices[i+j+1].y:
                        maxY= outputDevices[i+j+1].y+outputDevices[i+j+1].height
                        interfaces0 = []
                        for vi in interfaces[1]:
                            if vi.val.y + vi.val.height == maxY:
                                interfaces0.append(vi)
                        minY = outputDevices[i].y
                        interfaces1 = []
                        for vj in interfaces[0]:
                            if vj.val.y == minY:
                                interfaces1.append(vj)
                    for vi in interfaces[0]:
                        for vj in interfaces[1]:
                            if max(vi.val.x, vj.val.x) < min(vi.val.x+vi.val.width, vj.val.x+vj.val.width):
                                globalIf[vi.val.InputJsonStoreOrder][vj.val.InputJsonStoreOrder] = 1
                                globalIf[vj.val.InputJsonStoreOrder][vi.val.InputJsonStoreOrder] = 1
    outputAdjecent = []
    for i in range(len(inputViewNodes)):
        temp = str(i)
        for j in range(len(inputViewNodes)):
            if globalIf[i][j] == 1: temp = temp + ',' + str(j)
        outputAdjecent.append(temp)
    globalIfScore = globalInfomationFlowScore(outputAdjecent, inputViewNodes)*weight.informationFlow
    solution.score.informationFlow += globalIfScore
    return solution

# Calculate the global information flow score
def globalInfomationFlowScore(outputAdjecent, inputViewNodes):
    inputAdjecent = adjacentMatrix(inputViewNodes, len(inputViewNodes))
    m = []
    for i in inputAdjecent:
        if i not in m:
            m.append(i)
    for j in outputAdjecent:
        if j not in m:
            m.append(j)
    # One-dimensional matrix
    allLen = len(inputViewNodes)+len(m)

    inputWL = WL(allLen, inputViewNodes, inputAdjecent,m)
    outputWL = WL(allLen,inputViewNodes, outputAdjecent,m)
    metric_wl = 0
    sum_wl = 0
    for i in range(allLen):
        metric_wl += abs(inputWL[i]-outputWL[i])
        sum_wl += max(inputWL[i], outputWL[i])
    return metric_wl/sum_wl

# Information flow of views in a single presentation screen
def singleDeviceInformation(interface,globalIf):
    for i in range(len(interface)):
        vi = interface[i]
        for j in interface[i+1:]:
            if judgeAdjacent(vi,j):
                globalIf[vi.val.sortedIndex][j.val.sortedIndex] = 1
                globalIf[j.val.sortedIndex][vi.val.sortedIndex] = 1
    return globalIf



# Calculation of WL indicators (graph theory)
def WL(length,data,adjacent_matrix,m):
    wl = numpy.zeros(length)
    for i in data:
        wl[int(i.val.sortedIndex)] += 1
    for i in adjacent_matrix:
        wl[length-len(m)+m.index(i)] +=1
    return wl


# Adjacency matrix Returns a 1-dimensional array of neighboring nodes stitched together as a string 1 and 2, 3 adjacent to '1, 2, 3'
def adjacentMatrix(nodes, originalNodesLen):
    aMatrix = numpy.ones((originalNodesLen,originalNodesLen))*0
    
    for i in range(len(nodes)):
        vi = nodes[i]
        for j in nodes[i+1:]:
            if judgeAdjacent(vi,j):
                aMatrix[vi.val.sortedIndex][j.val.sortedIndex] = 1
                aMatrix[j.val.sortedIndex][vi.val.sortedIndex] = 1
    adM = []
    for i in nodes:
        temp = str(i.val.sortedIndex)
        for j in nodes:
            if aMatrix[i.val.sortedIndex][j.val.sortedIndex] == 1: temp = temp + ',' + str(j.val.sortedIndex)
        adM.append(temp)
    return adM
          
# Determine if two rectangles are adjacent to each other
def judgeAdjacent(idata,jdata):
    iBbox = idata.val
    jBbox = jdata.val
    # horizontal
    iEdge = [[iBbox.y,iBbox.y+iBbox.height],[iBbox.x,iBbox.x+iBbox.width],[iBbox.x,iBbox.x+iBbox.width],[iBbox.y,iBbox.y+iBbox.height]]

    jEdge = [[jBbox.y,jBbox.y+jBbox.height],[jBbox.x,jBbox.x+jBbox.width],
    [jBbox.x,jBbox.x+jBbox.width],[jBbox.y,jBbox.y+jBbox.height]]


    if judgeEdge(iEdge,jEdge,0,1) or judgeEdge(iEdge,jEdge,2,3):
        return True
    else:
        return False

error = 1
# Determine if two edges are adjacent
def judgeEdge(iEdge,jEdge,m,n):
    if abs(iEdge[m][0]-jEdge[m][0])<error or abs(iEdge[m][0]-jEdge[m][1])<error or abs(iEdge[m][1]-jEdge[m][0])<error or abs(iEdge[m][1]-jEdge[m][1])<error:
        if max(iEdge[n][0],jEdge[n][0]) <= min(iEdge[n][1],jEdge[n][1]):
            return True
    return False


def scrollPageInfo(aMatrix, matchView,inputViewNodes, weight):
    for i in range(len(matchView)-1):
        prePage = matchView[i]
        curPage = matchView[i+1]

        # Find all rectangles at the bottom of the prePage
        maxPreHeight = -9999
        for idata in prePage:
            maxPreHeight = max(maxPreHeight, idata.val.y+idata.val.height)
        newPrePage = []
        for idata in prePage:
            if maxPreHeight == idata.val.y+idata.val.height:
                newPrePage.append(idata)
        
        minCurPage = 9999
        for jdata in curPage:
            minCurPage = min(minCurPage, jdata.val.y)
        newCurPage = []
        for jdata in curPage:
            if minCurPage == jdata.val.y:
                newCurPage.append(jdata)

        for idata in newPrePage:
            for jdata in newCurPage:
                if judgeAdjacentScoll(idata, jdata):
                    aMatrix[idata.val.sortedIndex][jdata.val.sortedIndex] = 1
                    aMatrix[jdata.val.sortedIndex][idata.val.sortedIndex] = 1
    return commonIn(inputViewNodes,aMatrix,weight)




def turnPageInfo(aMatrix, matchView, inputViewNodes, weight):
    for i in range(len(matchView)-1):
        prePage = matchView[i]
        curPage = matchView[i+1]

        # Find all the rightmost rectangles of the prePage
        maxPreWidth = -9999
        for idata in prePage:
            maxPreWidth = max(maxPreWidth, idata.val.x+idata.val.width)
        newPrePage = []
        for idata in prePage:
            if maxPreWidth == idata.val.x+idata.val.width:
                newPrePage.append(idata)
        
        minCurPage = 9999
        for jdata in curPage:
            minCurPage = min(minCurPage, jdata.val.x)
        newCurPage = []
        for jdata in curPage:
            if minCurPage == jdata.val.x:
                newCurPage.append(jdata)
            

        for idata in newPrePage:
            for jdata in newCurPage:
                if judgeAdjacentTurn(idata, jdata):
                    aMatrix[idata.val.sortedIndex][jdata.val.sortedIndex] = 1
                    aMatrix[jdata.val.sortedIndex][idata.val.sortedIndex] = 1
    return commonIn(inputViewNodes,aMatrix,weight)


def commonIn(inputViewNodes,aMatrix,weight):
    outputAdjecent = []
    for i in inputViewNodes:
        temp = str(i.val.sortedIndex)
        for j in inputViewNodes:
            if aMatrix[i.val.sortedIndex][j.val.sortedIndex] == 1: 
                temp = temp + ',' + str(j.val.sortedIndex)
        outputAdjecent.append(temp)


    inputAdjecent = adjacentMatrix(inputViewNodes, len(inputViewNodes))

    m = []
    for i in inputAdjecent:
        if i not in m:
            m.append(i)
    for j in outputAdjecent:
        if j not in m:
            m.append(j)
    
    allLen = len(inputViewNodes)+len(m)

    inputWL = WL(allLen, inputViewNodes, inputAdjecent,m)
    outputWL = WL(allLen,inputViewNodes, outputAdjecent,m)
    metric_wl = 0
    sum_wl = 0
    for i in range(allLen):
        metric_wl += abs(inputWL[i]-outputWL[i])
        sum_wl += max(inputWL[i], outputWL[i])
    return (metric_wl/sum_wl) *weight.informationFlow



def matrixBuild(aMatrix, nodes):
    
    for i in range(len(nodes)):
        vi = nodes[i]
        for j in nodes[i+1:]:
            if judgeAdjacent(vi,j):
                aMatrix[vi.val.sortedIndex][j.val.sortedIndex] = 1
                aMatrix[j.val.sortedIndex][vi.val.sortedIndex] = 1
    return aMatrix

def judgeAdjacentTurn(idata, jdata):
    iBbox = idata.val
    jBbox = jdata.val
    
    iEdge = [iBbox.y, iBbox.y+iBbox.height]
    jEdge = [jBbox.y, jBbox.y+jBbox.height]

    if (iEdge[0] >= jEdge[0] and iEdge[0] <= jEdge[1]) or (jEdge[0] >= iEdge[0] and jEdge[0] <= iEdge[1]):
        return True
    else:
        return False

def judgeAdjacentScoll(idata, jdata):
    iBbox = idata.val
    jBbox = jdata.val
    # horizontal
    iEdge = [iBbox.x,iBbox.x+iBbox.width]

    jEdge = [jBbox.x,jBbox.x+jBbox.width]


    if (iEdge[0] >= jEdge[0] and iEdge[0] <= jEdge[1]) or (jEdge[0] >= iEdge[0] and jEdge[0] <= iEdge[1]):
        return True
    else:
        return False
