"use client";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GoPerson } from 'react-icons/go';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Login = () => {

	const router = useRouter();
	const session = useSession();
	const [flag, setFlag] = useState(false); // Check if user clicks on login button or not;
	const [spiner, setSpiner] = useState(false);
	if(session?.status === "authenticated") redirect("/customers");

	const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().required()
		}),
		onSubmit: async (values) => {
			try {
				setSpiner(true); // Spiner Loading.
				const response = await signIn("credentials", {
					email: values.email,
					password: values.password,
					redirect: false
				});
				setFlag(true); // It sets to true to identifying user clicks on login button.
				setSpiner(false); // Spiner stops.
				if(response.error){
					toast.error('Email or password are invalid.', {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}

			} catch (err) {
				toast.error('Failed ! try later.', {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				console.log(err);
			}
		}

	});


	return (
		<form className='h-full flex justify-center mt-5 w-full' onSubmit={handleSubmit}>

			<div className=' h-[70%] w-full p-5 flex flex-col justify-around drop-shadow-lg'>
				<h1 className='text-3xl font-bold text-center text-[#1060D2]'>Login</h1>
				<div className='flex justify-center items-center'><GoPerson className='text-6xl md:text-8xl' /></div>
				<div className=' w-[70%] md:w-[50%] self-center'>
					<div className='flex items-center justify-center w-auto '>
						<label htmlFor='email' className='w-10 text-center text-2xl' >
							<MdEmail className={`${errors.email && touched.email ? 'text-red-700' : 'text-emerald-600'}`} />
						</label>
						<input id='email' type='email' name='email' value={values.email} placeholder='example@gmail.com'
							className={`border border-black px-3 py-1 w-full mb-2 
						${errors.email && touched.email ? 'border-red-500' : null}`}
							onChange={handleChange} onBlur={handleBlur} />
					</div>
					<div className='flex items-center justify-center '>
						<label htmlFor='password' className='w-10 text-center text-2xl' >
							<RiLockPasswordFill className={`${errors.email && touched.email ? 'text-red-700' : 'text-emerald-600'}`} />
						</label>
						<input id='password' type='password' name='password' value={values.password} placeholder="Password..."
							className={`border border-black px-3 py-1 w-full 
						${(errors.password && touched.password) ? 'border-red-500' : null}`}
							onChange={handleChange} onBlur={handleBlur} />
					</div>
					<div className='flex justify-center items-center p-5 '>
						<button type='submit' className='flex justify-around items-center border-2 px-5 py-2 w-40 bg-[#1060D2] text-white text-lg tracking-wider rounded-lg hover:border-[#1060D2]'>
							{
								spiner
									? <span className="animate-spin border-t-4 rounded-full w-8 h-8 block hover:border-[#1060D2]"></span>
									: <span>Login</span>
							}
						</button>
					</div>
				</div>
				<div>
					<p className=' text-center text-black text-lg font-bold'>
						<span className='text-red-500 text-md'>Note </span>
						: If you don't have any account then please
						<Link href={"/signup"} className='text-blue-500 underline ' > signup.</Link>
					</p>
				</div>
				
			</div>
		</form>
	)
}
export default Login;