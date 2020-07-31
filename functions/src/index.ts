import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const verifyAnswer = functions.https.onRequest(async (request, response) => {
    return cors()(request, response, async () => {
        const question = request.body.question;
        const answer = request.body.answer;
        const path = buildPath(question);
        if (path) {
            await admin.database().ref(path).once('value', (snapshot) => {
                const isCorrectAnswer = snapshot.val().superSpreader == answer;
                response.send({isCorrectAnswer});
            }, () => response.send("Error!"))
        } else {
            response.status(400).end();
        }
    })
});


let buildPath = (question: string): string | undefined => {
    if (question === undefined) return;
    return `questions/${question}`;
}