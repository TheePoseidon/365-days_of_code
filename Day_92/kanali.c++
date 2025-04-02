#include <iostream>

using namespace std;

int main() {
    double celsius, fahrenheit;

    // Ask the user for input
    cout << "Enter temperature in Celsius: ";
    cin >> celsius;

    // Convert Celsius to Fahrenheit
    fahrenheit = (celsius * 9.0 / 5.0) + 32;

    // Output the result
    cout << "Temperature in Fahrenheit: " << fahrenheit << "°F" << endl;

    return 0;
}
