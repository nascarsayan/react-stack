from time import time
from datetime import datetime

from random import randint
randomDates = []
for i in range(10000):
    user = f"user-{i}"
    dt = datetime.fromtimestamp(randint(1, int(time())))
    randomDates.append({
        "user": user,
        "DoB": dt.isoformat()
    })

# save dates to json
import json

with open('dates.json', 'w') as f:
    json.dump(randomDates, f)
