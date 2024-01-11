'use client'
import AuthWrapper from '@/components/Auth/AuthWrapper'
const AdminPage = () =>{

    return (
        <AuthWrapper allowedRoles={['admin']}>
            <div>
                admin page
            </div>
        </AuthWrapper>
    )
}
export default AdminPage;