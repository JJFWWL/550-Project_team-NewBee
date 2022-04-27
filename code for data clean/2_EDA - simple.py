import pandas as pd
import numpy as np
import json


path = 'E:/Upenn_book/CIT550/project/yelp_dataset1/photos.json'

df = pd.read_json(path,lines=True, orient='records')
df.to_csv('E:/Upenn_book/CIT550/project/yelp_dataset1/photos.csv',index=False)








