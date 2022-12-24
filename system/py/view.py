class ViewType():
    def __init__(self,type, can_rotate, ar_range):
        self.viewtype = type       # View type
        self.rotate = can_rotate   # Can be rotated
        self.ar = ar_range         # Aspect Ratio Range

# Set whether different view types can be rotated, and the aspect ratio range
def setViewtypeContrains():
    bar = ViewType('bar', True, [1/7, 7])
    line = ViewType('line', False, [1/5, 5])
    maps = ViewType('map', False, [1/2, 2])
    point = ViewType('circle', False, [1/2, 2])
    pie = ViewType('pie', False, [1/2, 2])
    area = ViewType('area', False, [1/6, 6])
    g  = ViewType('g', True, [1/10,  10])
    ViewtypeContrains = {'bar':bar,'line':line,'map':maps,'circle':point,'arc':pie, 'area': area, 'g':g}
    return ViewtypeContrains


    
# View
class View:        
    def __init__(self, x, y, width, height, viewtype):
        self.x = x #Topleft
        self.y = y #Topleft
        self.width = width
        self.height = height
        self.type = viewtype
        self.sortedIndex = None
        self.InputJsonStoreOrder = None
        # If it is a combined view type, the combined direction exists
        self.groupDirection = None
        self.isRotate = None
        self.isSm = None
        self.isSmDirection = None
        self.aspectRatioWeight = None
        self.relativeSizeWeight = None
    
    # The order of the input Json data storage view
    def setInputJsonStoreOrder(self, order):
        self.InputJsonStoreOrder = order



# weight
class Weight:
    def __init__(self, spaceUtility, informationFlow):
        self.spaceUtility = spaceUtility # Topleft
        self.informationFlow = informationFlow # Topleft
        self.aspectRatios = {}
        self.relativeRatios = {}


def setWeight(weight):
    organizedWeight = Weight(weight[0], weight[1])
    for index in range(len(weight[2])):
        organizedWeight.aspectRatios[weight[2][index]['id']] = float(weight[2][index]['value'])
        organizedWeight.relativeRatios[weight[3][index]['id']] = float(weight[3][index]['value'])
    return organizedWeight