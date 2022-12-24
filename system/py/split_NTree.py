import sys
import copy

from numpy.lib.function_base import delete
sys.path.append('py')
from device import *
from view import *

# Tree nodes
class Node():
    # Initialize a node
    def __init__(self, view = None):
        self.val = view      # Parent node properties
        self.child = []    # List of child nodes
    
    def add_child(self,node):
        self.child.append(node)
    
    def replace_child(self, node):
        self.child = []
        self.child.append(node)
    
    # Sort
    def __lt__(self, other):
        if self.val.y != other.val.y:
            return self.val.y < other.val.y
        else:
            return self.val.x < other.val.x

# Create tree nodes on the data
def initialTreeNode(inputJson, inputDevice,weight):
    TreeNodes  = []
    # Create leaf nodes
    inputJsonStoreOrder = 0
    for view in inputJson['Interface']:
        x = (view['BoundingBox']['CenterPosition']['x']-view['BoundingBox']['Size']['width']/2)*inputDevice.width
        y = (view['BoundingBox']['CenterPosition']['y']-view['BoundingBox']['Size']['height']/2)*inputDevice.height
        w = view['BoundingBox']['Size']['width']*inputDevice.width
        h = view['BoundingBox']['Size']['height']*inputDevice.height
        view = View(x, y, w, h, view['ViewType']['type'])
        view.setInputJsonStoreOrder(inputJsonStoreOrder)
        inputJsonStoreOrder +=1
        TreeNodes.append(Node(view))
    
    for index, value in  enumerate(TreeNodes):
        value.val.aspectRatioWeight = weight.aspectRatios[str(value.val.InputJsonStoreOrder)]
        value.val.relativeSizeWeight = weight.relativeRatios[str(value.val.InputJsonStoreOrder)]
    unSortedTreeNodes = copy.deepcopy(TreeNodes)
    # Sort view nodes left to right top to bottom
    for index, value in  enumerate(TreeNodes):
        value.val.sortedIndex = index
    
    for node in TreeNodes:
        unSortedTreeNodes[node.val.InputJsonStoreOrder].val.sortedIndex = node.val.sortedIndex
    return [TreeNodes,unSortedTreeNodes]


# Returns [True/False, groupView, 'v'/'h']
# [whether the view can be combined, the properties of the combined view, in which way it is stitched]
allowed_error = 20
def group(view1, view2):
    centerX1 = view1.x + view1.width/2
    centerY1 = view1.y + view1.height/2
    centerX2 = view2.x + view2.width/2
    centerY2 = view2.y + view2.height/2
    # Vertical combinations
    if abs(centerX1 - centerX2) < allowed_error  and abs(view1.width - view2.width) < allowed_error:
        if abs((max(centerY1,centerY2) - min(centerY1,centerY2)) - (view1.height+view2.height)/2) < allowed_error:
            if centerY1 < centerY2:
                minY = view1.y
            else:
                minY = view2.y
            groupView = View(view1.x, minY,view1.width, view1.height+view2.height,'g')
            return [True, groupView, 'v']
    # Horizontal combinations
    if abs(centerY1 - centerY2) < allowed_error and abs(view1.height-view2.height) < allowed_error:
        if abs((max(centerX1, centerX2) - min(centerX1, centerX2)) - (view1.width+view2.width)/2)<allowed_error :
            if centerX1 < centerX2:
                minX = view1.x
            else:
                minX = view2.x
            groupView = View(minX, view1.y, view1.width + view2.width, view1.height, 'g')
            return [True, groupView,'h']
    return [False, None, None]

# Confirm the child node of the combination node
def  Identify_children_of_groupNode(node, groupNode, direction):
    # If the node has no child nodes, add it as a child of the combination node directly
    if len(node.child) == 0:
        groupNode.add_child(node)
    else:
        if node.val.isSm == None:
        # If the node has child nodes, determine if the splicing of the node is consistent, and if so, split
            if node.val.groupDirection == direction:
                for n in node.child:
                    groupNode.add_child(n)
                    # Identify_children_of_groupNode(n,groupNode,node.val.groupDirection)
            else:
                groupNode.add_child(node)
        else:
            groupNode.add_child(node)


# Create n-fork tree based on initialized nodes, return root
def createNTree(TreeNodes):
    print(TreeNodes)
    copyTreeNodes = copy.deepcopy(TreeNodes)
    
    # bottom-up until all leaf nodes disappear and become an n-fork tree
    while len(copyTreeNodes) != 1:
        breakflag = False # indicate whether the combination has been made, jump out of the outermost for loop
        # Two by two to determine if the combination is possible
        for index1, node1 in  enumerate(copyTreeNodes):
            for index2, node2 in  enumerate(copyTreeNodes[index1+1:]):
                groupRes =  group(node1.val, node2.val)
                print(groupRes)
                if groupRes[0]:
                    groupNode =  Node(groupRes[1])
                    groupNode.val.groupDirection = groupRes[2]
                    Identify_children_of_groupNode(node1,groupNode,groupRes[2])
                    Identify_children_of_groupNode(node2,groupNode,groupRes[2])
                    sortedIndexs = [node1.val.sortedIndex, node2.val.sortedIndex]# Redefine the sortedIndex of the combined view
                    sortedIndexs.sort()
                    groupNode.val.sortedIndex = sortedIndexs[0]
                    sortedAs = [node1.val.aspectRatioWeight, node2.val.aspectRatioWeight]
                    sortedAs.sort()
                    groupNode.val.aspectRatioWeight = sortedAs[1]
                    sortedRs = [node1.val.relativeSizeWeight, node2.val.relativeSizeWeight]
                    sortedRs.sort()
                    groupNode.val.relativeSizeWeight = sortedRs[1]
                    # Delete two nodes and put the combined node back into the tree
                    iS = [index1,index2+index1+1]
                    iS.sort()
                    copyTreeNodes.pop(iS[0])
                    copyTreeNodes.pop(iS[1]-1)
                    groupNode.child = sorted(groupNode.child, key=lambda x:x.val.sortedIndex, reverse=False)
                    copyTreeNodes.append(groupNode)
                    breakflag = True
                    break
            if breakflag:
                break
    return copyTreeNodes[0]

# Turn the children of the group node in the first level node into a binary tree structure ahead of time
def groupNode_to_biTree(root):
    for nodeIndex in range(len(root.child)):
        if len(root.child[nodeIndex].child) >0:
            nodeChildLen = len(root.child[nodeIndex].child)
            nodeChild = root.child[nodeIndex].child
            nodeChild.sort()
            # Sort by view Back to front Two by two
            for i in range(nodeChildLen-1, 0, -1):
                groupRes = group(nodeChild[i].val, nodeChild[i-1].val)
                if groupRes[0]:
                    groupNode =  Node(groupRes[1])
                    groupNode.val.groupDirection = groupRes[2]
                    groupNode.add_child(nodeChild[i-1])
                    groupNode.add_child(nodeChild[i])
                    sortedIndexs = [nodeChild[i].val.sortedIndex, nodeChild[i-1].val.sortedIndex]# Redefine the index of the combined view
                    sortedIndexs.sort()
                    groupNode.val.sortedIndex = sortedIndexs[0]
                    sortedAs = [nodeChild[i].val.aspectRatioWeight, nodeChild[i-1].val.aspectRatioWeight]
                    sortedAs.sort()
                    groupNode.val.aspectRatioWeight = sortedAs[1]
                    sortedRs = [nodeChild[i].val.relativeSizeWeight, nodeChild[i-1].val.relativeSizeWeight]
                    sortedRs.sort()
                    groupNode.val.relativeSizeWeight = sortedRs[1]
                    nodeChild.pop()
                    nodeChild.pop()
                    nodeChild.append(groupNode)
            root.child[nodeIndex] = nodeChild[0]
    return root

def groupNode_to_fist_biTree(root):
    if len(root.child) >0:
        nodeChildLen = len(root.child)
        nodeChild = root.child
        # Sort by view Back to front Two by two
        for i in range(nodeChildLen-1, 0, -1):
            groupRes = group(nodeChild[i].val, nodeChild[i-1].val)
            if groupRes[0]:
                groupNode =  Node(groupRes[1])
                groupNode.val.groupDirection = groupRes[2]
                groupNode.add_child(nodeChild[i-1])
                groupNode.add_child(nodeChild[i])
                sortedIndexs = [nodeChild[i].val.sortedIndex, nodeChild[i-1].val.sortedIndex]# Redefine the index of the combined view
                sortedIndexs.sort()
                groupNode.val.sortedIndex = sortedIndexs[0]
                sortedAs = [nodeChild[i].val.aspectRatioWeight, nodeChild[i-1].val.aspectRatioWeight]
                sortedAs.sort()
                groupNode.val.aspectRatioWeight = sortedAs[1]
                sortedRs = [nodeChild[i].val.relativeSizeWeight, nodeChild[i-1].val.relativeSizeWeight]
                sortedRs.sort()
                groupNode.val.relativeSizeWeight = sortedRs[1]
                nodeChild.pop()
                nodeChild.pop()
                nodeChild.append(groupNode)
        root = nodeChild[0]
    return root

# Advance sm's node to a 2-fork tree
def groupNode_to_Sm_biTree(root):
    for nodeIndex in range(len(root.child)):
        nodeChildLen = len(root.child)
        nodeChild = root.child
        nodeChild.sort()
        # Sort by view Back to front Two by two
        for i in range(nodeChildLen-1, 0, -1):
            groupRes = group(nodeChild[i].val, nodeChild[i-1].val)
            if groupRes[0]:
                groupNode =  Node(groupRes[1])
                groupNode.val.isSm = True
                groupNode.val.groupDirection = groupRes[2]
                groupNode.add_child(nodeChild[i-1])
                groupNode.add_child(nodeChild[i])
                sortedIndexs = [nodeChild[i].val.sortedIndex, nodeChild[i-1].val.sortedIndex]# Redefine the index of the combined view
                sortedIndexs.sort()
                groupNode.val.sortedIndex = sortedIndexs[0]
                sortedAs = [nodeChild[i].val.aspectRatioWeight, nodeChild[i-1].val.aspectRatioWeight]
                sortedAs.sort()
                groupNode.val.aspectRatioWeight = sortedAs[1]
                sortedRs = [nodeChild[i].val.relativeSizeWeight, nodeChild[i-1].val.relativeSizeWeight]
                sortedRs.sort()
                groupNode.val.relativeSizeWeight = sortedRs[1]
                nodeChild.pop()
                nodeChild.pop()
                nodeChild.append(groupNode)
        root = nodeChild[0]
    return root


# Determine if it is a small multiple
floatE = 0.2
def judgeSmallMultiple(TreeNodes):
    sm = []
    copyTreeNodes = copy.deepcopy(TreeNodes)
    while len(copyTreeNodes) != 0:
        tempNodes = copyTreeNodes[0]
        flag = False
        for smItemIndex in range(len(sm)):
            smItem = sm[smItemIndex][0]
            if tempNodes.val.type == smItem.val.type and abs(tempNodes.val.width - smItem.val.width)<floatE and tempNodes.val.height == smItem.val.height:
                tempNodes.val.isSm = True
                sm[smItemIndex].append(tempNodes)
                flag = True
                break
        if flag == False:
            sm.append([tempNodes])
        del copyTreeNodes[0]
    return sm

def treeToArr(root):
    if root.val.isSm  or len(root.child) == 0:
        return root
    tmp = []
    for c in root.child:
        tmp.append(treeToArr(c))
    return tmp
    

             

def spilt_NTree(inputJson, inputDevice,weight):

    [TreeNodes,unSortedTreeNodes] = initialTreeNode(inputJson, inputDevice,weight)

    # Determine if there is a small multiple
    # Same type, same size
    smallMultiple = judgeSmallMultiple(TreeNodes)

    # Process the input TreeNodes
    NewTreeNodes = []
    for sm in smallMultiple:
        if len(sm) != 1:
            for sms in sm:
                sms.val.isSm = True
            # is small multiple, combined into a large rectangle 
            smRoot = createNTree(sm)
            smRoot = groupNode_to_Sm_biTree(smRoot)
            smRoot.val.isSm = True
            NewTreeNodes.append(smRoot)
        else:
            NewTreeNodes.append(sm[0])           

    # Limited pages
    pageLimitation = len(smallMultiple)

    root = createNTree(NewTreeNodes)

    # 层次遍历 变为数组
    rootArr = treeToArr(root)
    for rootArrItemIndex in range(len(rootArr)):
        if type(rootArr[rootArrItemIndex]) != list:
            rootArr[rootArrItemIndex] = [rootArr[rootArrItemIndex]]
    
    return [root,unSortedTreeNodes,pageLimitation,rootArr]
