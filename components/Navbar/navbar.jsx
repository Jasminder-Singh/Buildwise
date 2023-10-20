"use client"
import Image from 'next/image';
import logo from '@/public/Construct.jpeg';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import Link from 'next/link';
import { MdAddCircle } from 'react-icons/md';
import { signIn, signOut, useSession } from 'next-auth/react';
import './navbar.css';

const Navbar = () => {
    const [flag, setFlag] = useState(false);
    const session = useSession();

    return (
        <header>
            <nav className=' '>
                <div className='relative flex justify-between items-center py-2 px-3 border border-black '>
                    <div className='logo-container'>
                        <div className='flip-inner w-32 h-9 sm:w-52 sm:h-14 md:w-64 md:h-20'>
                            <div className='w-full flex justify-center front'> {/*Div is for logo*/}
                                <Image src={logo} alt='construct Ease' className='rounded-lg w-full' />
                            </div>
                        </div>
                    </div>

                    <div className='w-[60%] md:border-2 border-dashed border-[#1060D2] py-2 rounded-lg flex justify-end'>
                        <ul className={`absolute top-[102%] w-full md:relative bg-white text-center z-10
                        ${!flag ? 'hidden' : null} md:flex justify-evenly items-center text-xl font-serif`}>

                            {
                                session.status === "unauthenticated" || session.status === "loading" ?
                                    <li className='tracking-wider cursor-pointer hover:bg-[#1060D2] hover:text-white p-2 md:rounded-lg border-b border-b-black md:border md:border-white'>
                                        <Link href={"/"} >Home</Link></li>
                                    : <li className='tracking-wider cursor-pointer hover:bg-[#1060D2] hover:text-white p-2 md:rounded-lg border-b border-b-black md:border md:border-white'>
                                        <Link href={"/customers"} >Customers</Link></li>
                            }
                            {
                                session.status === "authenticated"
                                    ? <li className='relative tracking-wider cursor-pointer hover:bg-[#1060D2] hover:text-white px-3 py-1 md:rounded-lg border-b border-b-black md:border md:border-white'>
                                        <Link href={"/renting"} > Add < span className='absolute top-0 right-[-6px] text-red-500'><MdAddCircle /></span></Link></li>
                                    : null
                            }
                            {
                                session.status === "unauthenticated" || session.status === "loading"
                                    ?
                                    <li className='tracking-wider cursor-pointer hover:bg-[#1060D2] hover:text-white p-2 rounded-lg border border-white'
                                        onClick={() => signIn()}>
                                        Login/SingUp</li>
                                    : <li className='tracking-wider cursor-pointer hover:bg-[#1060D2] hover:text-white p-2 rounded-lg border border-white'
                                        onClick={() => signOut("credentials")}>
                                        Logout</li>
                            }
                        </ul>
                        <span className='block md:hidden w-8 text-3xl p-2' onClick={() => setFlag(prev => !prev)}><AiOutlineMenu /></span>

                    </div>

                </div>
            </nav>
        </header>

    )
}
export default Navbar;