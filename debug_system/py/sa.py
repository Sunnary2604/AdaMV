import sys
sys.path.append('py')
from metric import *
import copy
import math
import random
import numpy as np
# import cv2 #2
import sys
import time
# sys.maxsize

# Annealing algorithm Output interface results
# Inputs (output devices, input data, human-controlled weights, whether it is a root node, restrictions on view types)
def sa(outputDevice, inputData, weight, rootFlag, viewTypeContrains):
    
    T_start = 500
    T_end = 1e-5  
    q_ratio = 0.95 
    L_max = 15 
    T = T_start
    LR_changeRate=0
    # best_planing  
    count = 0 # Cool down iterations
    # initial solution scaled to the left
    current_planning =  initialInterface(outputDevice, inputData, rootFlag)
    initial_planning = copy.deepcopy(current_planning)
    [inputDataAspectRatio, inputDataRelativeRatio] = asRatio(inputData,viewTypeContrains,rootFlag)
    test = 1
    if test == 1:
        while(T>T_end):
            i = 0
            while(i<L_max):
                best_planning = copy.deepcopy(current_planning)
              
                current_planning = create_new(current_planning,rootFlag, outputDevice)
                f1 = metric(best_planning, inputDataAspectRatio,inputDataRelativeRatio, initial_planning, weight, outputDevice, rootFlag,viewTypeContrains)
                f2 = metric(current_planning, inputDataAspectRatio,inputDataRelativeRatio, initial_planning, weight, outputDevice, rootFlag,viewTypeContrains)
                
                df = f2 - f1
                if (df > 0):
                    
                    r_prod = random.random()
                    if (r_prod >= math.exp(-df/T)):
                        
                        current_planning = copy.deepcopy(best_planning)
                i+=1
            if(q_ratio+count/12000 <0.99):
                T *= q_ratio+count/12000
            else:
                T *= 0.99 
            count += 1
    else:
        return current_planning
    return best_planning

# Initialize the interface
# For 'root' node Initialize to maintain aspect ratio
# For 'child' node Equalize the area of the parent node
def initialInterface(outputDevice, inputData, rootFlag):
    if rootFlag == 'root':
        tempNodes = copy.deepcopy(inputData)
        tempNodes.val.x = 0
        tempNodes.val.y = 0
        if tempNodes.val.height>tempNodes.val.width:
            tempNodes.val.width = outputDevice.height*tempNodes.val.width/tempNodes.val.height
            if tempNodes.val.width > outputDevice.width:
                tempNodes.val.width = outputDevice.width
            tempNodes.val.height = outputDevice.height
        else:
            tempNodes.val.height = outputDevice.width*tempNodes.val.height/tempNodes.val.width
            if tempNodes.val.height > outputDevice.height:
                tempNodes.val.height = outputDevice.height
            tempNodes.val.width = outputDevice.width
        return tempNodes
    else:
        # Two child nodes split the entire parent node equally
        copyInputData = copy.deepcopy(inputData)
        if (copyInputData.val.isSm == True and copyInputData.val.isSmDirection == None) or copyInputData.val.isSm == None:
            # Horizontal splicing
            if copyInputData.val.groupDirection == 'h':
                copyInputData.child[0].val.x = copyInputData.val.x
                copyInputData.child[0].val.y = copyInputData.val.y
                copyInputData.child[0].val.width = copyInputData.val.width / 2
                copyInputData.child[0].val.height = copyInputData.val.height
                copyInputData.child[1].val.x = copyInputData.val.x + copyInputData.val.width/2
                copyInputData.child[1].val.y = copyInputData.val.y
                copyInputData.child[1].val.width = copyInputData.val.width /2
                copyInputData.child[1].val.height = copyInputData.val.height
            # 垂直拼接
            elif copyInputData.val.groupDirection == 'v':
                copyInputData.child[0].val.x = copyInputData.val.x
                copyInputData.child[0].val.y = copyInputData.val.y
                copyInputData.child[0].val.width = copyInputData.val.width
                copyInputData.child[0].val.height = copyInputData.val.height/2
                copyInputData.child[1].val.x = copyInputData.val.x
                copyInputData.child[1].val.y = copyInputData.val.y + copyInputData.val.height/2
                copyInputData.child[1].val.width = copyInputData.val.width
                copyInputData.child[1].val.height = copyInputData.val.height/2
        elif copyInputData.val.isSm == True:
            if copyInputData.val.isSmDirection == 'h':
                copyInputData.child[0].val.x = copyInputData.val.x
                copyInputData.child[0].val.y = copyInputData.val.y
                copyInputData.child[0].val.width = copyInputData.val.width / 2
                copyInputData.child[0].val.height = copyInputData.val.height
                copyInputData.child[1].val.x = copyInputData.val.x + copyInputData.val.width/2
                copyInputData.child[1].val.y = copyInputData.val.y
                copyInputData.child[1].val.width = copyInputData.val.width /2
                copyInputData.child[1].val.height = copyInputData.val.height
            # Vertical Splicing
            elif copyInputData.val.isSmDirection == 'v':
                copyInputData.child[0].val.x = copyInputData.val.x
                copyInputData.child[0].val.y = copyInputData.val.y
                copyInputData.child[0].val.width = copyInputData.val.width
                copyInputData.child[0].val.height = copyInputData.val.height/2
                copyInputData.child[1].val.x = copyInputData.val.x
                copyInputData.child[1].val.y = copyInputData.val.y + copyInputData.val.height/2
                copyInputData.child[1].val.width = copyInputData.val.width
                copyInputData.child[1].val.height = copyInputData.val.height/2



        return copyInputData

# Extend or flip
# Create a new interface
def create_new(current_planning, rootFlag, outputDevice):

    twoorOne = random.randint(0,1)
    # Only one node then only extend
    if rootFlag == 'root':
        twoorOne = 1

    # is small and not the first time then no flip is allowed
    if current_planning.val.isSm == True and current_planning.val.isSmDirection != None:
        twoorOne = 1

    # Two view flips
    if twoorOne == 0:
        child1 = copy.deepcopy(current_planning.child[0])
        child2 = copy.deepcopy(current_planning.child[1])
        if current_planning.val.groupDirection == 'h':
            child1HeightPercentage = child1.val.width / (child1.val.width+child2.val.width)
            child2HeightPercentage = child2.val.width / (child1.val.width+child2.val.width)
            child1.val.width = child1.val.width+child2.val.width
            child1.val.height = child1.val.height*child1HeightPercentage
            child2.val.x = child1.val.x
            child2.val.y = child1.val.y + child1.val.height
            child2.val.width = child1.val.width
            child2.val.height =  child2.val.height * child2HeightPercentage
            current_planning.val.groupDirection = 'v'
        # y is the same then flip from horizontal to vertical
        elif current_planning.val.groupDirection == 'v':
            child1WidthPercentage = child1.val.height / (child1.val.height+child2.val.height)
            child2WidthPercentage = child2.val.height / (child1.val.height+child2.val.height)
            child1.val.width = child1.val.width*child1WidthPercentage
            child1.val.height = child1.val.height+child2.val.height
            child2.val.x = child1.val.x + child1.val.width
            child2.val.y = child1.val.y
            child2.val.width = child2.val.width*child2WidthPercentage
            child2.val.height = child1.val.height
            current_planning.val.groupDirection = 'h'
        current_planning.child[0] = child1
        current_planning.child[1] = child2    
# Single view stretch
    elif twoorOne == 1:
        if rootFlag == 'root':
            selectView = current_planning.val
            selectSide = random.randint(0,3)
            # The four sides of the view
            # Up
            if selectSide == 0:
                minY = - selectView.y
                maxY = selectView.height
                randomPosition = random.uniform(minY,maxY)
                selectView.y = selectView.y + randomPosition
                selectView.height = selectView.height - randomPosition
            # down
            elif selectSide == 1:
                y = selectView.y + selectView.height
                minY = -selectView.height
                maxY = outputDevice.height - y
                randomPosition = random.uniform(minY,maxY)
                selectView.height = selectView.height+randomPosition
            # left
            elif selectSide == 2:
                minX = - (selectView.x - 0)
                maxX = selectView.width
                randomPosition = random.uniform(minX,maxX)
                selectView.x = selectView.x+randomPosition
                selectView.width = selectView.width - randomPosition
            
            # right
            elif selectSide == 3:
                minX = -selectView.width
                maxX = outputDevice.width - selectView.x - selectView.width
                randomPosition = random.uniform(minX,maxX)
                selectView.width = selectView.width + randomPosition
        else:
            # Determine horizontal or vertical, common side
            child1 = copy.deepcopy(current_planning.child[0])
            child2 = copy.deepcopy(current_planning.child[1])
            if current_planning.val.isSm == True and current_planning.val.isSmDirection != None:
                if current_planning.val.isSmDirection == 'h':
                    minNum = -child1.val.width
                    maxNum = child2.val.width
                    randomPosition = random.uniform(minNum+0.1,maxNum-0.1)
                    child1.val.width = child1.val.width+randomPosition
                    child2.val.x = child2.val.x + randomPosition
                    child2.val.width = child2.val.width - randomPosition
                if current_planning.val.isSmDirection == 'v':
                    minNum = - child1.val.height
                    maxNum =  child2.val.height
                    randomPosition = random.uniform(minNum+0.1,maxNum-0.1)
                    child1.val.height = child1.val.height+randomPosition
                    child2.val.y = child2.val.y+randomPosition
                    child2.val.height = child2.val.height-randomPosition
            else:
                if current_planning.val.groupDirection == 'h':
                    minNum = -child1.val.width
                    maxNum = child2.val.width
                    randomPosition = random.uniform(minNum,maxNum)
                    child1.val.width = child1.val.width+randomPosition
                    child2.val.x = child2.val.x + randomPosition
                    child2.val.width = child2.val.width - randomPosition
                if current_planning.val.groupDirection == 'v':
                    minNum = - child1.val.height
                    maxNum =  child2.val.height
                    randomPosition = random.uniform(minNum,maxNum)
                    child1.val.height = child1.val.height+randomPosition
                    child2.val.y = child2.val.y+randomPosition
                    child2.val.height = child2.val.height-randomPosition
            current_planning.child[0] = child1
            current_planning.child[1] = child2
    return current_planning

# Metrics # c1: space utilization c2: aspect ratio c3: relative size
aspectRatioNomalize = 10
def metric(planning, inputDataAspectRatio,inputDataRelativeRatio, initial_planning, weight, outputDevice, rootFlag, viewTypeContrains):
    
    [planningAspectRatio,planningRelativeRatio] = asRatio(planning,viewTypeContrains,rootFlag)
    if rootFlag == 'root':
        c1 = space_utility(planning,outputDevice)*weight.spaceUtility
        arW = planning.val.aspectRatioWeight
        c2 = (abs(planningAspectRatio-inputDataAspectRatio)/aspectRatioNomalize)*arW
        c3 = abs(planningRelativeRatio-inputDataRelativeRatio)
        c4 = hideMetric(planning, outputDevice, initial_planning)

    else:
        c1 = 0
        planningAspectRatioWeightGroup = []
        planningRelativeRatioWeightGroup = []
        for child in planning.child:
            planningAspectRatioWeightGroup.append(child.val.aspectRatioWeight)
            planningRelativeRatioWeightGroup.append(child.val.relativeSizeWeight)
        c2 = numpy.dot((abs(numpy.array(planningAspectRatio) - numpy.array(inputDataAspectRatio))/(aspectRatioNomalize*len(planning.child))), numpy.array(planningAspectRatioWeightGroup))
        c3 = numpy.dot((abs(planningRelativeRatio-inputDataRelativeRatio))/(len(planning.child)), numpy.array(planningRelativeRatioWeightGroup))
        c4 = 0
    return c1+c2+c3+c4