'use client'
import AuthWrapper from '@/components/Auth/AuthWrapper'
import AdminPageComponent from './AdminPageComponent'
const AdminPage = () =>{

    return (
        <AuthWrapper allowedRoles={['admin']}>
            <AdminPageComponent />
        </AuthWrapper>
    )
}
export default AdminPage;