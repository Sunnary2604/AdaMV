# -*- coding: utf-8 -*-
"""
Created on Mon Jul 12 12:03:22 2021

@author: 哲
"""
import pandas as pd
pf=pd.read_csv("./enigma-us.csv",keep_default_na=False)
Year=list(range(2002,2017))
Private=[0]*int(len(Year))
Public=[0]*int(len(Year))
Category=["Residential","Lodging","Office","Commercial","Health Care","Educational","Religious",
          "Public Safety","Amusement and Recreation","Transportation","Communication","Power",
          "Highway and Street","Sewage and Waste Disposal","Water Supply","Conservation and Development",
          "Manufacturing"]
Cat_num=[0]*len(Category)
Y=pf.loc[0]["per_name"]
Date=[]
Date.append(Y)
R_num=[]
E_num=[]
H_num=[]
for i in range(pf.shape[0]):
    if(pf.loc[i]["dt_desc"]=="Total Private Construction" and pf.loc[i]["cat_desc"]=="Total Construction"):
        t=pf.loc[i]["per_name"][0:4]
        t=int(t)
        Private[t-2002]+=int(pf.loc[i]["val"]*1000000)
    if(pf.loc[i]["dt_desc"]=="Total Private Construction" and pf.loc[i]["cat_desc"]=="Total Construction"):
        t=pf.loc[i]["per_name"][0:4]
        t=int(t)
        Public[t-2002]+=int(pf.loc[i]["val"]*1000000)
    if(pf.loc[i]["dt_desc"]=="Total Construction"):
        if(pf.loc[i]["cat_desc"] in Category):
            Cat_num[Category.index(pf.loc[i]["cat_desc"])]+=int(pf.loc[i]["val"]*1000000)
    if(pf.loc[i]["per_name"]==Y and pf.loc[i]["dt_desc"]=="Total Construction"):
        if(pf.loc[i]["cat_desc"]=="Residential"):
            R_num.append(pf.loc[i]["val"]*1000000)
        if(pf.loc[i]["cat_desc"]=="Educational"):
            E_num.append(pf.loc[i]["val"]*1000000)
        if(pf.loc[i]["cat_desc"]=="Highway and Street"):
            H_num.append(pf.loc[i]["val"]*1000000)
    elif(pf.loc[i]["per_name"]!=Y):
        Y=pf.loc[i]["per_name"]
        Date.append(Y)
data={"Date":Date,"Residential":R_num,"Educational":E_num,"Highway and Street":H_num}
df=pd.DataFrame(data)
df.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo8/csv/line.csv",index=False,sep=',')
data={"Category":Category,"number":Cat_num}
df=pd.DataFrame(data)
df.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo8/csv/bar-2.csv",index=False,sep=',')
Year=[]
for i in range(2002,2017):
    Year.append(i)
    Year.append(i)
number=[]
number.extend(Private)
number.extend(Public)
symbol=[""]*len(Year)
for i in range(len(Private)):
    symbol[i]="Private Construction"
    symbol[i+len(Private)]="Public Construction"
data={"year":Year,"number":number,"symbol":symbol}
df=pd.DataFrame(data)
df.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo8/csv/bar-1.csv",index=False,sep=',')
