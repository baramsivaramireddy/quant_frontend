"use client"

import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import toast from "react-hot-toast";
const SignUp = () => {
   const [IsSendingData, setIsSendingData] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      email:'',
      name:"",
      password:''
    }
  })

  const onSubmit = async (values) =>{
    setIsSendingData(true)

      try{

        await new Promise((resolve,reject) =>{


          setTimeout(() =>{ resolve()} , 3000)
        })
        toast.success('created account successfully')
      }
      catch(err){
        toast.error('something went wrong')
        console.log(`Error   while  creating an accont ${err}`)
      }
    setIsSendingData(false)
  } 
  return (
    <div className="shadow  bg-white py-5 px-10 ">
      <RenderUi  register={register} onSubmit={onSubmit} IsSendingData={IsSendingData} handleSubmit={handleSubmit} errors={errors} />
    </div>
  );
};

const RenderUi = (props) => {

  const {register,handleSubmit,onSubmit ,IsSendingData ,errors} = props;
  return (

    <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center flex-col my-5 "> 
            <p className="text-3xl">    {'\u2693'}</p>
            <h1 className="Captilize">  Quant</h1>
            </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

            <div>
                <input {...register('name' , {required:{value:true,message:"Name is required"} , })}  className=" outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter your name" />
                <ErrorMessage error={errors?.name} Field='name' type="required" />
            </div>
            <div>
                <input {...register('email' , {required:{value:true,message:"Email is required"} ,})} type="email" className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline lo hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter mail" />
                <ErrorMessage error={errors?.email} Field='email' type="required" />
            </div>
            <div>
                <input  {...register('password' , {required:{value:true, message:"password is required"},minLength:{value:8,message:"Minimum  8 characters is required"}})} type="password" className=" outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter password" />
                <ErrorMessage error={errors?.password} Field='password' type="required" />
                <ErrorMessage error={errors?.password} Field='password' type="minLength" />
            </div>
            <div className=" bg-blue-500 text-white py-3 px-2 rounded-full text-center font-semibold hover:bg-blue-700">
                <button type="submit" > {IsSendingData?"Creating an account...":'Sign UP'} </button>
            </div>
        </form>
    </div>
  );
};
export default SignUp;
