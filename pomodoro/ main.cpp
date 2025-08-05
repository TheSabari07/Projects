#include "timer.h"
#include <iostream>

using namespace std;

void showMenu() {
    cout << "\n====== Pomodoro Timer ======\n";
    cout << "1. Start Pomodoro (25 min)\n";
    cout << "2. Start Short Break (5 min)\n";
    cout << "3. Start Long Break (15 min)\n";
    cout << "4. Quit\n";
    cout << "Choose an option: ";
}

int main() {
    int pomodoroMin = 25;
    int shortBreakMin = 5;
    int longBreakMin = 15;

    int choice;

    while (true) {
        showMenu();
        cin >> choice;

        if (choice == 1) {
            Timer pomodoro(pomodoroMin, "Pomodoro");
            pomodoro.start();
        } else if (choice == 2) {
            Timer shortBreak(shortBreakMin, "Short Break");
            shortBreak.start();
        } else if (choice == 3) {
            Timer longBreak(longBreakMin, "Long Break");
            longBreak.start();
        } else if (choice == 4) {
            cout << "\n👋 Exiting. Stay productive!\n";
            break;
        } else {
            cout << "❌ Invalid choice. Try again.\n";
        }
    }

    return 0;
}
