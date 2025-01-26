import pandas as pd
from sklearn.model_selection import train_test_split
import warnings;

warnings.simplefilter('ignore')
df = pd.read_csv('D:/WEB/qb/Online-Food-Delivery/server/src/data/sample_data.csv')

# UserId is the index of the counts and counts is dataframe with userid and its frequency
counts = df['UserId'].value_counts()
df_final = df[df['UserId'].isin(counts[counts >= 3].index)]

train_data, test_data = train_test_split(df_final, test_size=0.3,
                                         random_state=0)

train_data_grouped = train_data.groupby('ProductId').agg({'UserId': 'count'}).reset_index()
train_data_grouped.rename(columns={'UserId': 'score'}, inplace=True)

# Sort the products on recommendation score
train_data_sort = train_data_grouped.sort_values(['score', 'ProductId'], ascending=[0, 1])

# Generate a recommendation rank based upon score
train_data_sort['Rank'] = train_data_sort['score'].rank(ascending=0, method='first')

# Get the top 5 recommendations
popularity_recommendations = train_data_sort.head()
# popularity_recommendations

print(popularity_recommendations.to_json(orient='records'))
