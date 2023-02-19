const decodeToken = (token) => {
    let decodeToken;

    try{
        const stringifiedToken = atob(token.split('.')[1]);
        decodeToken = JSON.parse(stringifiedToken);
    }catch(err){
        return null;
    }

    return decodeToken;
};

export default decodeToken;