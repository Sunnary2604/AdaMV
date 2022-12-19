# -*- coding: utf-8 -*-
"""
Created on Fri Mar  5 15:14:33 2021

@author: 哲
"""
import pandas as pd
import math
df = pd.read_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/country-original-covid-data.csv")
number=[0,0,0,0,0]
land=["Asia","America","Europe","Africa","Oceania"]
for i in range(df.shape[0]):
    if(df.iloc[i]["land"]=="Asia"):
        number[0]=number[0]+df.iloc[i]["total cases"]
    if(df.iloc[i]["land"]=="America"):
        number[1]=number[1]+df.iloc[i]["total cases"]
    if(df.iloc[i]["land"]=="Europe"):
        number[2]=number[2]+df.iloc[i]["total cases"]  
    if(df.iloc[i]["land"]=="Africa"):
        number[3]=number[3]+df.iloc[i]["total cases"]
    if(df.iloc[i]["land"]=="Oceania"):
        number[4]=number[4]+df.iloc[i]["total cases"]
dataframe=pd.DataFrame({'land':land,'cases':number})
dataframe.to_csv("pie-covid-data.csv",index=False,sep=',')
