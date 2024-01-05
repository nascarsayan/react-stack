import threading
import time

# Semaphore Example
max_connections = 5
pool_sema = threading.Semaphore(value=max_connections)

def access_db(thread_id):
    with pool_sema:

        ### CRITICAL SECTION ###

        print(f"Thread-{thread_id} is accessing the database")
        # sleep for random amount of time
        from random import randint
        time.sleep(randint(1, 5))
        print(f"Thread-{thread_id} is releasing the database")

        ### CRITICAL SECTION ###


# Start 10 threads, but only allow 5 to access the database at a time
threads = []
for i in range(10):
    t = threading.Thread(target=access_db, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
