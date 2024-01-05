from random import randint
import threading
import time

# Mutex Example
file_mutex = threading.Lock()

# multiple writers : One at a time should modify the file
def modify_file(thread_id):
    with file_mutex:

        #### START CRITICAL SECTION ####
        print(f"Thread-{thread_id} is writing to the file")
        time.sleep(randint(1, 5))
        print(f"Thread-{thread_id} is done writing")

        #### END CRITICAL SECTION ####

# Start 5 threads, but only allow 1 to write to the file at a time
for i in range(5):
    threading.Thread(target=modify_file, args=(i,)).start()
