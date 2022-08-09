import { getUserFromLocalStorage }from  '../../../services/common/common';

const fetchUser = async (uid?: string): Promise<any> => {
    const user = getUserFromLocalStorage();
    console.log("User From LocalStorage :",user);
    try {
      const query: Response = await fetch(
        `/api/user?uid=${uid ?? user?.uid}`,
        {
          method: "GET",
          headers: { uid: uid ?? user?.uid },
        }
      )
      const res = await query.json();
      console.log("fetch response :",res);
      return res;
    } catch (error) {
      console.log("Fetch user from DB :",error);
      return null;
    }
  };

  const checkUserExistsOnDb = async (uid: string)=> {
      try {
        let isExists = false,
        docId = "";
        const res = await fetchUser(uid);
        if (res && res?.status === 200 && res?.response?.id) {
          const { response } = res;
          isExists = true;
          docId = response.id;
        }
        else if(res && res?.status === 404){
          isExists = false;
        }
        return { isExists, docId, status: res.status };
      } catch (error) {
        console.log("error while checking user in DB :",error);
        return { isExists: false, docId: false, status: 404 };
      }
  };

  const addUserToDb = async (user: any, uid: string): Promise<any> => {
    const { isExists, docId, status } = await checkUserExistsOnDb(uid);
    if (!isExists && (status === 200 || status === 404)) {
      try {
        const query = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({
            action: "add",
            user: {
              createdAt : user.createdAt,
              name: user?.displayName,
              email: user?.email,
              photoURL: user?.photoURL,
              user_uid: user?.uid,
            },
          }),
          
        });
        const res = await query.json();
        if (res && res.status === 200) {
            console.log("User added successfully!");
        }
      } catch (e) {
        console.error("Error adding user to DB: ", e);
      }
    } else {
      console.log("user already exists!!!");
      return docId;
    }
  };

  export default addUserToDb;

