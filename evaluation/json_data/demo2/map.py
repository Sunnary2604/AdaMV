# -*- coding: utf-8 -*-
"""
Created on Wed Mar 10 13:21:26 2021

@author: 哲
"""
import pandas as pd 
import numpy as np
df = pd.read_csv("./original.csv")
ef=pd.read_csv("../demo1/map.csv")
country=[]
total=[]
number=[]
ave=[]
for i in range(df.shape[0]):
    str=df.iloc[i]["Country"]
    if not pd.isnull(str):
        arr=str.split(',')
        for j in range(len(arr)):
            if arr[j] in country:
                if not pd.isnull(df.iloc[i]["IMDb"]):
                    total[country.index(arr[j])]=total[country.index(arr[j])]+df.iloc[i]["IMDb"]
                    number[country.index(arr[j])]=number[country.index(arr[j])]+1
            else:
                country.append(arr[j])
                total.append(df.iloc[i]["IMDb"])
                number.append(1)
Long=np.zeros(len(number))
Lat=np.zeros(len(number))
for i in range(len(number)):
    ave.append(total[i]/number[i])
    for j in range(ef.shape[0]):
        if(ef.iloc[j]["country"]==country[i]):
            Long[i]=ef.iloc[j]["Long"]
            Lat[i]=ef.iloc[j]["Lat"]
            break
dataframe=pd.DataFrame({'country':country,'average':ave,'Long':Long,'Lat':Lat})
dataframe.to_csv("map_1.csv",index=False,sep=',')