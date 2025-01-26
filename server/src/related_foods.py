import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import warnings
import sys
import json

warnings.simplefilter('ignore')

df = pd.read_csv('D:/WEB/qb/Online-Food-Delivery/server/src/data/ingredients.csv')

# Sample DataFrame (remove duplicates based on ProductId and Ingredients)
df = df.drop(['ProductName'], axis=1)

# Step 1: Create the TF-IDF matrix for ingredients
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['Ingredients'])

# Step 2: Compute the cosine similarity
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Step 3: Create a mapping of product indices to product IDs
product_indices = pd.Series(df.index, index=df['ProductId']).drop_duplicates()


# Step 4: Define the recommendation function
def recommend_similar_items(productID, df, cosine_sim, num_recommendations=5):
    # Get the index of the product from the ProductId
    idx = df[df['ProductId'] == productID].index[0]

    # Get the similarity scores for the selected product
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the products based on similarity scores (ignoring the product itself)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Skip the first item (the product itself) by starting from index 1
    sim_scores = sim_scores[1:num_recommendations + 1]

    # Get the indices and similarity scores
    product_indices = [x[0] for x in sim_scores]
    similarity_scores = [x[1] for x in sim_scores]

    # Get the recommended products
    recommended_products = df.iloc[product_indices][['ProductId']].copy()
    recommended_products['Similarity Score'] = similarity_scores

    # Print recommended products
    print(recommended_products.to_json(orient='records'))




# Example Usage
arg = sys.argv[1]
json_data=json.loads(arg)
productId=json_data['product_id']
recommend_similar_items(productId, df, cosine_sim, num_recommendations=5)
