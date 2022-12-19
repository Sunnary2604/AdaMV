import sys
sys.path.append('py')
from device import *
from view import *
from split_NTree import *
from permutation import *
from distribute import *
from find_best_solution import *


def layout(outputDevices, inputJson, weight):
    # Create input and output device objects
    time1 = time.time()
    inputDevice = initialInputDevice(inputJson)
    outputDevices = initialOutputDevice(outputDevices)

    # Restructuring weights
    weight = setWeight(weight)
    
    # Initialize view type constraints
    viewTypeContrains =  setViewtypeContrains()

    # Turn the interface into an n-tree, and also output the initial view node
    [root, inputViewNodes,pageLimitation,rootArr] = spilt_NTree(inputJson, inputDevice,weight)

    # if len(outputDevices) != 1 and len(root.child) < len(outputDevices):
    #     del outputDevices[len(root.child):len(outputDevices)]

    # Permutation of n-fold trees and permutation of output devices
    [permutationRes, outputDevicesPRes] = global_permutation(root, outputDevices,pageLimitation,rootArr,weight)
    time2 = time.time()
    # View distribution to devices
    distributeRess = distribute(permutationRes,outputDevicesPRes,outputDevices,weight,viewTypeContrains)

    time3 = time.time()

    print("tree:", time2-time1, "simula",time3-time2,"group", len(permutationRes))
    # Rearrange the output device to process the data interface
    newOutputDevicesPRes = preDevice(outputDevicesPRes,permutationRes,outputDevices)
    
     # Select the best solution from attributeRess
    best_solution = find_best_solution(distributeRess, newOutputDevicesPRes, outputDevices, inputViewNodes,viewTypeContrains,weight)
    
    return best_solution



    






    # print('yes')




    

    


