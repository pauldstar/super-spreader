function getQuestions() {
    return new Promise((resolve, reject) => {
        let questionsRef = firebase.database().ref('questions/');
        questionsRef.once('value', function (data) {
            resolve(data.val())
        }, (error) => {
            console.log(error);
            reject(error);
        });
    })
}

function getLeaderboard() {
    return new Promise((resolve, reject) => {
        let leaderBoardRef = firebase.database().ref('leaderboard/');
        leaderBoardRef.once('value', function (data) {
            resolve(data.val())
        }, (error) => {
            console.log(error);
            reject(error)
        });
    })
}

function pushToLeaderboard(user) {
    var newPostKey = firebase.database().ref().child('questions').push().key;
    let leaderBoardRef = firebase.database().ref(`leaderboard/${newPostKey}`);
    leaderBoardRef.set(user);
}