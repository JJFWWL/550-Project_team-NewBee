import pandas as pd
import numpy as np


chunkSize=5000
patchSize=40

i=0


path = 'E:/Upenn_book/CIT550/project/yelp_dataset1/yelp_academic_dataset_user.json'

MyList=[]
row=0
mbs=0
i=0
temp=0

#list for EDA result summary
res_dict={}

for chunk in pd.read_json(path,lines=True, chunksize=chunkSize,orient='records'):

    column_usage = chunk.memory_usage(deep=True)
    mbs += column_usage.sum() / 1e6
    MyList.append(chunk)

    i += 1
    temp+=1

    if(temp==patchSize):
        temp=0
        exportPath = 'E:/Upenn_book/CIT550/project/user/yelp_academic_dataset_user' + str(i//patchSize) + '.csv'

        if "tab_name" in res_dict:
            res_dict["tab_name"].append("user"+str(i//patchSize))
        else:
            res_dict["tab_name"]=["user"+str(i//patchSize)]


        df = pd.concat(MyList, axis=0)

        if "rowNum" in res_dict:
            res_dict["rowNum"].append(df.shape[0])
        else:
            res_dict["rowNum"]=[df.shape[0]]

        if "colNum" in res_dict:
            res_dict["colNum"].append(df.shape[1])
        else:
            res_dict["colNum"]=[df.shape[1]]

        if "memory(mbs)" in res_dict:
            res_dict["memory(mbs)"].append(mbs)
        else:
            res_dict["memory(mbs)"]=[mbs]

        mbs=0

        for column in df:
          if (df.dtypes[column]==np.int64 or df.dtypes[column]==np.float64):
            if column+"_mean" in res_dict:
                res_dict[column+"_mean"].append(df[column].mean(skipna=True))
            else:
                res_dict[column+"_mean"] = [df[column].mean(skipna=True)]

            if column+"_std" in res_dict:
                res_dict[column+"_std"].append(df[column].std(skipna=True))
            else:
                res_dict[column+"_std"] = [df[column].std(skipna=True)]

        #generate the data to csv files
        df.to_csv(exportPath, index=False)

        MyList=[]

res_DF=pd.DataFrame(res_dict)
res_DF.to_csv('E:/Upenn_book/CIT550/project/user/user_EDA_result.csv')




