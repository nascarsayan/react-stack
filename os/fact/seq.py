import time
import math

start = time.time()

results = []
for i in range(1, 500):
    results.append(math.factorial(i))

# print(f"Results: {results}")
print(f"Time taken: {time.time() - start}")
