import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req : any, res: any) => {
    const original = req.query.text;
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
.onCreate((snap: any, context: any) => {
    const original = snap.data().original;
    functions.logger.log('Uppercasing', context.params.documentId, original);
    
    const uppercase = original.toUpperCase();
    return snap.ref.set({uppercase}, {merge: true});
});
