# -*- coding: utf-8 -*-
"""
Created on Wed Mar 10 11:55:45 2021

@author: 哲
"""
import pandas as pd 
import numpy as np
df = pd.read_csv("./original.csv")
date=range(1900,2020,1)
Netflix=np.zeros(len(date))
Hulu=np.zeros(len(date))
PrimeVideo=np.zeros(len(date))
Disney=np.zeros(len(date))
for i in range(df.shape[0]):
    if(df.iloc[i]["Netflix"]==1):
        Netflix[df.iloc[i]["Year"]-1900]=Netflix[df.iloc[i]["Year"]-1900]+1
    if(df.iloc[i]["Hulu"]==1):
        Hulu[df.iloc[i]["Year"]-1900]=Hulu[df.iloc[i]["Year"]-1900]+1
    if(df.iloc[i]["Prime Video"]==1):
        PrimeVideo[df.iloc[i]["Year"]-1900]=PrimeVideo[df.iloc[i]["Year"]-1900]+1
    if(df.iloc[i]["Disney+"]==1):
        Disney[df.iloc[i]["Year"]-1900]=Disney[df.iloc[i]["Year"]-1900]+1
dataframe=pd.DataFrame({'Date':date,'Netflix':Netflix,'Hulu':Hulu,'Prime Video':PrimeVideo,'Disney+':Disney})
dataframe.to_csv("linechart.csv",index=False,sep=',')