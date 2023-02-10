export const setUser = (User : any) =>{
    return (dispatch : any) =>{
        dispatch({
            type : 'setUser',
            payload : User
        })
    }
}
