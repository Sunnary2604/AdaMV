from copy import deepcopy
import itertools
import sys
sys.path.append('py')
from split_NTree import *



# Main function Permutation and combination of n-fold trees, permutation and combination of devices
# Return [permutation of views, permutation of devices
def global_permutation(root, outputDevices,pageLimitation,rootArr,weight):

    if pageLimitation > 3:
        pageLimitation = 3
    # The interface has only one view
    if len(root.child) == 0:
        permutationRes = [[[root]]]
    else:
        # Number of interface views greater than or equal to 2
        # Arrange the first level of the tree structure for the number of devices
        permutationRes = permutation(root.child, outputDevices,pageLimitation,rootArr)
        # The result of the permutation of each device interface into a binary tree
        permutationRes = permutationRes_to_biTree(permutationRes)
    # Alignment of devices
    outputDevicesPRes = outputDevice_permutation(outputDevices)
    
    return [permutationRes, outputDevicesPRes]


# Views are grouped by output device
def permutation(nodes,outputDevices,pageLimitation,rootArr):
    permutationBoxes = []
    # If there is only one device, page flip is allowed
    if len(outputDevices) == 1:
        for i in range(1,pageLimitation+1):
            box = []
            for j in range(i):
                box.append([])
            permutationBoxes.append(box)
    # If greater than or equal to 2 devices, then according to the number of devices specified box
    else:
    
    # trick
        if len(outputDevices) == 3 and nodes[0].val.type == 'g' and nodes[0].child[1].val.isSm == True:
            nodes = [nodes[0].child[0],nodes[0].child[1],nodes[1]]
            print('yes')

    # Arrange combinations
        box = []
        for i in range(len(outputDevices)):
            box.append([])
        permutationBoxes.append(box)

    # Build a combination tree
    res = []
    for pB in permutationBoxes:
        pBLen = len(pB)
        if pBLen == 1:
           res.append([rootArr])
        else:
            if len(rootArr) >= pBLen:
                if pBLen == 2:
                    for rootA in range(1, len(rootArr)):
                        res.append([rootArr[:rootA], rootArr[rootA:len(rootArr)]])
                else:
                    dfs(rootArr, pBLen, 0, res, [], 0)
            elif len(rootArr) < pBLen:
                for resItem in res:
                   # From one box to two
                    if len(resItem) == pBLen-1:
                        for resSubItemIndex in range(len(resItem)):
                            resSubItem = resItem[resSubItemIndex]
                            if type(resSubItem[0][0]) != list and resSubItem[0][0].val.isSm == True:
                                continue
                            if len(resSubItem[0]) != 1:
                                for resSubItemA in range(1, len(resSubItem[0])):
                                    tmp = deepcopy(resItem)
                                    del(tmp[resSubItemIndex])
                                    tmp.insert(resSubItemIndex, [resSubItem[0][:resSubItemA]])
                                    tmp.insert(resSubItemIndex+1, [resSubItem[0][resSubItemA:len(resSubItem[0])]])
                                    res.append(tmp)
                                
                                
                        print(resItem)
    return res

def dfs(rootArr, pBLen, indexpB, res, path, start):
    if indexpB == pBLen:
        res.append(path)
        return
    
    for i in range(1, len(rootArr)-start - (pBLen-indexpB)+2):
        path.append(rootArr[start:start+i])
        dfs(rootArr, pBLen, indexpB+1, res, deepcopy(path), start+i)
        path.pop()
    return res

# Store each path of the combinatorial tree
def traverse_store(root):
    stack = []
    permutationRes = []
    stack.append(root)
    tempPermutationRes = []
    while len(stack) != 0:
        node = stack.pop()
        for c in node.child:
            stack.append(c)
        if node.val != None:
            tempPermutationRes.append(node.val)
            if len(node.child) ==0:
                permutationRes.append(tempPermutationRes)
                tempPermutationRes = []
    return permutationRes

# The result of arranging the combination into a binary tree
def permutationRes_to_biTree(permutationRes):
    if len(permutationRes) != 0:
        for pR in permutationRes:
            print(pR)
            for pRIndex in range(len(pR)):
                respRIndex = []
                defR(pR[pRIndex], respRIndex)
                root = createNTree(respRIndex)
                root = groupNode_to_biTree(root)
                if len(root.child) >2:
                    root = groupNode_to_fist_biTree(root)
                pR[pRIndex] = root
    return permutationRes


def defR(pR, res):
    
    if type(pR) == list:
        for pRItem in pR:
            defR(pRItem, res)
    else:
        res.append(pR)


def outputDevice_permutation(outputDevices):
    matrix=[i for i in range(len(outputDevices))]
    outputDevicesPRes = []
    for i in itertools.permutations(matrix,len(outputDevices)):
        outputDevicesPRes.append(i)
    return outputDevicesPRes


