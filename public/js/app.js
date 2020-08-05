//TODO - remove answers from questions table and move to another table (answers will only be verified by the cloud function
//TODO - add pictures and riddles on the db for other questions (this is causing an error when trying to show the next question.
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

        inputError: '',

        userInfo: {
            username: '',
            elapsedTime: '00:00',
            correctAnswers: 0
            correctAnswers: 0,
            hiScore: 0
        },

        timerInterval: null,


        async mounted() {
            const data = await Promise.all([getLeaderboard(), getQuestions()]);
            this.leaderboard = data[0];
            this.questions = data[1];

        get questionsLength() {
            // return Object.keys(this.questions).length;
            return 2;
        },
        get currentSuspects() {
            if (this.isUserAtTheEnd())
                return;

            return this.questions[this.stage].suspects;
        },

        get currentRiddle() {
            if (this.isUserAtTheEnd())
                return;

            return this.questions[this.stage].riddle;
        },

        get currentSuperSpreader() {
            if (this.isUserAtTheEnd())
                return;

            return this.questions[this.stage].superSpreader;
        },

        get gameOver() {
            return this.stage === this.questionsLength;
        },

        get correctAnswers() {
            return this.userInfo.correctAnswers;
        },

        get elapsedUnixTime() {
            return this.userInfo.correctAnswers;
        },

        get score() {
            return this.correctAnswers
                && (this.correctAnswers / this.elapsedUnixTime) * 300;
        },

        async selectSuspect(selection) {
            this.selection = selection;

            let isCorrect = await this.isCorrect(selection);
            isCorrect && this.userInfo.correctAnswers++;

            this.modalTitle = isCorrect ? 'Correct' : 'Wrong';
            this.modalMessage = `You selected super spreader ${selection}`;
            this.modalOpen = true;
        },

        async isCorrect(selection) {
            const result = await verifyAnswer(this.stage, selection);
            return result.isCorrectAnswer;
        },

        nextStage() {
            if (this.isUserAtTheEnd())
                return;

            this.stage++;
            this.modalOpen = false;

            this.updateHiScore();
        updateHiScore() {
            if (this.userInfo.hiScore < this.score) {
                this.userInfo.hiScore = this.score;
            }
        },
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

        isUserAtTheEnd() {
            return this.stage === this.questions.length;
        },

        resetTimer() {
            if (this.timerInterval) this.stopTimer();
            this.userInfo.elapsedTime = '00:00';
        },

        get currentProgress() {
            return this.stage * (100 / this.questionsLength);
        },

        get progressStyle() {
            let progress = this.stage * (100 / this.questionsLength);
            return `width: ${progress}%`;
        }
    }
}