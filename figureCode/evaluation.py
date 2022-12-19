from elopy import *
import pandas as pd
import os
import json


if __name__ == '__main__':
    allData = []
    files= os.listdir('demo')
    for file in files: 
        path = 'demo\\' + file
        df = pd.read_excel(path)
        # 第一列为q1 第二列为q2
        a = 'Our'
        if 's_s' in file:
            b = 'S_S'
        elif 'vertical' in file:
            b = 'Vertical'
        i = Implementation()
        i.addPlayer(a)
        i.addPlayer(b)
        for row in range(len(df)):
            data = df.ix[row].values[0]
            if data == 1:
                i.recordMatch(a,b,winner=a)
            elif data == 2:
                i.recordMatch(a,b,winner=b)
            elif data == 3:
                i.recordMatch(a,b,draw=True)
        allData.append(file)
        print(i.getRatingList())
    print(allData)
    # json_str = json.dumps(allData, indent=4)
    # with open('data.json', 'w') as json_file:
    #     json_file.write(json_str)