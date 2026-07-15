#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <string.h>
#include <ctype.h>
#include <unistd.h>

char data[100];
int stage = 0;

void* reader(void* arg) {
	    printf("Reader: Enter some text: ");
	        fgets(data, sizeof(data), stdin);
		    data[strcspn(data, "\n")] = '\0';
		        stage = 1;
			    return NULL;
}

void* processor(void* arg) {
	    while (stage < 1) usleep(100);
	        printf("Processor: Converting to uppercase...\n");
	        for (int i = 0; data[i]; i++) {
			        data[i] = toupper(data[i]);
				    }
		    stage = 2;
		        return NULL;
}

void* writer(void* arg) {
	    while (stage < 2) usleep(100);
	        printf("Writer: Final output: %s\n", data);
	        return NULL;
}

void* validator(void* arg) {
	    while (stage < 1) usleep(100);
	        printf("Validator: Checking input...\n");
	        
	        int valid = 1;
		    for (int i = 0; data[i]; i++) {
			            if (!isalnum(data[i]) && data[i] != ' ') {
					                valid = 0;
							            break;
								            }
				        }
		        
		        if (!valid) {
				        printf("Validator: ERROR - Invalid input! Only letters, numbers and spaces allowed.\n");
					        exit(1);
			}
			    printf("Validator: Input is valid.\n");
			        return NULL;
}

int main() {
	    pthread_t t1, t2, t3, t4;

	        printf("=== Multithreaded Pipeline with Validation ===\n");

		    pthread_create(&t1, NULL, reader, NULL);
		        pthread_create(&t2, NULL, validator, NULL);
			    pthread_create(&t3, NULL, processor, NULL);
			        pthread_create(&t4, NULL, writer, NULL);

				    pthread_join(t1, NULL);
				        pthread_join(t2, NULL);
					    pthread_join(t3, NULL);
					        pthread_join(t4, NULL);

						    printf("Pipeline completed successfully!\n");
						        return 0;
}
