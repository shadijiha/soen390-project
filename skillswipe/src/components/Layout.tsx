import React from "react";
import NavBar from './NavBar';
const Layout = ({children } : any)=>{
    return(

        <>
        <NavBar/>
        <main>
        {children}
        </main>
        </>
    )

}
export default Layout;