import sys
sys.path.append('py')
from sa import *



# Different combinations of views with different combinations of devices
def distribute(permutationRes, outputDevicesPRes,outputDevices,weight,viewTypeContrains):
    # All combination results stored
    distributeRess = []
    for oDPRes in outputDevicesPRes:
        copyPermutationRes = copy.deepcopy(permutationRes)
        for pRes in copyPermutationRes:
            res = []
            for pResIndex in range(len(pRes)):
                subRes = []
                # Customized area of the root node for all interfaces
                if len(outputDevicesPRes) == 1:
                    pRes[pResIndex] = sa(outputDevices[0], pRes[pResIndex], weight, 'root', viewTypeContrains)
                else:
                    pRes[pResIndex] = sa(outputDevices[oDPRes[pResIndex]], pRes[pResIndex], weight, 'root', viewTypeContrains)
                # Hierarchical traversal
                queue = [pRes[pResIndex]]
                layerRoots = []
                flag = 0
                while len(queue) != 0:
                    queueNum = len(queue)
                    if queueNum == 1:
                        node = queue[0]
                        del queue[0]
                        if len(node.child) == 0:
                            # One page only
                            subRes.append(node)
                        else:
                            for n in node.child:
                                queue.append(n)
                            layerRoots.append(node)
                    else:
                        layerNum = len(layerRoots)
                        for sn in range(0, layerNum):
                            parent = layerRoots[0]
                            del layerRoots[0]
                            del queue[0]
                            del queue[0]
                            parent = sa(None, parent,  weight, 'child', viewTypeContrains)
                            for node in parent.child:
                                if len(node.child) == 0:
                                    subRes.append(node)
                                else:
                                    for n in node.child:
                                        if parent.val.isSm == True and parent.val.isSmDirection == None:
                                            n.val.isSmDirection = parent.val.groupDirection
                                        queue.append(n)
                                    if parent.val.isSm == True and parent.val.isSmDirection == None:
                                        node.val.isSmDirection = parent.val.groupDirection
                                    layerRoots.append(node)
                # Panning of pages per page, two or more devices with coordinate attributes
                if len(outputDevicesPRes) != 1:
                    for viewNodes in subRes:
                        viewNodes.val.x =  viewNodes.val.x + outputDevices[oDPRes[pResIndex]].x
                        viewNodes.val.y =  viewNodes.val.y + outputDevices[oDPRes[pResIndex]].y
                res.append(subRes)
            distributeRess.append(res)
    
    return distributeRess