#include "timer.h"
#include "utils.h"
#include <iostream>
#include <chrono>
#include <thread>

using namespace std;
using namespace chrono;

Timer::Timer(int minutes, string label)
    : durationSeconds(minutes * 60), label(label), paused(false), remainingSeconds(minutes * 60) {}

void Timer::start() {
    cout << "🕒 Starting: " << label << "\n";

    while (remainingSeconds > 0) {
        if (!paused) {
            printTime(remainingSeconds, label);
            this_thread::sleep_for(seconds(1));
            remainingSeconds--;
        }
    }

    cout << "\n🔔 " << label << " completed!\n";
    logSession(label);
}

void Timer::pause() {
    paused = true;
}

void Timer::resume() {
    paused = false;
}

void Timer::reset() {
    remainingSeconds = durationSeconds;
}

bool Timer::isPaused() {
    return paused;
}

