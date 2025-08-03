#ifndef TIMER_H
#define TIMER_H

#include <string>
using namespace std;

class Timer {
private:
    int durationSeconds;
    string label;
    bool paused;
    int remainingSeconds;

public:
    Timer(int minutes, string label);
    void start();
    void pause();
    void resume();
    void reset();
    bool isPaused();
};

#endif
