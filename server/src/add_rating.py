import pandas as pd
import json
import sys

arg = sys.argv[1]

dd = json.loads(arg)


absolute_path = r"D:/WEB/qb/Online-Food-Delivery/server/src/data/sample_data.csv"

# Convert new data to a DataFrame
new_row = pd.DataFrame([dd])

# Append to the existing CSV file (mode='a')
new_row.to_csv(absolute_path, mode='a', header=False, index=False)
