function app() {
    return {
        started: false,
        questions: null,
        leaderboard: null,
        modalOpen: false,
        modalTitle: '',
        modalMessage: '',
        userInfo: {
            username: '',
            elapsedTime: '00:00',
            correctAnswers: 0
        },
        timerInterval: null,
        async mounted() {
            const data = await Promise.all([getLeaderboard(), getQuestions()]);
            this.leaderboard = data[0];
            this.questions = data[1];
        },

        startGame() {
            this.started = !this.started;
        },

        endGame() {
            this.started = false;
        },

        startTimer() {
            let seconds = 0;
            let minutes = 0;

            this.timerInterval = setInterval(() => {
                seconds++;
                if (seconds === 59) seconds = 0;
                if (seconds === 0) minutes++;
                this.userInfo.elapsedTime = formatTime(minutes, seconds);
            }, 1000)
        },

        stopTimer() {
            if (this.timerInterval) clearInterval(this.timerInterval)
        },

        resetTimer() {
            if (this.timerInterval) this.stopTimer();
        }
    }
}