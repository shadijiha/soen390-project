export const setUser = (User : any) =>{
    console.log("Set user")
    return (dispatch : any) =>{
        dispatch({
            type : 'setUser',
            payload : User
        })
    }
}
