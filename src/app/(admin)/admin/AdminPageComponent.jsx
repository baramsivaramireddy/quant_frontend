"use client"
import { useEffect, useMemo, useState } from "react";
import axiosInstance from '@/utils/axiosInstance'
import {useToken} from '@/hooks/useAuth'
import Link from 'next/link'
const AdminPageComponent = () =>{
   
    const [users, setUsers] = useState(null)
    const [roles, setRoles] = useState(null)
    let token = useToken()
    useEffect(() =>{
        const getAllUsers = async (token) =>{

   

            try{
                let responses = await axiosInstance.get('/api/user' , {headers:{
                    "Authorization":`Bearer ${token}`
                }})
              setUsers(responses.data.data) ;
            }
            catch(err){
                console.log(`Error while fetching all users`)
            }
        }
        const getAllRoles = async (token) =>{

   

            try{
                let responses = await axiosInstance.get('/api/role' , {headers:{
                    "Authorization":`Bearer ${token}`
                }})
              setRoles(responses.data.data) ;
            }
            catch(err){
                console.log(`Error while fetching all users`)
            }
        }
        
            getAllUsers(token)
            getAllRoles(token)
    }, [])
   
 
    return (<>
        
        <div className="h-full flex ">

            <div className="w-72   h-full">

            </div>
            <div className="w-full ">
                < RenderUI  users={users} roles={roles}/>
            
            </div>
        </div>
    </>)
}
export default AdminPageComponent;


const RenderUI = (props) =>{
    let {users} = props

    const allColums = useMemo(() =>{

        return [
            {key:"name" , label:"Name"},
            {key:"email" , label:"Email"},
            {key:"roles" ,label:"Roles"},
            
        ]
    } ,[])

    let rolesColorMap ={
        user:'bg-green-500 rounded-full  px-2',
        admin:"bg-red-500 rounded-full  px-2"
    }
    return (

        <>
            <div className="h-1/6 flex items-center">
            <p className="text-2xl font-semibold">    User</p>
            </div> 
            <div className="h-5/6">
                {/* table  */}


                <table className="border-2  p-5  rounded ">
                    <thead className="border-2 ">
                        {allColums.map((column ,index) => (<th className="border-2 px-5" key={column.key}> {column.label} </th>))}
                    </thead>
                    <tbody>
                    {users == null? <tr>  loading</tr>: users.map((user,index) =>{
                        return (
                            <tr className="border-2  text-center " key={index}> 
                                
                                <td className="border-2 px-5"> <Link href={`/admin/${user._id}`}> {user.name}</Link> </td>
                            <td className="border-2  px-5"> {user.email}</td>
                            <td className="border-2  px-5 "> <ul className="flex flex-col gap-2">
                            {user.roles.map((role ,index) => (<li key={index}> {<p className={`${rolesColorMap[role.name]}`}>   {role.name}</p>} </li>))}
                            </ul> </td>
                         </tr>)
                    })}
                    </tbody>
                  
                </table>
            </div>
        </>
    )
}

