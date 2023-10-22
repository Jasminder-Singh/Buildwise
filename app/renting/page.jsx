import ToolForm from "@/components/toolForm/form";
import Footer from '@/components/footer/footer';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
const tools = async ()=>{
    try {
        const response = await fetch("https://buildwise-three.vercel.app/api/maintools",{
            method : "GET",
            cache : "no-store"
        });
        return response.json();
    } catch (err) {

        console.log(err);
    }
}
const Renting = async () => {
    const session = await getServerSession();
    const getTools = await tools();

    if (!session) {
        redirect("/");
    }
    return (
        <div>
            <ToolForm getTools={getTools.tools} />
            <Footer />
        </div>
    )
}
export default Renting;