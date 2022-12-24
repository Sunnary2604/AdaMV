# -*- coding: utf-8 -*-
"""
Created on Fri Jan  8 15:58:37 2021

@author: 哲
"""
import pandas as pd
import math
df = pd.read_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/owid-covid-data.csv")
cases=[]
country=[]
for i in range(df.shape[0]):
    if(df.iloc[i]["date"]=="2020/12/31"):
        cases.append(df.iloc[i]["total_cases"])
        country.append(df.iloc[i]["location"])
dataframe=pd.DataFrame({'country':country,'total cases':cases})
dataframe=dataframe.sort_values(by='total cases',ascending=False)
dataframef=dataframe.reset_index(drop=True)
dataframe.to_csv("pie-covid-data.csv",index=False,sep=',')