#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Device {
	    int serialNumber;
	        char model[30];       // ← typo in starter code? (model vs model)
				      //     float batteryLevel;
				      //     };
				      //
				      //     int main()
				      //     {
				      //         struct Device *d = NULL;           // ← d is pointer, but never allocated!
				      //             
				      //                 d->serialNumber = 5555;            // ← CRASH: dereferencing NULL pointer
				      //                     strcpy(d->model, "Sensor-X");      // ← CRASH: same reason
				      //                         d->batteryLevel = 76.5;            // ← CRASH
				      //
				      //                             printf("Device ID: %d\n", d->serialNumber);
				      //                                 printf("Device Model: %s\n", d->model);
				      //                                     printf("Battery level: %.1f%%\n", d->batteryLevel);   // ← format issues too
				      //
				      //                                         return 0;
				      //                                         }
