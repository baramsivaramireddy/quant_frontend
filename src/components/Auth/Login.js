import Link from "next/link";


const Login = () =>{


    return (
        <div >
        <RenderUi />
        </div>
    )                                                                                                                                 
}



const RenderUi = (props) => {
    return (
  
      <div className="flex flex-col gap-2 bg-white py-4 px-10">
          <div className="flex justify-center items-center flex-col my-5 "> 
              <p className="text-3xl">    {'\u2693'}</p>
              <h1 className="Captilize">  Quant</h1>
              </div>
          <form className="flex flex-col gap-5">

              <div>
                  <input type="email" className="outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter mail" />
              </div>
              <div className="flex flex-col gap-2">
                  <input  type="password" className=" outline-1 outline-gray-200 rounded p-2 outline-none hover:outline hover:outline-black hover:outline-1 focus:outline focus:outline-1 focus:outline-blue-500" placeholder="Enter password" />
                <Link className="text-sm text-red-500 hover:text-red-700" href={'/forgotpassword'}> Forgot Password ?</Link>
            </div>

              <div className=" bg-blue-500 text-white py-3 px-2 rounded-full text-center font-semibold hover:bg-blue-700">
                  <button type="submit" > Signup</button>
              </div>
          </form>
      </div>
    );
}
export default Login