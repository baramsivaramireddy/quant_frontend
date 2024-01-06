
"use client"

import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword  = ()=>{
    const [IsSendingData, setIsSendingData] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues:{
        email:''
      }
    })
    const onSubmit = async (values) =>{
        setIsSendingData(true)
    
          try{
    
            await new Promise((resolve,reject) =>{
    
    
              setTimeout(() =>{ resolve()} , 3000)
            })
            toast.success(' OTP sent  successfully')
          }
          catch(err){
            toast.error('something went wrong')
            console.log(`Error   while   a user  trying to get otp to change password ${err}`)
          }
        setIsSendingData(false)
      } 
  
    return (
        <div>
                <RenderUi register={register} onSubmit={onSubmit} IsSendingData={IsSendingData} handleSubmit={handleSubmit} errors={errors} />
        </div>
    )
}
export default ForgotPassword;
const RenderUi = (props) => {
    const {register,handleSubmit,onSubmit ,IsSendingData ,errors} = props;
    return (
  
      <div className="flex flex-col gap-2 bg-white px-10 py-4" >
          <div className="flex justify-center items-center flex-col my-5 "> 
              <p className="text-3xl">    {'\u2693'}</p>
              <h1 className="Captilize">  Quant</h1>
              </div>
          <form className="flex flex-col gap-5"  onSubmit={handleSubmit(onSubmit)}>
  
            
              <div>
                  <input type="email" className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter mail" />
                  <ErrorMessage error={errors?.email} Field='email' type="required" />
              </div>
              
              <div className=" bg-blue-500 text-white py-3 px-2 rounded-full text-center font-semibold hover:bg-blue-700">
                  <button type="submit" > {IsSendingData?"sending OTP":"Get OTP"}</button>
              </div>
          </form>
      </div>
    );
  };