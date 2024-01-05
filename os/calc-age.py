import json
from datetime import datetime
import random

data = json.load(open('dates.json'))

def calcAge(d):
    dt = datetime.fromisoformat(d['DoB'])
    d['age'] = int((datetime.now() - dt).total_seconds() / 31536000)
    for _ in range(100):
        random.randint(1, 1000000)

# ----------

for d in data:
    calcAge(d)

# with open('ages.json', 'w') as f:
#     json.dump(data, f)

# Run in parallel

# ----------

# import threading



# threads = []
# for d in data:
#     t = threading.Thread(target=calcAge, args=(d,))
#     threads.append(t)
#     t.start()

# ----------
    
# Numnber of threads should be some constant multiplier of the number of cores

import threading

numThreads = 8
for i in range(0, len(data), numThreads):
    threads = []
    for d in data[i:i+numThreads]:
        t = threading.Thread(target=calcAge, args=(d,)) # overhead
        threads.append(t)
        t.start() # overhead
    for t in threads:
        t.join() # overhead

