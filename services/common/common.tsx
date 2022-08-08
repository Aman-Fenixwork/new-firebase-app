export const setUserToLocalStorage = (user : any) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUserFromLocalStorage = () => {
    let JsonData = localStorage.getItem("user");
    if (JsonData != null) {
        return JSON.parse(JsonData) 
    }
    else {
        return null;
    }
}