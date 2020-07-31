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

async function verifyAnswer(question, answer) {
    const response = await fetch('https://us-central1-super-spreader.cloudfunctions.net/verifyAnswer', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({question, answer}) // body data type must match "Content-Type" header
    }).catch((error) => console.log(error));

    return await response.json();
}