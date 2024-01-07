"use client"

import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import axiosInstance from '@/utils/axiosInstance'

const Login = () =>{
    const [IsSendingData, setIsSendingData] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm({
      defaultValues:{
        email:'',
        password:''
      }
    })
  
    const onSubmit = async (values) =>{
      setIsSendingData(true)

        // converting email to smallcase
        values.email = values.email.toLowerCase()
  
        try{
            let response = await axiosInstance.post('/api/user/login',values)
            
            if (response.status == 200) {
              // redirect user
              toast.success('loged in ')
            }
            else if (response.status == 401){
              toast.error('password invalid')
              reset()
            }
            else if (response.status ==   404){
              toast.error('user does not exist')
              reset()
            }
            else {
              toast.error("Internal server error")
            }
        }
        catch(err){
          toast.error('something went wrong')
          console.log(`Error   while  loging a user ${err}`)
        }
      setIsSendingData(false)
    } 

    return (
        <div >
        <RenderUi  register={register} onSubmit={onSubmit} IsSendingData={IsSendingData} handleSubmit={handleSubmit} errors={errors} />
        </div>
    )                                                                                                                                 
}



const RenderUi = (props) => {
    const {register,handleSubmit,onSubmit ,IsSendingData ,errors} = props;
    return (
  
      <div className="flex flex-col gap-2 bg-white py-4 px-10">
          <div className="flex justify-center items-center flex-col my-5 "> 
              <p className="text-3xl">    {'\u2693'}</p>
              <h1 className="Captilize">  Quant</h1>
              </div>
          <form className="flex flex-col gap-5 " onSubmit={handleSubmit(onSubmit)}>

              <div>
                  <input type="email"  {...register('email' , {required:{value:true,message:"Email is required"} ,})} className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter mail" />
                  <ErrorMessage error={errors?.email} Field='email' type="required" />
              </div>
              <div className="flex flex-col gap-2">
                  <input {...register('password' , {required:{value:true, message:"password is required"},minLength:{value:8,message:"Minimum  8 characters is required"}})}  type="password" className=" outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter password" />
                  <ErrorMessage error={errors?.password} Field='password' type="required" />
                <ErrorMessage error={errors?.password} Field='password' type="minLength" />
                <Link className="text-sm text-red-500 hover:text-red-700" href={'/forgotpassword'}> Forgot Password ?</Link>
            </div>

              <div className=" bg-blue-500 text-white py-3 px-2 rounded-full text-center font-semibold hover:bg-blue-700">
                  <button type="submit" > {IsSendingData? 'verifiying Password ...':"Login in"}</button>
              </div>
          </form>
      </div>
    );
}
export default Login