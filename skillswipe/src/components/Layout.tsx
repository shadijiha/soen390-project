import { checkLogin } from "@/pages/api/api";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {Spinner} from  "@chakra-ui/spinner";
import {Box}  from  "@chakra-ui/react";


const Layout = ({children } : any)=>{
    const [Loading,setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if(token){
            checkLogin(token).then((response) => {
                if(router.asPath == "/register" || router.asPath=="/"){
                    router.push("/home")
                    setTimeout(() => {setLoading(false)},100)
                }
                else{
                    setLoading(false);
                }
            }).catch((error) => {
                router.push('/')
                setTimeout(() => {setLoading(false)},100)
                localStorage.removeItem('jwt');
            })
        }
        else{
            router.push('/')
            setTimeout(() => {setLoading(false)},100)
        }
    },[])
    return(
        <>
        <main>
            {Loading ? 
            <Box align={"center"} mt={"20px"}>
                <Spinner/> 
            </Box>
            : 
            children
            }
        </main>
        </>
    )

}
export default Layout;