import pandas as pd

df = pd.read_csv('D:/WEB/qb/Online-Food-Delivery/server/src/data/sample_data.csv')

df['AverageRating'] = df.groupby('ProductId')['Score'].transform('mean')
df = df.drop(columns=['Score', 'UserId'])
df = df.drop_duplicates(subset=['ProductId'])

print(df.to_json(orient='records'))
