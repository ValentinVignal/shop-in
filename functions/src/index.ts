import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// API

// - App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async function (request, response) {
    const total = request.params.total;
    console.log('Payment Request received for ammount', total);
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    response.status(201).send({
        clientSecret: 'secret'
    });
});

// Listen Command
exports.api = functions.https.onRequest(app);


// Example endpoint
// http://localhost:5001/shopin-97002/us-central1/api