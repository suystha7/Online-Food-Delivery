import pandas as pd
import json
import sys

arg = sys.argv[1]

dd = json.loads(arg)


absolute_path = r"D:/WEB/qb/Online-Food-Delivery/server/src/data/data.csv"

# New data as a dictionary or list
new_data = {'user_id': '600', 'food_id': '54654', 'rating': 5}

# Convert new data to a DataFrame
new_row = pd.DataFrame([dd])

# Append to the existing CSV file (mode='a')
new_row.to_csv(absolute_path, mode='a', header=False, index=False)
