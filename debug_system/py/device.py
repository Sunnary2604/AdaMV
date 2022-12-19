import functools
# Create device
class Device:
    def __init__(self, width, height, x, y, id, name):
        self.width = width
        self.height = height
        self.x = x #TopLeft
        self.y = y #TopLeft
        self.id = id
        self.name = name

# Sort x when y overlaps
def compareY(A,B):
    if A[0].x< B[0].x:
        return -1
    elif A[0].x> B[0].x:
        return 1
    elif A[0].x == B[0].x:
        return 0

# Sort y when x overlaps
def compareX(A,B):
    if A[0].y< B[0].y:
        return -1
    elif A[0].y> B[0].y:
        return 1
    elif A[0].y == B[0].y:
        return 0

# The adjacency matrix of the device
def deviceAdjecentM(convertDevices):
    deviceMatrix =  []
    for m in convertDevices:
        tmp = []
        for n in convertDevices:
            tmp.append([])
        deviceMatrix.append(tmp)

    for i in range(len(convertDevices)):
        cdI = convertDevices[i]
        iY = []
        iX = []
        for j in convertDevices[i+1:]:
            if max(cdI.x, j.x) < min(cdI.x+cdI.width, j.x+j.width):
                iX.append(j)
            elif max(cdI.y, j.y) < min(cdI.y+cdI.height, j.y+j.height):
                iY.append(j)
        # Need to determine the overlap inside
        # For y overlap Need to determine if there is x overlap
        iYIndex = [itmp for itmp in range(len(iY))]
        for iyI1 in range(len(iY)):
            for iyI2 in range(len(iY[iyI1+1:])):
                if max(iY[iyI1].x, iY[iyI1+iyI2+1].x)<min(iY[iyI1].x+iY[iyI1].width, iY[iyI1+iyI2+1].x+iY[iyI1+iyI2+1].width):
                    iYIndex[iyI1+iyI2+1] = iYIndex[iyI1]
        iYafter = [[] for itmp in range(len(iYIndex))]
        for itmp in range(len(iYIndex)):
            iYafter[iYIndex[itmp]].append(iY[itmp])
        iYafter = [itmp for itmp in iYafter if len(itmp) != 0]

        iXIndex = [itmp for itmp in range(len(iX))]
        for ixI1 in range(len(iX)):
            for ixI2  in range(len(iX[ixI1+1:])):
                if max(iX[ixI1].y, iX[ixI1+ixI2+1].y) < min(iX[ixI1].y+iX[ixI1].height, iX[ixI2+ixI2+1].y+iX[ixI1+ixI2+1].height):
                    iXIndex[ixI1+ixI2+1] = iXIndex[ixI1]
        iXafter = [[] for itmp in range(len(iXIndex))]
        for itmp in range(len(iXIndex)):
            iXafter[iXIndex[itmp]].append(iX[itmp])
        iXafter = [itmp for itmp in iXafter if len(itmp) != 0]


        iYafter.append([cdI])
        iXafter.append([cdI])
        iYafter.sort(key=functools.cmp_to_key(compareY))
        iXafter.sort(key=functools.cmp_to_key(compareX))
        iY = iYafter
        iX = iXafter
        if len(iY) > 1:
            for iy in range(len(iY)):
                if len(iY[iy]) == 1:
                    if iY[iy][0].x==cdI.x and iY[iy][0].y==cdI.y:
                        if iy == 0:
                            for item in iY[iy+1]:
                                deviceMatrix[cdI.id][item.id] = [1,'h']
                                deviceMatrix[item.id][cdI.id] = [1,'h']
                        elif iy == len(iY)-1:
                            for item in iY[iy-1]:
                                deviceMatrix[cdI.id][item.id] = [1,'h']
                                deviceMatrix[item.id][cdI.id] = [1,'h']
                        else:
                            for item in iY[iy+1]:
                                deviceMatrix[cdI.id][item.id] = [1,'h']
                                deviceMatrix[item.id][cdI.id] = [1,'h']
                            for item in iY[iy-1]:
                                deviceMatrix[cdI.id][item.id] = [1,'h']
                                deviceMatrix[item.id][cdI.id] = [1,'h']   
        if len(iX) >1:
            for ix in range(len(iX)):
                if len(iX[ix]) == 1:
                    if iX[ix][0].x==cdI.x and iX[ix][0].y==cdI.y:
                        if ix == 0:
                            for item in iX[ix+1]:
                                deviceMatrix[cdI.id][item.id] = [1,'v']
                                deviceMatrix[item.id][cdI.id] = [1,'v']
                        elif ix == len(iX)-1:
                            for item in iX[ix-1]:
                                deviceMatrix[cdI.id][item.id] = [1,'v']
                                deviceMatrix[item.id][cdI.id] = [1,'v']
                        else:
                            for item in iX[ix+1]:
                                deviceMatrix[cdI.id][item.id] = [1,'v']
                                deviceMatrix[item.id][cdI.id] = [1,'v']
                            for item in iX[ix-1]:
                                deviceMatrix[cdI.id][item.id] = [1,'v']
                                deviceMatrix[item.id][cdI.id] = [1,'v']
    return deviceMatrix

# Initialize the output device object
def initialOutputDevice(outputDevice):
    outputDevices = []
    for index, outputD in enumerate(outputDevice):
        outputDevices.append(Device(outputD['width'],outputD['height'],outputD['x'],outputD['y'],index,outputD['device']))
    return outputDevices

def initialInputDevice(inputJson):
    inputDevice = Device(inputJson['Modality']['Size']['width'],inputJson['Modality']['Size']['height'],0,0,0,'desktop')
    return inputDevice

# Output permutations after pre-processing permutations
def preDevice(outputDevicesPRes,permutationRes,outputDevices):
    newOutputDevicesPRes = []
    if len(outputDevices) == 1:
        for row in permutationRes:
            temp = []
            for colum in row:
                temp.append(0)
            newOutputDevicesPRes.append(temp)
    else:
        for i in outputDevicesPRes:
            for j in permutationRes:
                newOutputDevicesPRes.append(i)
    return newOutputDevicesPRes