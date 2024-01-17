import AddQuestion from './AddQuestion'
import AuthWrapper from "@/components/Auth/AuthWrapper"
const AddquestionsPage = () =>{

    return (
        <>
          <AuthWrapper allowedRoles={['admin','expert']}>
        <AddQuestion />
          </AuthWrapper>
        </>
    )
}

export default AddquestionsPage