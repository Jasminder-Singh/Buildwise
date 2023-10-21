"use client";
import Image from 'next/image';
import './lsStyle.css';
import loginImage from '@/public/loginImage.jpg'
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
// import { FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import {useState } from 'react';
import Loading from "../loading/loading";

const LScontainer = () => {
	const session = useSession();
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
			<div className='w-full flex justify-evenly border-2 border-black p-2 my-5'>
				<div className='border w-full md:w-[40%] border-slate-500 flex flex-row md:flex-col'>
					<div className='px-5 py-2 flex flex-col justify-evenly md:justify-start items-center w-full border-e-2 border-black md:border-0'>
						<p className='text-center font-bold text-md md:text-xl mb-5'>SignIn with</p>
						<div className='border border-black px-5 py-2 flex items-center justify-center w-full sm:w-[70%] mb-5 cursor-pointer text-sm md:text-md'
							onClick={() => handleLoading("google")}>
							<span className='flex items-center font-semibold'>
								<FcGoogle className='inline-block text-2xl mx-2' /> Google
							</span>
						</div>
						<div className='border border-black px-5 py-2 flex items-center justify-center w-full sm:w-[70%] mb-5 cursor-pointer text-sm md:text-md'
							onClick={() => handleLoading("facebook")}>
							<span className='flex items-center font-semibold'>
								<BsFacebook className='inline-block text-2xl mx-2 text-blue-600' /> Facebook
							</span>
						</div>

					</div>
					<div className='hidden md:block'>
						<p className='border-b-2 border-t-2 border-black text-center tracking-wider'>or</p>
						<p className='text-md font-sans font-semibold px-3 py-2 text-center'>You can go with <span className='text-blue-500' >BuildWise</span> to create an account and Signin</p>
					</div>
					<div>
						<div className='flex flex-col justify-evenly items-center h-48 p-5'>
							<span onClick={() => { signIn(); setLoading(true) }}
								className='bg-blue-600 text-xs md:text-md text-white text-center py-2 rounded-lg tracking-wider cursor-pointer w-full md:w-[50%]'>
								Login
							</span>
							<Link href={"/signup"} onClick={() => setLoading(true)}
								className='bg-blue-600 text-xs md:text-md text-white text-center py-2 rounded-lg tracking-wider cursor-pointer w-full md:w-[50%]'>
								Sign up
							</Link>
						</div>

						<p className='px-2 font-semibold text-sm md:text-md'><span className='text-red-500'>Note</span>: If you have an account then your should login otherwise create new account.</p>
					</div>
				</div>
				<div className='hidden md:block sm:w-[50%] md:w-[50%] '>
					<Image src={loginImage} alt='loginImage' className='w-full h-full' priority={true} />
				</div>

			</div>
		</>
	)
}
export default LScontainer;