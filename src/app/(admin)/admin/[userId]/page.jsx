'use client'
import AuthWrapper from '@/components/Auth/AuthWrapper'
import UserUpdateComponent from './userUpdateComponent';
const UserUpdatePage = ({params}) =>{

    return (
        <AuthWrapper allowedRoles={['admin']}>
                <UserUpdateComponent  userId={params.userId}/>
        </AuthWrapper>
    )
}
export default UserUpdatePage;