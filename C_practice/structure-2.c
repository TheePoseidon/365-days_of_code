#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Device {
	    int serialNumber;
	        char model[30];
		    float batteryLevel;
};

int main() {
	    // Option 1: Stack allocation (simplest & safest for this small program)
	    //     struct Device d;   // ← not a pointer → no malloc needed
	    //
	    //         d.serialNumber = 5555;
	    //             strcpy(d.model, "Sensor-X");
	    //                 d.batteryLevel = 76.5f;
	    //
	    //                     printf("Device Serial Number: %d\n", d.serialNumber);
	    //                         printf("Device Model: %s\n", d.model);
	    //                             printf("Battery Level: %.1f%%\n", d.batteryLevel);
	    //
	    //                                 // Option 2: If you want to practice dynamic allocation (heap)
	    //                                     /*
	    //                                         struct Device *d = malloc(sizeof(struct Device));
	    //                                             if (d == NULL) {
	    //                                                     printf("Memory allocation failed!\n");
	    //                                                             return 1;
	    //                                                                 }
	    //
	    //                                                                     d->serialNumber = 5555;
	    //                                                                         strcpy(d->model, "Sensor-X");
	    //                                                                             d->batteryLevel = 76.5f;
	    //
	    //                                                                                 printf("Device Serial Number: %d\n", d->serialNumber);
	    //                                                                                     printf("Device Model: %s\n", d->model);
	    //                                                                                         printf("Battery Level: %.1f%%\n", d->batteryLevel);
	    //
	    //                                                                                             free(d);           // Always free what you malloc!
	    //                                                                                                 */
	    //
	    //                                                                                                     return 0;
	    //                                                                                                     }
