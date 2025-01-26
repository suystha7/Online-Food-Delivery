import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import warnings;
from scipy.sparse.linalg import svds
import sys
import json

warnings.simplefilter('ignore')
df = pd.read_csv('D:/WEB/qb/Online-Food-Delivery/server/src/data/sample_data.csv')

# UserId is the index of the counts and counts is dataframe with userid and its frequency
counts = df['UserId'].value_counts()
df_final = df[df['UserId'].isin(counts[counts >= 3].index)]

train_data, test_data = train_test_split(df_final, test_size=0.3,
                                         random_state=0)

df_CF = pd.concat([train_data, test_data]).reset_index()

# User-based Collaborative Filtering
# Matrix with row per 'user' and column per 'item'
pivot_df = pd.pivot_table(df_CF, index=['UserId'], columns='ProductId', values="Score").fillna(0)

# Singular Value Decomposition
pivot_matrix = pivot_df.values
# print(type(pivot_df.values))
U, sigma, Vt = svds(pivot_matrix, k=30)
# Construct diagonal array in SVD
sigma = np.diag(sigma)

all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt)

# Predicted ratings
preds_df = pd.DataFrame(all_user_predicted_ratings, columns=pivot_df.columns)
preds_df.index = pivot_df.index


# Recommend the items with the highest predicted ratings
def recommend_items(userID, pivot_df, preds_df, num_recommendations):
    # For existing users, return personalized recommendations
    # Get and sort the user's ratings
    sorted_user_ratings = pivot_df.loc[userID].sort_values(ascending=False)
    sorted_user_predictions = preds_df.loc[userID].sort_values(ascending=False)

    # Combine ratings and predictions into a single DataFrame
    temp = pd.concat([sorted_user_ratings, sorted_user_predictions], axis=1)
    # temp.index.name = 'Recommended Items'
    temp.columns = ['user_ratings', 'user_predictions']

    # Filter out already rated items
    temp = temp.loc[temp.user_ratings == 0]
    
    temp = temp.sort_values('user_predictions', ascending=False)

    recommendations_json = temp.reset_index().to_json(orient="records")
    # Print the JSON string
    print(recommendations_json)


# Enter 'userID' and 'num_recommendations' for the user #
arg = sys.argv[1]
json_data=json.loads(arg)
user_id=json_data['user_id']
num_recommendations = 5
recommend_items(user_id, pivot_df, preds_df, num_recommendations)
