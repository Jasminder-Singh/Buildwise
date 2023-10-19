"use client";
import Image from 'next/image';
import './lsStyle.css';
import loginImage from '@/public/loginImage.jpg'
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
// import { FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from "../loading/loading";

const LScontainer = () => {
	const session = useSession();
	const [flag, setFlag] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleLoading = (provider) => {
		signIn(provider, { callbackUrl: "/customers" });
		setLoading(true);
		if (session.status === "authenticated") {
			setLoading(false);
		}
	}
	return (
		<>
			{loading && <Loading />}
			<div className='w-full flex justify-evenly border-2 border-black '>
				<div className='border-2 sm:w-[50%] md:w-[40%] border-slate-500'>
					<div className='px-5 py-2 flex flex-col items-center w-full'>
						<p className='text-center font-bold text-xl mb-5'>SignIn with</p>
						<div className='border border-black px-5 py-2 flex items-center justify-center w-full sm:w-[50%] mb-5 cursor-pointer'
							onClick={() => handleLoading("google")}>
							<span className='flex items-center font-semibold'>
								<FcGoogle className='inline-block text-2xl mx-2' /> Google
							</span>
						</div>
						<div className='border border-black px-5 py-2 flex items-center justify-center w-full sm:w-[50%] mb-5 cursor-pointer'
							onClick={() => handleLoading("facebook")}>
							<span className='flex items-center font-semibold'>
								<BsFacebook className='inline-block text-2xl mx-2 text-blue-600' /> Facebook
							</span>
						</div>
						
					</div>
					<div className=' '>
						<p className='border-b-2 border-t-2 border-black text-center tracking-wider'>or</p>
						<p className='text-md font-sans font-semibold px-3 py-2 text-center'>You can go with <span className='text-blue-500' >BuildWise</span> to create an account and Signin</p>
					</div>
					<div className='flex flex-col justify-evenly items-center h-48 p-5'>
						<span onClick={() => { signIn(); setLoading(true) }}
							className='bg-blue-600 text-md text-white text-center px-5 py-2 rounded-lg tracking-wider cursor-pointer'>
							Login
						</span>
						<Link href={"/signup"} onClick={() => setLoading(true)}
							className='bg-blue-600 text-md text-white text-center px-5 py-2 rounded-lg tracking-wider cursor-pointer'>
							Create account
						</Link>
					</div>
					<p className='px-2 font-semibold text-md'><span className='text-red-500'>Note</span>: If you have an account then your should login otherwise create new account.</p>
				</div>
				<div className='hidden sm:block sm:w-[50%] md:w-[50%] '>
					<Image src={loginImage} alt='loginImage' className='w-full h-full' priority={true} />
				</div>

			</div>
		</>
	)
}
export default LScontainer;