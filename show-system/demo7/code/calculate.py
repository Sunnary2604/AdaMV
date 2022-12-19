# -*- coding: utf-8 -*-
"""
Created on Sat Jul 10 13:17:10 2021

@author: 哲
"""
import pandas as pd
pf=pd.read_csv("./TopBabyNamesbyState.csv")
Gender=[""]*2
Gender[0]="Female"
Gender[1]="Male"
G_num=[0]*2
States=[]
States_Fnum=[]
States_Mnum=[]
State_Fnum={}
State_Mnum={}
Top={}
for i in range(pf.shape[0]):
    if(pf.loc[i]["Gender"]=="F"):
        G_num[0]+=pf.loc[i]["Occurences"]
    if(pf.loc[i]["Gender"]=="M"):
        G_num[1]+=pf.loc[i]["Occurences"]
    if(pf.loc[i]["Top Name"] in Top):
        Top[pf.loc[i]["Top Name"]]+=pf.loc[i]["Occurences"]
    else:
        Top[pf.loc[i]["Top Name"]]=pf.loc[i]["Occurences"]
    if(pf.loc[i]["State"] in States):
        if(pf.loc[i]["Gender"]=="F"):
            if(pf.loc[i]["Top Name"] in State_Fnum):
                State_Fnum[pf.loc[i]["Top Name"]]+=pf.loc[i]["Occurences"]
            else:
                State_Fnum[pf.loc[i]["Top Name"]]=pf.loc[i]["Occurences"]
        if(pf.loc[i]["Gender"]=="M"):
            if(pf.loc[i]["Top Name"] in State_Mnum):
                State_Mnum[pf.loc[i]["Top Name"]]+=pf.loc[i]["Occurences"]
            else:
                State_Mnum[pf.loc[i]["Top Name"]]=pf.loc[i]["Occurences"]
    else:
        F_mx=-1
        M_mx=-1
        F_name=""
        M_name=""
        for key in State_Fnum:
            if(State_Fnum[key]>F_mx):
                F_mx=State_Fnum[key]
                F_name=key
        if(F_name!=""):
            States_Fnum.append(F_name)
        for key in State_Mnum:
            if(State_Mnum[key]>M_mx):
                M_mx=State_Mnum[key]
                M_name=key
        if(M_name!=""):
            States_Mnum.append(M_name)
        States.append(pf.loc[i]["State"])
        State_Fnum={}
        State_Mnum={}
        if(pf.loc[i]["Gender"]=="F"):
            State_Fnum[pf.loc[i]["Top Name"]]=pf.loc[i]["Occurences"]
        if(pf.loc[i]["Gender"]=="M"):
            State_Mnum[pf.loc[i]["Top Name"]]=pf.loc[i]["Occurences"]
F_mx=-1
M_mx=-1
F_name=""
M_name=""
for key in State_Fnum:
    if(State_Fnum[key]>F_mx):
        F_mx=State_Fnum[key]
        F_name=key
if(F_name!=""):
    States_Fnum.append(F_name)
for key in State_Mnum:
    if(State_Mnum[key]>M_mx):
        M_mx=State_Mnum[key]
        M_name=key
if(M_name!=""):
    States_Mnum.append(M_name)
data={}
data["Gender"]=Gender
data["number"]=G_num
dataFrame=pd.DataFrame(data)
dataFrame.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo7/csv/pie.csv",index=False,sep=',')
Top_name=[]
Top_num=[]
for key in Top:
    Top_name.append(key)
    Top_num.append(Top[key])
data={}
data["Top_name"]=Top_name
data["number"]=Top_num
dataFrame=pd.DataFrame(data)
dataFrame.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo7/csv/bar.csv",index=False,sep=',')
data={}
data["States"]=States
print(len(States))
print(len(States_Fnum))
data["Female"]=States_Fnum
dataFrame=pd.DataFrame(data)
dataFrame.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo7/csv/map_F.csv",index=False,sep=',')
data={}
data["States"]=States
data["Male"]=States_Mnum
dataFrame=pd.DataFrame(data)
dataFrame.to_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo7/csv/map_M.csv",index=False,sep=',')