function app() {
    return {
        start: false,

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