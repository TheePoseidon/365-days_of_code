#include <stdio.h>

int main() {
	int items = 80;
	float cost_per_item = 24.60;
	int items_purchased = 27;
	float total_purchase_cost = cost_per_item * items_purchased;
	int items_remaining = items - items_purchased;
	char currency = '$';

	printf("Number of items: %d\n", items);
	printf("Cost each item: %.2f%c\n", cost_per_item, currency);
	printf("Total cost: %.2f%c\n", total_purchase_cost, currency);
	printf("Remaining items: %d\n", items_remaining);

	return 0;
}
