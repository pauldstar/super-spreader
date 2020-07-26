function app() {
    return {
        start: false,
        questions: null,
        leaderboard: null,
        userInformation: {
            username: '',
            elapsedTime: '',
            correctAnswers: 0
        },
        async mounted() {
            console.log(this.questions);
            const data = await Promise.all([getLeaderboard(), getQuestions()]);
            this.leaderboard = data[0];
            this.questions = data[1];
        },

        startGame() {
            this.start = true;
        },

        endGame() {
            this.start = false;
        },

        started() {
            return this.start === true;
        }
    }
}