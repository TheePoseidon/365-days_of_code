#include <stdio.h>
#include <stdbool.h>

void car_body_assembly(int parts);
void assemble_car_engine(float power, int cylinders);
char assembly_state(bool value);

void main(){
	int parts = 4  , cylinders = 8;
	float power = 2.2;
	bool value = true;

	car_body_assembly(parts);
	assemble_car_engine(power, cylinders);
	char a = assembly_state(value);

	if(a == 't')
	{ printf("Assembly completed, \n");
	}
	else
	{
		printf("Assembly not completed, \n");
	} 
} 

void car_body_assembly(int parts){ 
	printf("Number of parts of the car body = %d \n ", parts);
}

void assemble_car_engine(float power, int cylinders){
	printf("The car with %d cylinders generates the power of %f \n", power, cylinders);
} 

char assembly_state(bool value){
	char a; 
	if(value == true)
	{a = 't';}
	else 
	{a = 'f';} 
	return a; 
}
