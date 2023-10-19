import Add from "@/components/addtool/add";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";


const AddTool = async ()=>{
    const session = await getServerSession();
    if(!session) redirect("/");
    return(
        <Add />
    )
}
export default AddTool;