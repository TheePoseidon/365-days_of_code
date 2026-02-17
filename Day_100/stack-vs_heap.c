#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
	    size_t n;

	        printf("Enter number of names: ");
		    if (scanf("%zu", &n) != 1 || n == 0) {
			            fprintf(stderr, "Invalid input.\n");
				            return EXIT_FAILURE;
					        }

		        char **names = malloc(n * sizeof(*names));
			    if (names == NULL) {
				            fprintf(stderr, "Memory allocation failed.\n");
					            return EXIT_FAILURE;
						        }

			        getchar();

				    for (size_t i = 0; i < n; i++) {
					            char buffer[100];

						            printf("Enter name %zu: ", i + 1);
							            if (fgets(buffer, sizeof(buffer), stdin) == NULL) {
									                fprintf(stderr, "Input error.\n");
											            return EXIT_FAILURE;
												            }

								            buffer[strcspn(buffer, "\n")] = '\0';

									            names[i] = malloc(strlen(buffer) + 1);
										            if (names[i] == NULL) {
												                fprintf(stderr, "Memory allocation failed.\n");
														            return EXIT_FAILURE;
															            }

											            strcpy(names[i], buffer);
												        }

				        printf("\nStored Names:\n");
					    for (size_t i = 0; i < n; i++) {
						            printf("%s\n", names[i]);
							        }

					        for (size_t i = 0; i < n; i++) {
							        free(names[i]);
								        names[i] = NULL;
									    }

						    free(names);
						        names = NULL;

							    return EXIT_SUCCESS;
}
