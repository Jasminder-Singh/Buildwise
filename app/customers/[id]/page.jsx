import CustomerId from "@/components/customers/customerId";
import { getServerSession } from "next-auth/next";
import {redirect} from 'next/navigation';

const Customer = async ({params})=>{
    const session = await getServerSession();

    if(!session) redirect("/");

    return(
        <CustomerId id = {params.id}/>
    )
}

export default Customer;