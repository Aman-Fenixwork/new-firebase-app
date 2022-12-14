import { BorderOuter } from "@mui/icons-material";
import * as admin from "firebase-admin";
import serviceAccount from '../../../config/admin-sdk.json'

if (!admin.apps.length) {
    admin.initializeApp({credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)))});
} else {
    admin.app()
}


function getToken(req: any, res: any) {
    if (req.method === 'POST'){
        const body = JSON.parse(req.body);
        const additionalClaims = {
            userEmail : body.email
        };
        
        admin.auth().createCustomToken(body.uid,additionalClaims)
        .then((token: string) => {
            res.status(200).json({ token: token })
        })  
    } else {        
        res.status(200).json({ token: 'No Token' })
    }
}

export default getToken