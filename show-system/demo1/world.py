import pandas as pd
import math
df = pd.read_csv("./owid-covid-data.csv")
df_2=pd.read_csv("./time_series_covid19_recovered_global.csv")
symbol=[]
date=[]
number=[]
for i in range(df.shape[0]):
    if(df.iloc[i]["location"]=="World"):
        if(df.iloc[i]["date"]=="2021/1/1"):
            break
        number.append(df.iloc[i]["total_cases"])
        symbol.append("total cases")
        date.append(df.iloc[i]["date"])
        number.append(df.iloc[i]["total_deaths"])
        symbol.append("total deaths")
        date.append(df.iloc[i]["date"])
        sum=0
        for j in range(df_2.shape[0]):
            sum=sum+df_2.iloc[j][df.iloc[i]["date"]]
        date.append(df.iloc[i]["date"])
        symbol.append("total recovered")
        number.append(sum)
dataframe=pd.DataFrame({'date':date,'total cases and total deaths(M)':number,'symbol':symbol})
dataframe.to_csv("world-covid-data.csv",index=False,sep=',')