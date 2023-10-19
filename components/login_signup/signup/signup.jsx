"use client";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GoPersonAdd } from 'react-icons/go';
import { IoIosPerson } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useState } from 'react';
const Signup = () => {
	const [spiner, setSpiner] = useState(false);

	const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirm: '',
			gender: ''
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required(),
			confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match'),
			gender: Yup.string().required()
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				setSpiner(true);
				const response = await fetch("https://buildwise-three.vercel.app/api/signup", {
					method: "POST",
					cache: "no-store",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(values)
				});
				
				setSpiner(false);
				if (response.status === 201) {
					resetForm({ values: '' });
					toast.success('Successfully created.', {
						position: "top-center",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});

				} else if (response.status === 409) {
					toast.error('Email is already exist.', {
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
		}
	})

	return (
		<form className='h-full flex justify-center mt-5 w-full' onSubmit={handleSubmit} >

			<div className=' h-fit w-full flex flex-col justify-between drop-shadow-xl'>
				<h1 className='text-3xl font-bold text-center text-[#1060D2]'>Create account</h1>
				<div className='flex justify-center items-center'><GoPersonAdd className='text-6xl md:text-7xl' /></div>
				<div className='w-[60%] md:w-[50%] self-center'>
					<div className='flex items-center justify-center w-auto mb-2'>
						<label htmlFor='name' className={`w-10 text-center text-2xl text-black`}>
							<IoIosPerson className={` ${errors.name && touched.name ? 'text-red-500' : 'text-emerald-600'}`} />
						</label>

						<input id='name' type='text' name='name' placeholder='Full name.' value={values.name}
							className={`border border-black px-3 py-1 w-full
						${errors.name && touched.name ? 'border-red-500' : null}`}
							onChange={handleChange} onBlur={handleBlur} />

					</div>
					<div className='flex items-center justify-center mb-2'>
						<label htmlFor='email' className='w-10 text-center text-2xl' >
							<MdEmail className={` ${errors.email && touched.email ? 'text-red-500' : 'text-emerald-600'}`} />
						</label>
						<input id='email' type='email' name='email' placeholder="example@gmail.com" value={values.email}
							className={`border border-black px-3 py-1 w-full
						${errors.email && touched.email ? 'border-red-500' : null}`}
							onChange={handleChange} onBlur={handleBlur} />
					</div>
					<div className='flex items-center justify-center mb-2 '>
						<label htmlFor='password' className='w-10 text-center text-xl' >
							<RiLockPasswordFill className={` ${errors.password && touched.password ? 'text-red-500' : 'text-emerald-600'}`} />
						</label>

						<input id='password' type='password' name='password' placeholder="Password..." value={values.password}
							className={`border border-black px-3 py-1 w-full
						${errors.password && touched.password ? 'border-red-500' : null}`}
							onChange={handleChange} onBlur={handleBlur} />


					</div>
					<div className='flex items-center justify-center mb-2'>
						<label htmlFor='confirm' className='w-10 text-center text-xl' >
							<RiLockPasswordFill className={` ${errors.confirm && touched.confirm ? 'text-red-500' : 'text-emerald-600'}`} /></label>

						<input id='confirm' type='password' name='confirm' placeholder="Confirm password" value={values.confirm}
							className={`border border-black px-3 py-1 w-full
						${errors.confirm && touched.confirm ? 'border-red-500' : null}`}
							onChange={handleChange} onBlur={handleBlur} />


					</div>
					<div className='flex flex-col items-center justify-center mb-2'>
						<label className={`w-44 text-xl mb-2 border-black border-b-2 text-center
						${errors.gender && touched.gender ? 'text-red-600' : 'text-green-600'}`} >
							Gender</label>
						<div className='flex w-16 justify-evenly text-lg font-bold'>
							<span className={``}>M</span>
							<input type='radio' name='gender' value='male'
								onChange={handleChange} onBlur={handleBlur} />
						</div>
						<div className='flex w-16 justify-evenly text-lg font-bold'>
							<span className={``}>F</span>
							<input type='radio' name='gender' value='female'
								onChange={handleChange} onBlur={handleBlur} />
						</div>
					</div>
					<div className='flex justify-center items-center p-5'>
						<button type='submit'
							className='flex justify-around items-center border-2 px-3 py-2 w-40 
					bg-[#1060D2] text-white text-lg tracking-wider rounded-lg hover:border-[#1060D2]'>
							
							{spiner ?
								<span className="animate-spin border-t-2 rounded-full w-6 h-6 block hover:border-[#1060D2]">

								</span>

								: <span>Create</span>
							}
						</button>

					</div>
				</div>
				<div className='w-full'>
					<p className='text-center text-red-500 font-bold'>
						Note :
						<span className='text-black text-lg'> If you have an account then please
							<Link href={"/login"} className='text-blue-500 underline ' > login.</Link>
						</span>
					</p>
				</div>
			</div>
		</form>
	)
}
export default Signup;