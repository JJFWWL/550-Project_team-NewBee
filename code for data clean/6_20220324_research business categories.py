import pandas as pd
import numpy as np


business_path = 'E:/Upenn_book/CIT550/project/20220313_cleaned data/20220313_MA_OR_business.csv'
business = pd.read_csv(business_path)

res=dict()
for row in business['categories']:
    test = [x.strip() for x in row.split(',')]
    for item in test:
        if item in res:
            res[item]+=1
        else:
            res[item]=1

x={k: v for k, v in sorted(res.items(), key=lambda item: item[1],reverse=True)} ##sort in descending

list=[]
for row in business['categories']:
    temp = [x.strip() for x in row.split(',')]
    max=0
    for item in temp:
        if res[item]>max:
            max=res[item]
            cat=item
    list.append(cat)

business['new_categories']=list

