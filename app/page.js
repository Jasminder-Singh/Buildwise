import Banner from '@/components/Banner/banner';
import Footer from '@/components/footer/footer';
import LScontainer from '@/components/login_signup/lscontainer'; // This contains both login ans signup components.
import { getServerSession } from 'next-auth/next';
import {redirect} from 'next/navigation'

export default async function Home() {
  const session = await getServerSession();
  if(session) redirect("/customers");
  return (
    <main className="w-full relative h-screen">
      <Banner />
      <LScontainer />
      <Footer />
    </main>
  )
}
