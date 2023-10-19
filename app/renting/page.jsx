import ToolForm from "@/components/toolForm/form";
import Footer from '@/components/footer/footer';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';

const Renting = async () => {
    const session = await getServerSession();

    if (!session) {
        redirect("/");
    }
    return (
        <div>
            <ToolForm />
            <Footer />
        </div>
    )
}
export default Renting;