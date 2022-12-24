import sys
sys.path.append('py')
from metric import *
from device import *
import copy

# Solutions
class Solution:
    def __init__(self):
        self.views = []
        self.devices = []
        self.score = Score()
    
    def setSolution(self, views, device):
        self.views.append(views)
        self.devices.append(device)
    
    def __lt__(self, other):
        return self.score.sumScore() < other.score.sumScore()


# Solution Score
class Score:
    def __init__(self):
        self.spaceUtility = 0
        self.aspectRatio = 0
        self.informationFlow = 0
        self.informationFlowTurn = 0
        self.informationFlowScroll = 0
        self.relativeRatio = 0
        self.deviceOccupancy = 0
        self.smallSize = 0
        self.inforFlag = "normal"


    def sumScore(self):
        if self.inforFlag == "normal":
            return self.spaceUtility+self.aspectRatio+self.informationFlow+self.relativeRatio+self.deviceOccupancy+self.smallSize
        elif self.inforFlag == "turn":
            return self.spaceUtility+self.aspectRatio+self.informationFlowTurn+self.relativeRatio+self.deviceOccupancy+self.smallSize
        else:
            return self.spaceUtility+self.aspectRatio+self.informationFlowScroll+self.relativeRatio+self.deviceOccupancy+self.smallSize

# Calculate the score for one interface's view in each solution
def metric(drItem, inputViewNodes, solution, outputDevices, viewTypeContrains, weight, outputDeviceLen,globalIf,convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight):
    [aspectRatioScore, [convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight], spaceUtilityScore] = solutionRatio_SpaceUtility(drItem, inputViewNodes, viewTypeContrains, weight, outputDevices,convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight)
    solution.score.aspectRatio += aspectRatioScore
    # solution.score.relativeRatio += relativeRatioScore
    solution.score.spaceUtility += spaceUtilityScore
    if outputDeviceLen == 1:
        globalIf = matrixBuild(globalIf, drItem)
        # if len(drItem) > 2:
        # Calculate the information flow score of a single page
        #     globalIf = informationFlow(drItem, inputViewNodes, weight)
        # else:
        #     globalIf = 0

    else:
        if len(drItem) > 2:
            singleDeviceInformation(drItem,globalIf)
        elif len(drItem) == 2:
            globalIf[drItem[0].val.sortedIndex][drItem[1].val.sortedIndex] = 1
            globalIf[drItem[1].val.sortedIndex][drItem[0].val.sortedIndex] = 1
    # if len(drItem) == 2:
    #     globalIf[drItem[0].val.sortedIndex][drItem[1].val.sortedIndex] = 1
    #     globalIf[drItem[1].val.sortedIndex][drItem[0].val.sortedIndex] = 1
    # elif len(drItem) > 2:
    #     singleDeviceInformation(drItem,globalIf)
    #         # solution.score.informationFlow += informationFlow(drItem,inputViewNodes,weight)
    # # else:
    #     if len(drItem) > 2:
    #         singleDeviceInformation(drItem,globalIf)
    #     elif len(drItem) == 2:
    #         globalIf[drItem[0].val.sortedIndex][drItem[1].val.sortedIndex] = 1
    #         globalIf[drItem[1].val.sortedIndex][drItem[0].val.sortedIndex] = 1
    return [solution, globalIf,[convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight]]

def normalization(solution, InformationFlowRange,aspectRatioRange,relativeRatioRange,deviceOccupancyRange,spaceUtilityRange,smallSizeRange,weight):
    if InformationFlowRange !=0:
        # solution.score.informationFlow *= (1/InformationFlowRange)
        # solution.score.informationFlowScroll *= (1/InformationFlowRange)
        # solution.score.informationFlowTurn *= (1/InformationFlowRange)
        solution.score.informationFlow *= 1
        solution.score.informationFlowScroll *= 1
        solution.score.informationFlowTurn *= 1
    if aspectRatioRange != 0:
        solution.score.aspectRatio *=  (1/aspectRatioRange)
    if relativeRatioRange != 0 and relativeRatioRange > 0.07:
        solution.score.relativeRatio *= (1/relativeRatioRange)
    if deviceOccupancyRange != 0:
        # solution.score.deviceOccupancy *=1.1
        solution.score.deviceOccupancy *= (1/deviceOccupancyRange)*1.7
    if spaceUtilityRange != 0:
        solution.score.spaceUtility = solution.score.spaceUtility
        # solution.score.spaceUtility *= (1/spaceUtilityRange)
    if smallSizeRange != 0:
        if weight.spaceUtility == 0 or weight.aspectRatios['0'] == 0 or  weight.relativeRatios['0'] == 0:
            solution.score.smallSize = 0
        else:
            solution.score.smallSize *= 1
    return solution

# Choose the optimal solution from the distribution results
def find_best_solution(distributeRess, outputDevicesPRes, outputDevices, inputViewNodes, viewTypeContrains, weight):
    # 
    InformationFlowRange = -9999
    aspectRatioRange = -9999
    relativeRatioRange = -9999
    deviceOccupancyRange = -9999
    spaceUtilityRange = -9999
    smallSizeRange = -9999

    if len(outputDevices) > 1:
        deviceMatrix = deviceAdjecentM(outputDevices)
    solutions = []
    for dr in range(len(distributeRess)):
        globalIf = numpy.ones((len(inputViewNodes),len(inputViewNodes)))*0
        matchDevice = outputDevicesPRes[dr]
        solution = Solution()
        matchView = distributeRess[dr]
        convertViewRelativeRatio = []
        inputViewRelativeRatio = []
        viewRelativeRatioWeight = []
        for drItem in range(len(matchView)):
            # Storage Solutions
            solution.setSolution(matchView[drItem],outputDevices[matchDevice[drItem]])
            # Calculate the score
            [solution, globalIf,[convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight]] = metric(matchView[drItem], inputViewNodes, solution, outputDevices[matchDevice[drItem]], viewTypeContrains, weight, len(outputDevices),globalIf,
            convertViewRelativeRatio,inputViewRelativeRatio,viewRelativeRatioWeight)
            # if len(outputDevices) == 1:
            #     solution.score.informationFlow += globalIf
        if len(matchDevice) > 1:
            solution.score.informationFlowTurn = turnPageInfo(copy.deepcopy(globalIf), matchView, inputViewNodes, weight)
            solution.score.informationFlowScroll = scrollPageInfo(copy.deepcopy(globalIf), matchView, inputViewNodes, weight)
        elif len(matchDevice) == 1:
            solution.score.informationFlow = commonIn(inputViewNodes,globalIf,weight)

            # solution.score.informationFlowScroll += 
        # if len(outputDevices) > 1:
        #     solution = globalInformation(deviceMatrix, outputDevices, matchDevice,matchView, globalIf,inputViewNodes,solution,weight)
        # if len(outputDevices) == 1:
        #     solution.score.informationFlow += globalIf
        #     solution.score.informationFlow = globalPageInformation(globalIf, inputViewNodes,matchDevice,outputDevices,matchView)*weight.informationFlow
            # solution.score.deviceOccupancy += (len(matchDevice)-1)/len(outputDevicesPRes[0])
        solution.score.deviceOccupancy = len(matchView)/len(inputViewNodes)
        solution.score.aspectRatio /= len(inputViewNodes)
        solution.score.relativeRatio = (numpy.dot(abs(numpy.array(convertViewRelativeRatio)/sum(numpy.array(convertViewRelativeRatio))
        -numpy.array(inputViewRelativeRatio)/sum(numpy.array(inputViewRelativeRatio))), numpy.array(viewRelativeRatioWeight)))/len(inputViewNodes)
        if len(outputDevices) == 1:
            for areaIndex in range(len(convertViewRelativeRatio)):
                if convertViewRelativeRatio[areaIndex] < 180*180:
                    solution.score.smallSize += 200*200 - convertViewRelativeRatio[areaIndex]
        if len(matchDevice) > 1:
            newSolution1 = copy.deepcopy(solution)
            newSolution1.score.inforFlag = "turn"
            solutions.append(newSolution1)

            newSolution1 = copy.deepcopy(solution)
            newSolution1.score.inforFlag = "scoll"
            solutions.append(newSolution1)

        elif len(matchDevice) == 1:
            solutions.append(solution)
        InformationFlowRange = solution.score.informationFlow if InformationFlowRange < solution.score.informationFlow else InformationFlowRange
        InformationFlowRange = solution.score.informationFlowTurn if InformationFlowRange < solution.score.informationFlowTurn else InformationFlowRange
        InformationFlowRange = solution.score.informationFlowScroll if InformationFlowRange < solution.score.informationFlowScroll else InformationFlowRange
        aspectRatioRange = solution.score.aspectRatio if aspectRatioRange < solution.score.aspectRatio else aspectRatioRange
        relativeRatioRange = solution.score.relativeRatio if relativeRatioRange < solution.score.relativeRatio else relativeRatioRange
        deviceOccupancyRange = solution.score.deviceOccupancy if deviceOccupancyRange < solution.score.deviceOccupancy else deviceOccupancyRange
        spaceUtilityRange = solution.score.spaceUtility if spaceUtilityRange < solution.score.spaceUtility else spaceUtilityRange
        smallSizeRange = solution.score.smallSize if smallSizeRange < solution.score.smallSize else smallSizeRange
    # Normalize all solutions
    
    for sIndex in range(len(solutions)):
        solutions[sIndex] = normalization(solutions[sIndex],InformationFlowRange,aspectRatioRange,relativeRatioRange,deviceOccupancyRange,spaceUtilityRange,smallSizeRange,weight)
    solutions.sort()
    return  solutions[0]
