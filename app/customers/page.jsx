import Customers from '@/components/customers/customers';
import {getServerSession} from 'next-auth/next';
import { redirect } from 'next/navigation';

const CustomerPage = async ()=>{
    const session = await getServerSession();
    if(!session){
        redirect('/');
    }
    return (
        <Customers />
    )
}
export default CustomerPage;