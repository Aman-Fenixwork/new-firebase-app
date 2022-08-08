import { getUserFromLocalStorage }from  '../../../services/common/common';

const fetchUser = async (uid?: string): Promise<any> => {
    const user = getUserFromLocalStorage();
    try {
      const query: Response = await fetch(
        `/api/users?uid=${uid ?? user?.uid}`,
        {
          headers: { uid: uid ?? user?.uid },
        }
      );
      const res = await query.json();
      return res;
    } catch (error) {
      return null;
    }
  };

  const checkUserExistsOnDb = async (uid: string)=> {
      try {
        let isExists = false,
        docId = "";
        const res = await fetchUser(uid);
        if (res && res.status === 200 && res?.response?.id) {
          const { response } = res;
          isExists = true;
          docId = response.id;
        }
        return { isExists, docId, status: res.status };
      } catch (error) {
        console.log("error");
        return { isExists: false, docId: false, status: 404 };
      }
  };

  const addUserToDb = async (user: any, uid: string): Promise<any> => {
    const { isExists, docId, status } = await checkUserExistsOnDb(uid);
    if (!isExists && (status === 200 || status === 404)) {
      try {
        const query = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({
            action: "add",
            user: {
              name: user?.displayName,
              email: user?.email,
              photoURL: user?.photoURL,
              user_uid: user?.uid,
            },
          }),
        });
      } catch (e) {
        console.error("Error adding user to DB: ", e);
      }
    } else {
      console.log("user already exists!!!");
      return docId;
    }
  };

  export default addUserToDb;