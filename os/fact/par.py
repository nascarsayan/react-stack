import time
import math
from multiprocessing import Pool


def factorial(n):
    return math.factorial(n)


if __name__ == "__main__":
    start = time.time()

    with Pool() as p:
        results = p.map(factorial, range(1, 500))

    # print(f"Results: {results}")
    print(f"Time taken: {time.time() - start}")
