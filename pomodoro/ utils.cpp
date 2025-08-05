#include "utils.h"
#include <iostream>
#include <fstream>
#include <iomanip>
#include <ctime>

using namespace std;

void printTime(int secondsLeft, string label) {
    int minutes = secondsLeft / 60;
    int seconds = secondsLeft % 60;

    cout << "\r[" << label << "] "
         << setw(2) << setfill('0') << minutes << ":"
         << setw(2) << setfill('0') << seconds << flush;
}

void logSession(const string& sessionLabel) {
    ofstream file("session_log.txt", ios::app);
    file << sessionLabel << " | " << getCurrentTime() << "\n";
    file.close();
}

string getCurrentTime() {
    time_t now = time(0);
    tm* ltm = localtime(&now);

    char buffer[30];
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", ltm);
    return string(buffer);
}
