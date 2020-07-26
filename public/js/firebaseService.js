function getQuestions() {
    let questionsRef = firebase.database().ref('questions/');
    questionsRef.on('child_added', function (data) {
        console.log(data.val());
    }, (error) => {
        console.log(error);
    });
}

function getLeaderboard() {
    let leaderBoardRef = firebase.database().ref('leaderboard/');
    leaderBoardRef.on('child_added', function (data) {
        console.log(data.val());
    }, (error) => {
        console.log(error);
    });
}

//TODO - test to is if it works.
function pushToLeaderboard(user) {
    var newPostKey = firebase.database().ref().child('questions').push().key;
    let leaderBoardRef = firebase.database().ref(`leaderboard/${newPostKey}`);
    leaderBoardRef.set(user);
}