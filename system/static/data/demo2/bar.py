import pandas as pd 
df = pd.read_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo2/original.csv")
Age=[]
Platform=[]
number=[]
for i in range(df.shape[0]):
    flag=True
    if(df.iloc[i]["Netflix"]==1):
        for j in range(len(Age)):
            if(df.iloc[i]["Age"]==Age[j] and Platform[j]=="Netflix"):
                number[j]=number[j]+1
                flag=False
                break
        if(flag):
            Age.append(df.iloc[i]["Age"])
            Platform.append("Netflix")
            number.append(1)
    flag=True
    if(df.iloc[i]["Hulu"]==1):
        for j in range(len(Age)):
            if(df.iloc[i]["Age"]==Age[j] and Platform[j]=="Hulu"):
                number[j]=number[j]+1
                flag=False
                break
        if(flag):
            Age.append(df.iloc[i]["Age"])
            Platform.append("Hulu")
            number.append(1)
    flag=True
    if(df.iloc[i]["Prime Video"]==1):
        for j in range(len(Age)):
            if(df.iloc[i]["Age"]==Age[j] and Platform[j]=="Prime Video"):
                number[j]=number[j]+1
                flag=False
                break
        if(flag):
            Age.append(df.iloc[i]["Age"])
            Platform.append("Prime Video")
            number.append(1)
    flag=True
    if(df.iloc[i]["Disney+"]==1):
        for j in range(len(Age)):
            if(df.iloc[i]["Age"]==Age[j] and Platform[j]=="Disney+"):
                number[j]=number[j]+1
                flag=False
                break
        if(flag):
            Age.append(df.iloc[i]["Age"])
            Platform.append("Disney+")
            number.append(1)
    print(i)
for i in range(len(number)):
    number[i]=number[i]/1000
dataframe=pd.DataFrame({'Age':Age,'Movie number(K)':number,'Platform':Platform})
dataframe.to_csv("barchart.csv",index=False,sep=',')