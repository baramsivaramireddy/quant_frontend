
import ChangePassword from "@/components/Auth/Changepassword"
const ChangePasswordPage = ({params}) =>{
    return (
        <div className="flex justify-center h-full items-center  bg-gray-200">

            <ChangePassword email={params.email} />
        </div>

    )
}

export default ChangePasswordPage