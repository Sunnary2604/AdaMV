from flask import Flask, render_template, jsonify, request
import json
import importlib
import numpy
import time

app = Flask(__name__)
import py.layout_retargeting
    
# import adaption


@app.route('/')
def display():
    return render_template("index1.html")



# Adaptation algorithm
@app.route('/adaption', methods=['POST'])
def adaptionFunction():
    data = request.get_json()
    outputDevice = data['device']
    inputJson = data['data']
    weight = data['weight']
    resultVega = data['resultVega']



    # if len(outputDevice) == 1:
    #     if outputDevice[0]['device'] == 'iphone7' or outputDevice[0]['device'] == 'r-phone7' or outputDevice[0]['device'] == 'riphoneX':
    #         scale = 375/56
    #     elif outputDevice[0]['device'] == 'ipad':
    #         scale = 786/84
    #     # Modify device deflation, deflate to true value
    #     for dIndex in range(len(outputDevice)):
    #         outputDevice[dIndex]['x'] *= scale
    #         outputDevice[dIndex]['y'] *= scale
    #         outputDevice[dIndex]['width'] *= scale
    #         outputDevice[dIndex]['height'] *= scale



    mapDataTmp = 0
    for i in range(len(inputJson['Interface'])):
        if (len(inputJson['Interface'][i]['ViewType']) == 2 and 'type' not in inputJson['Interface'][i]['ViewType']) or inputJson['Interface'][i]['ViewType']['type'] == 'geoshape':
            mapDataTmp = inputJson['Interface'][i]['ViewType']
            inputJson['Interface'][i]['ViewType'] = {'type': 'map'}


    if len(outputDevice) == 1:
        outputDevice[0]['x'] = 0
        outputDevice[0]['y'] = 0
        
    
    start = time.time()
#long running
#do something other


    bestSolution = py.layout_retargeting.layout(outputDevice, inputJson, weight)

    end = time.time()
    print(end-start)
    # Modify the original data
    # Sort the view
    for page in range(len(bestSolution.views)):
        bestSolution.views[page].sort(key = lambda t:t.val.InputJsonStoreOrder)# 按第二个关键字排序

    res = []
    for index in range(len(bestSolution.devices)):
        minX =  999999
        minY = 999999
        mv = {
            "Modality": {
                "Interaction_modality": bestSolution.devices[index].name,
                "Size": {
                    "width": bestSolution.devices[index].width,
                    "height": bestSolution.devices[index].height
                    }
            },
            "Interface": [],
            "pages": bestSolution.score.inforFlag
        }
        for dItem in bestSolution.views[index]:
            dItemInputJsonStoreOrder = int(dItem.val.InputJsonStoreOrder)
            originalData = inputJson['Interface'][dItemInputJsonStoreOrder]
            vegaData = resultVega[dItemInputJsonStoreOrder]
            if vegaData.get('ifTrans') == None and dItem.val.isRotate:
                temp = originalData['Encoding']['x']
                originalData['Encoding']['x'] = originalData['Encoding']['y']
                if originalData['Encoding']['x'].get('sort'):
                    if originalData['Encoding']['x']['sort'] == '-x':
                        originalData['Encoding']['x']['sort'] = '-y'
                if temp.get('sort'):
                    if temp['sort'] == '-y':
                        temp['sort'] = '-x'
                originalData['Encoding']['y'] = temp
                # originalData['Encoding']['y']['sort'] = "descending"
                # originalData['Encoding']['x']['axis'] = {"orient":"top"}
                originalData['ViewType']['isRotated'] = True
            if originalData['ViewType']['type'] == 'map':
                originalData['ViewType'] = mapDataTmp
            originalData['BoundingBox']['Size']['width'] = dItem.val.width / bestSolution.devices[index].width
            originalData['BoundingBox']['Size']['height'] = dItem.val.height / bestSolution.devices[index].height
            originalData['BoundingBox']['CenterPosition']['x'] = (dItem.val.x-bestSolution.devices[index].x) / bestSolution.devices[index].width + originalData['BoundingBox']['Size']['width']/2
            originalData['BoundingBox']['CenterPosition']['y'] = (dItem.val.y-bestSolution.devices[index].y) / bestSolution.devices[index].height + originalData['BoundingBox']['Size']['height']/2
            originalData['InputJsonStoreOrder'] = dItemInputJsonStoreOrder
            mv['Interface'].insert(dItemInputJsonStoreOrder, originalData)
            minX = min((dItem.val.x-bestSolution.devices[index].x) / bestSolution.devices[index].width, minX)
            minY = min((dItem.val.y-bestSolution.devices[index].y) / bestSolution.devices[index].height, minY)
            # Find the minimum to get x,y Translate (0, 0)
        for indexMV in range(len(mv['Interface'])):
            mv['Interface'][indexMV]['BoundingBox']['CenterPosition']['x'] = mv['Interface'][indexMV]['BoundingBox']['CenterPosition']['x'] - minX
            mv['Interface'][indexMV]['BoundingBox']['CenterPosition']['y'] = mv['Interface'][indexMV]['BoundingBox']['CenterPosition']['y'] - minY

        if len(outputDevice) > 1:
            res.insert(bestSolution.devices[index].id, mv)
        else:
            res.append(mv)
    return jsonify(res)


if __name__ == '__main__':
    app.run()
