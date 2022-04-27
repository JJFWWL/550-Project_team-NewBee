import pandas as pd
import numpy as np

business_path = 'E:/Upenn_book/CIT550/project/20220221_cleaned data/yelp_academic_dataset_business.csv'
business = pd.read_csv(business_path)

##test any null in the data, result: address, postal_code, attributes, categories, has null
business.isnull().any()

##check how many null, result: attribute has about 9.3% null ratio, drop all the null row
missing=business[['address','postal_code','attributes','categories']].copy()
for col in missing.columns:
    missing[col]=missing[col].isnull()
missing.sum()
## drop the null row, result: 118757 row left
business=business.dropna()
##split the attribute from dictionary to multiple columns to achieve 1-degree Normal Forms(1NF)
attributes=business['attributes'].apply(eval) ## change str to dict
att_df=attributes.apply(pd.Series) ##change dict to multiple columns, result: shape=(118757, 39)

##check for null  and drop columns with more than 60% null
att_missing=att_df.copy()
for col in att_missing.columns:
    att_missing[col]=att_missing[col].isnull()
    if(att_missing[col].sum()/att_missing.shape[0]>0.6):
        att_df=att_df.drop([col],axis=1)

##result:the columns left and null ratio, WiFi =0.552607, BikeParking=0.427697, BusinessParking=0.302770, BusinessAcceptsCreditCards=0.155915, RestaurantsPriceRange2=0.349074,RestaurantsTakeOut=0.575814
##BusinessParking is dictionary, change it to columns to achieve 1-degree NF
bp=att_df['BusinessParking']
bp=bp.apply(lambda row: eval(row) if type(row)==str else row) ## change the str to dict, keep the null rows
bp_df=bp.apply(pd.Series).drop(0,axis=1) ## bp become splited columns, result: garage, lot, street, valet, validated

## split the dict of hours in to columns, result: Monday,Tuesday ,Wednesday,Thursday,Friday, Saturday,Sunday
hr=business['hours']
hr= hr.apply(lambda row: eval(row) if type(row)==str else row)
hr_df=hr.apply(pd.Series)

att_df=pd.concat([att_df.drop('BusinessParking',axis=1), bp_df],axis=1)
business=pd.concat([business.drop(['attributes','hours'],axis=1), att_df,hr_df],axis=1)

print(business.shape) ## result shape=(118757, 29)

## remove trans dependancy, separate state,postal_code --> city
city=business[['state','postal_code','city']].copy()
city=city.drop_duplicates()
city.shape ##5533,3
city.to_csv('E:/Upenn_book/CIT550/project/20220221_cleaned data/20220308_cleaned_business_city.csv',index=False)

business=business.drop('city',axis=1)
business.to_csv('E:/Upenn_book/CIT550/project/20220221_cleaned data/20220227_cleaned_business.csv',index=False)




