/*
* This component is for the authenticating and authorizing the user
*
*
*/
'use client'
import { AuthContext } from "@/utils/context"
import { useContext } from "react"
import Link from 'next/link'
const AuthWrapper = ({allowedRoles, children}) =>{
   
    const {userToken} = useContext(AuthContext)
    
    if (userToken == null){
        
        return (<>

            <p> you need to login <Link href={'/login'}> click here</Link> to login </p>
        </>)
    }
    console.log(userToken)
    
    let userRoles = getRoles(userToken)
    let isPermitted = userRoles.some(role => {
        return allowedRoles.includes(role)
    });
    

    if (!isPermitted) {
       
        return (
            <>
                 <h1> you are not permitted</h1>
            </>
        )

    }
    return (<>

        {children}
    </>)
}

export default AuthWrapper
const getRoles = (token) =>{
   
    let payload  = token.split('.')[1]

    let roles = JSON.parse(atob(payload))['roles']
    return roles;
}