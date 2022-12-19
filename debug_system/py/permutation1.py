import itertools
import sys
sys.path.append('py')
from split_NTree import *


# Main function Permutation and combination of n-fold trees, permutation and combination of devices
# Return [permutation of views, permutation of devices
def global_permutation(root, outputDevices):
    # The interface has only one view
    if len(root.child) == 0:
        permutationRes = [[[root]]]
    else:
        # Number of interface views greater than or equal to 2
        # Arrange the first level of the tree structure for the number of devices
        permutationRes = permutation(root.child, outputDevices)
        # The result of the permutation of each device interface into a binary tree
        permutationRes = permutationRes_to_biTree(permutationRes)
    # Alignment of devices
    outputDevicesPRes = outputDevice_permutation(outputDevices)
    
    return [permutationRes, outputDevicesPRes]


# Views are grouped by output device
def permutation(nodes,outputDevices):
    permutationBoxes = []
    # If there is only one device, page flip is allowed
    if len(outputDevices) == 1:
        for i in range(1,len(nodes)+1):
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
    arrangeTree = Node()
    for pB in permutationBoxes:
        pBLen = len(pB)
        nodesLen = len(nodes)
        if pBLen == 1:
            arrangeTree.add_child(Node(nodes))
        else:
            for pBIndex in range(0, pBLen):
                # the first box
                if pBIndex == 0:
                    queue = []
                    maxNum = nodesLen-(pBLen-pBIndex-1)
                    minNum = 1
                    for num in range(minNum,maxNum+1):
                        temp = []
                        for i in range(pBIndex,pBIndex+num):
                            temp.append(nodes[i])
                        tempNode = Node(temp)
                        for i in range(pBIndex+num,nodesLen):
                            tempNode.add_child(nodes[i])
                        queue.append(tempNode)
                        arrangeTree.add_child(tempNode)
                # the last box
                elif pBIndex == pBLen-1:
                    queueLen = len(queue)
                    for i in range(queueLen):
                        data = queue[0]
                        data.replace_child(Node(data.child))
                        del queue[0]
                # box in the middle
                else:
                    queueLen = len(queue)
                    for i in range(queueLen):
                        data = queue.pop()
                        nodes = data.child
                        nodesLen = len(nodes)
                        maxNum = nodesLen-(pBLen-pBIndex-1)
                        minNum = 1
                        for num in range(minNum,maxNum+1):
                            temp = []
                            for i in range(0,num):
                                temp.append(nodes[i])
                            tempNode = Node(temp)
                            for i in range(num,nodesLen):
                                tempNode.add_child(nodes[i])
                            queue.append(tempNode)
                            data.replace_child(tempNode)

    return traverse_store(arrangeTree)



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
            for pRIndex in range(len(pR)):
                singleDeviceNodes = pR[pRIndex]
                singleDeviceNodesLen = len(singleDeviceNodes)
                if singleDeviceNodesLen > 1:
                    for i in range(singleDeviceNodesLen-1, 0, -1):
                        groupRes = group(singleDeviceNodes[i].val, singleDeviceNodes[i-1].val)
                        if groupRes[0]:
                            groupNode =  Node(groupRes[1])
                            groupNode.val.groupDirection = groupRes[2]
                            groupNode.add_child(singleDeviceNodes[i-1])
                            groupNode.add_child(singleDeviceNodes[i])
                            sortedIndexs = [singleDeviceNodes[i].val.sortedIndex, singleDeviceNodes[i-1] .val.sortedIndex]# Redefine the index of the combined view
                            sortedIndexs.sort()
                            groupNode.val.sortedIndex = sortedIndexs[0]
                            singleDeviceNodes.pop()
                            singleDeviceNodes.pop()
                            singleDeviceNodes.append(groupNode)
                    pR[pRIndex] = singleDeviceNodes
    return permutationRes

def outputDevice_permutation(outputDevices):
    matrix=[i for i in range(len(outputDevices))]
    outputDevicesPRes = []
    for i in itertools.permutations(matrix,len(outputDevices)):
        outputDevicesPRes.append(i)
    return outputDevicesPRes