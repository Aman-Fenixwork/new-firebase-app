export const setUserToLocalStorage = (user : any, signInMethod : any) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('signInMethod', signInMethod);
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

export const getUserSignInMethod = () => {
    return localStorage.getItem("signInMethod");
}