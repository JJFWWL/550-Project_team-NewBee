import pandas as pd
import numpy as np
import os

business_path = 'E:/Upenn_book/CIT550/project/20220221_cleaned data/20220308_cleaned_business.csv'
business = pd.read_csv(business_path) ##shape=118757,28
business=business.drop(business[business['state']=='BC'].index)
business=business.drop(business[business['state']=='ABE'].index) ##(106336, 28)

photo_path='E:/Upenn_book/CIT550/project/20220221_cleaned data/photos.csv'
photo=pd.read_csv(photo_path)##(200000, 4)

result_photo=pd.merge(business,photo,how='right',on=['business_id'], indicator=True) ## add extra column with indicator, right_only is the row on photo only

photo_delete=result_photo[result_photo._merge=='right_only'] ##(31519, 32)

photo_remain=pd.merge(business,photo,on=['business_id']) ##(168481, 31)
photo_remain=photo_remain[['photo_id','business_id','caption','label']].copy() ##(168481, 4)

count=0
for row in photo_delete['photo_id']:
    test_path='E:/Upenn_book/CIT550/project/yelp_photos/photos/'+row+'.jpg'
    try:
        os.remove(test_path)
        count+=1
    except:
        pass

## delete 31519 photos, from 5.69G, 200000 photo changed to 4.75G, 168480 photo
photo_remain.to_csv('E:/Upenn_book/CIT550/project/20220221_cleaned data/20220313_cleaned_photo.csv',index=False)



review_path='E:/Upenn_book/CIT550/project/20220221_cleaned data/cleaned_new_yelp_reviews.csv'
review = pd.read_csv(review_path) ##shape=8635403, 4
review_remain=pd.merge(business,review,on=['business_id']) ##(7811631, 31)
review_remain=review_remain[['review_id','user_id','business_id','stars']].copy()
review_remain.to_csv('E:/Upenn_book/CIT550/project/20220221_cleaned data/20220313_cleaned_review.csv',index=False)

##only select MA,OR state,MA    25787,OR    18995##############################################################################
business['state'].value_counts()
business_final=business[(business['state']=='MA') | (business['state']=='OR') ] ##(44782, 28)
result_photo=pd.merge(business_final,photo,how='right',on=['business_id'], indicator=True) ## add extra column with indicator, right_only is the row on photo only
photo_delete=result_photo[result_photo._merge=='right_only'] ##(138956, 32)
photo_remain=pd.merge(business_final,photo,on=['business_id']) ##(61044, 31)
photo_remain=photo_remain[['photo_id','business_id','caption','label']].copy() ##(61044, 4)

count=0
for row in photo_delete['photo_id']:
    test_path='E:/Upenn_book/CIT550/project/yelp_photos/photos/'+row+'.jpg'
    try:
        os.remove(test_path)
        count+=1
    except:
        pass
## count=107437, plus previous 31519, total=138956, remain 1.71GB, 61043 photo.

business_final.to_csv('E:/Upenn_book/CIT550/project/20220313_cleaned data/20220313_MA_OR_business.csv',index=False)
photo_remain.to_csv('E:/Upenn_book/CIT550/project/20220313_cleaned data/20220313_MA_OR_photo.csv',index=False)

##this part run in Kaggle
review_path='../input/cleaned-data/cleaned_new_yelp_reviews.csv'
business_path='../input/cleaned-data/20220313_MA_OR_business.csv'
review = pd.read_csv(review_path)
business = pd.read_csv(business_path)
review_remain=pd.merge(business,review,on=['business_id'])
review_remain=review_remain[['review_id','user_id','business_id','stars_y']].copy()
review_remain=review_remain.rename({'stars_y':'stars'},axis=1)
review_remain.to_csv('./20220313_MA_OR_review.csv',index=False)
##remain review=(3185478, 4)

user_path='../input/cleaned-data/cleaned_new_yelp_users.csv'
user = pd.read_csv(user_path) ##user=(2189457, 4)
review_user=pd.merge(review_remain,user,on=['user_id'])
user_remain=review_user[['user_id','name','review_count','yelping_since']].copy().drop_duplicates()
user_remain.to_csv('./20220313_MA_OR_user.csv',index=False)
##remain_user=(835224, 4)#################################################################################

city_path = 'E:/Upenn_book/CIT550/project/20220221_cleaned data/20220308_cleaned_business_city.csv'
city = pd.read_csv(city_path) ##(5533, 3)
city_final=city[(city['state']=='MA') | (city['state']=='OR') ] ##city_final=(588,3)
city_final.to_csv('E:/Upenn_book/CIT550/project/20220313_cleaned data/20220313_MA_OR_city.csv',index=False)