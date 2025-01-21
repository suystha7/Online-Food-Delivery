import numpy as np
import pandas as pd
import json
from sklearn.model_selection import train_test_split
from scipy.sparse.linalg import svds
import warnings;
import os

warnings.simplefilter('ignore')


df = pd.read_csv('D:/WEB/qb/Online-Food-Delivery/server/src/data/Reviews.csv')

counts = df['UserId'].value_counts()
# print(counts.index)
df_final = df[df['UserId'].isin(counts[counts >= 10].index)]

final_ratings_matrix = pd.pivot_table(df_final, index=['UserId'], columns='ProductId', values="Score")
final_ratings_matrix.fillna(0, inplace=True)

train_data, test_data = train_test_split(df_final, test_size=0.3, random_state=0)

train_data_grouped = train_data.groupby('ProductId').agg({'UserId': 'count'}).reset_index()
train_data_grouped.rename(columns={'UserId': 'score'}, inplace=True)

train_data_sort = train_data_grouped.sort_values(['score', 'ProductId'], ascending=[0, 1])

# Generate a recommendation rank based upon score
train_data_sort['Rank'] = train_data_sort['score'].rank(ascending=0, method='first')

# Get the top 5 recommendations
popularity_recommendations = train_data_sort.head(5)
# popularity_recommendations

df_CF = pd.concat([train_data, test_data]).reset_index()
df_CF.tail()

pivot_df = pd.pivot_table(df_CF, index=['UserId'], columns='ProductId', values="Score")
pivot_df.fillna(0, inplace=True)

pivot_df['user_index'] = np.arange(0, pivot_df.shape[0], 1)
pivot_df.head()


# Singular Value Decomposition
pivot_matrix = pivot_df.values
U, sigma, Vt = svds(pivot_matrix, k=100)
# Construct diagonal array in SVD
sigma = np.diag(sigma)

all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt)

# Predicted ratings
preds_df = pd.DataFrame(all_user_predicted_ratings, columns=pivot_df.columns)
preds_df.head()


def recommend_items(userID, pivot_df, preds_df, num_recommendations):
    user_idx = userID - 1  # index starts at 0

    # Get and sort the user's ratings
    sorted_user_ratings = pivot_df.iloc[user_idx].sort_values(ascending=False)
    # print(sorted_user_ratings)
    # sorted_user_ratings
    sorted_user_predictions = preds_df.iloc[user_idx].sort_values(ascending=False)
    # print(sorted_user_predictions)
    # sorted_user_predictions

    temp = pd.concat([sorted_user_ratings, sorted_user_predictions], axis=1)
    temp.index.name = 'Recommended Items'
    temp.columns = ['user_ratings', 'user_predictions']

    result = temp.head(5)
    # response = json.dumps(result.to_json(orient="index"))
    print(result.to_json(orient="index"))


userID = 25
num_recommendations = 5
recommend_items(userID, pivot_df, preds_df, num_recommendations)
