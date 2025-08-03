#include <iostream>

using namespace std;

void showMenu() {
    cout << "\n====== Pomodoro Timer ======\n";
    cout << "1. Start Pomodoro\n";
    cout << "2. Start Short Break\n";
    cout << "3. Start Long Break\n";
    cout << "4. Quit\n";
    cout << "Choose an option: ";
}

int main(){
    int pomodoroMin = 25, shortBreakMin = 5, longBreakMin = 15;
    int choice;

  while(true){
    showMenu();
    cin >> choice;
   }
    return 0;
}