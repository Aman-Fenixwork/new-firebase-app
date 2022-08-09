import db from "../admin";

export default async function updateUserByUID(req: any, res: any) {
    
    const { method, body, query } = req;
    try {
        switch(method){
            case 'GET':
                const { uid:userUID } = query; 
                let docID;
                const getQuerySnapshot = await db.collection("users").where("user_uid", "==", userUID).get();
                const data = getQuerySnapshot.docs.map(doc => {
                    docID = doc.id;
                    return doc.data()
                });
                if(docID){
                    res.status(200).json({response: { id: docID, data: data[0] }, status: 200 });
                }else{
                    res.status(200).json({response: {}, status: 404 });
                }
                break;
            case 'POST':
                const requestBody = JSON.parse(body);
                switch (requestBody?.action) {
                    case 'add':
                        const user = requestBody.user;
                        const ref = await db.collection('users').add({...user});
                        res.status(200).json({ message: 'Success', response: { id: ref.id }, status: 200 });
                        break;
                    default:
                        break;
                }
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).json({ message: `${method} Method Not Allowed`, response: [], status: 405 });
                break;
        }
    } catch (error) {
        res.status(500).json({ message: "Failed", response: null });        
    }
}