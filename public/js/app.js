function app() {
    return {
        started: false,
        questions: null,
        leaderboard: null,
        stage: 0,
        selection: null,

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
        get currentSuspects() {
            return this.questions[this.stage].suspects;
        },

        get currentRiddle() {
            return this.questions[this.stage].riddle;
        },

        get currentSuperSpreader() {
            return this.questions[this.stage].superSpreader;
        },

        selectSuspect(selection) {
            this.selection = selection;

            let isCorrect = this.isCorrect(selection);
            isCorrect && this.userInfo.correctAnswers++;

            this.modalTitle = isCorrect ? 'Correct' : 'Wrong';
            this.modalMessage = `You selected super spreader ${selection}`;
            this.modalOpen = true;
        },

        isCorrect(selection) {
            return selection === this.currentSuperSpreader;
        },

        nextStage() {
            this.stage++;
            this.modalOpen = false;
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
            this.userInfo.elapsedTime = '00:00';
        }
    }
}