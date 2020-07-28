const formatTime = (minutes, seconds) => {
    let secondsString;
    let minutesString;

    if (seconds < 10) {
        secondsString = `0${seconds}`
    }

    if (minutes < 10) {
        minutesString = `0${minutes}`
    }

    return `${minutesString}:${secondsString || seconds}`
};