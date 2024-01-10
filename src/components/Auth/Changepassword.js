"use client";

import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const ChangePassword = (props) => {
  const [IsSendingData, setIsSendingData] = useState(false);
  const [IsResendingOTP,  setIsResendingOTP] = useState(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      otp: "",
      password: "",
    },
  });
  const onSubmit = async (values) => {
    setIsSendingData(true);
    
    values ={ ...values, email:decodeURIComponent(props.email)}
    console.log(values)
    try {
      let response = await axiosInstance.post('/api/user/changepassword' ,values)

      if (response.status == 201) {
        toast.success("password changed successfully");
        router.replace(`/login`);
      } else if (response.status == 404) {
        toast.error("user does not exist");
        reset();
      } else if (response.status == 400) {
        toast.error("otp does not exist");
        reset();
      } else if (response.status == 409) {
        toast.error("invalid otp");
        reset();
      } 
      else if (response.status == 422) {
        toast.error("invalid data");
        reset();
      } else {
        toast.error("internal server error");
        reset();
      }
    } catch (err) {
      toast.error("something went wrong");
      console.log(
        `Error   while   a user  trying to get otp to change password ${err}`
      );
    }
    setIsSendingData(false);
  };
  const resendOTP  = async () =>{
    setIsResendingOTP(true)
        let values ={
            email:decodeURIComponent(props.email)
        }
    try{

      let response = await axiosInstance.post('/api/user/forgotpassword' , values)

      if (response.status == 200){

        toast.success('otp sent successfully')
        router.replace(`/changepassword/${values.email}`)
        router.replace('/login')
      }
      else if ( response.status == 404) {
        toast.error('user does not exist')
        reset()
      }
      else if (response.status == 422){
        toast.error('invalid data')
        reset()
      }
      else{
        toast.error('internal server error')
        reset()
      }
     
    }
    catch(err){
      toast.error('something went wrong')
      console.log(`Error   while   a user  trying to get otp to change password ${err}`)
    }
  setIsResendingOTP(false)
  }
  return (
    <div>
      <RenderUi
        register={register}
        onSubmit={onSubmit}
        IsSendingData={IsSendingData}
        IsResendingOTP={IsResendingOTP}
        handleSubmit={handleSubmit}
        resendOTP={resendOTP}
        errors={errors}
      />
    </div>
  );
};
const RenderUi = (props) => {
  const { register, handleSubmit,IsResendingOTP, onSubmit, IsSendingData, errors,resendOTP } = props;
  return (
    <div className="flex flex-col gap-2 bg-white px-10 py-4">
      <div className="flex justify-center items-center flex-col my-5 ">
        <p className="text-3xl"> {"\u2693"}</p>
        <h1 className="Captilize"> Quant</h1>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register("otp", {
              required: { value: true, message: "otp is required" },
              minLength: {
                value: 4,
                message: "otp have to be 4 digit length",
              },
            })}
            className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500"
            placeholder="Enter OTP"
          />
          <ErrorMessage
            error={errors?.otp}
            Field="otp"
            type="required"
          />
          <ErrorMessage
            error={errors?.otp}
            Field="otp"
            type="minLength"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "password is required" },
              minLength: {
                value: 8,
                message: "password have to be atleast 8 characters",
              },
            })}
            className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500"
            placeholder="Enter new password"
          />
          <ErrorMessage
            error={errors?.password}
            Field="password"
            type="required"
          />
          <ErrorMessage
            error={errors?.password}
            Field="password"
            type="minLength"
          />
        </div>

        <div className="text-sm flex  justify-between">
            <button disabled={IsResendingOTP} onClick={resendOTP} type="button" className="text-red-500"> Resend otp</button>
            <div> Time remaining:  </div>
        </div>
        <div className=" bg-blue-500 text-white py-3 px-2 rounded-full text-center font-semibold hover:bg-blue-700">
          <button disabled = {IsSendingData}   type="submit"> {IsSendingData? 'verifying otp ..':'change password'}</button>
        </div>
      </form>
    </div>
  );
};
export default ChangePassword;
