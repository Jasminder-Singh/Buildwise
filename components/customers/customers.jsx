"use client";
import face from '@/public/face.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../loading/loading';
import { BsPhoneFill } from 'react-icons/bs';
import { GiModernCity } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';



const Coustmers = () => {

    const [users, setUsers] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchCustomer, setSearch] = useState(""); // It takes the value of the input type search.
    const [searchedUsers, setSearchedUsers] = useState(""); // Array of searched users.

    
    // Fetching the customers.
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const customers = await fetch('http://localhost:3000/api/getcustomers', {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            setLoading(false);
            const result = await customers.json();
            // result.data ;
            if (result.data) {
                const updateCustomers = result.data.map((customer) => {
                    const newDate = new Date(customer.date).toLocaleString();
                    return { ...customer, currDate: newDate };
                });
                setUsers(updateCustomers);
            }

        } catch (err) {
            console.log(err);
        }
    }

    // Find the users by their status.
    const findByStatus = (status)=>{
        if(status === "all") {
            setSearchedUsers("");
            return ;
        }
        const findUsers = users.filter((customer)=>{
            if(customer.status === status){
                return customer;
            }
        });

        setSearchedUsers(findUsers);

    }
    useEffect(() => {
        !users ? fetchCustomers() : null;
    }, [])

    // Search customer.
    useEffect(() => {
        const id = setTimeout(() => {
            if (!searchCustomer) setSearchedUsers("");
            if (users && searchCustomer) {
                const findUser = users.filter((obj) => {

                    if ( obj.name.match(new RegExp(searchCustomer, "gi")) ||
                         obj.city.match(new RegExp(searchCustomer, "gi")) ||
                        obj.phone.match(new RegExp(searchCustomer, "gi")) ) {

                        return obj;

                    }

                });

                setSearchedUsers(findUser);
            }
        }, 300)
        return () => {
            if (id) clearTimeout(id);
        }
    }, [searchCustomer])
    
    return (

        <div>
            {loading && <Loading />}
            <div>
                <div className='flex flex-col md:flex-row justify-evenly items-center border-2 border-black p-4'>
                    <h1 className='text-2xl font-bold text-center p-3 tracking-wider' >Customers</h1>
                    <div className='flex justify-between md:justify-evenly w-full'>
                        <div className='flex justify-between items-centerrounded-lg bg-gray-300 rounded-lg'>
                            <input type="search" placeholder='Search... '
                                className='border border-black px-1 md:px-3 py-1 rounded-lg w-full'
                                onChange={(e) => setSearch(e.target.value)} />
                            <BsSearch className='text-2xl self-center mx-3 cursor-pointer' />
                        </div>
                        <div>
                            <select onChange={(e)=>findByStatus(e.target.value)} className='border border-black p-1 text-md rounded-lg text-center w-full'>
                                <option>Select By</option>
                                <option value={"all"} className='font-bold'>
                                    All
                                </option>
                                <option value={"active"} className='text-green-500'>
                                    Active
                                </option>
                                <option value={"completed"} className='text-blue-500'>
                                    Completed
                                </option>
                                <option value={"cancel"} className='text-red-500'>
                                    Canceled
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center p-5`}>

                {
                    (users && !searchedUsers) ?
                        users.map((customer, index) => {
                            return <div key={index} className='border border-black rounded-xl flex justify-around h-52 p-2 '>
                                <div className='flex flex-col justify-around'>
                                    <Image src={customer?.image || face} alt='faceImage' width={100} height={100}
                                        className='border border-black sm:w-20 sm:h-20 md:w-24 md:h-24' />
                                    <p className={`flex justify-center items-center px-2 py-1 rounded-lg capitalize
                                    ${customer.status == "cancel" ? "bg-red-200" : customer.status == "active" ? "bg-emerald-200" : "bg-blue-200"}`}>
                                        {customer.status}
                                        <span className={`mx-2 inline-block w-2 h-2 rounded-full
                                        ${customer.status == "cancel" ? "bg-red-500" : customer.status == "active" ? "bg-emerald-500" : "bg-blue-500"}`}> </span>
                                    </p>
                                </div>
                                <div className='flex flex-col justify-evenly items-start w-[50%]'>
                                    {customer?.currDate ?
                                        <p className='self-end text-right text-sm font-extrabold'>
                                            {customer?.currDate}
                                        </p>
                                        : null
                                    }
                                    <p className='font-bold text-xl text-left capitalize'>{customer.name}</p>
                                    <p className='text-md text-left capitalize w-full'>
                                        < GiModernCity className='inline-block text-blue-500 text-lg' /> : {customer.city}
                                    </p>
                                    <p className='text-md text-left'>
                                        < BsPhoneFill className='inline-block text-blue-500 text-lg' /> : {customer.phone}
                                    </p>
                                    <div className='flex justify-end w-full'>
                                        <Link href={`/customers/${customer._id}`} className='bg-blue-500 text-white px-4 py-2'>Show</Link>
                                    </div>
                                </div>

                            </div>
                        })
                        :
                        searchedUsers?.length ?

                            searchedUsers.map((customer, index) => {
                                return <div key={index} className='border border-black rounded-xl flex justify-around h-52 p-2 '>
                                    <div className='flex flex-col justify-around'>
                                        <Image src={customer?.image || face} alt='faceImage' width={100} height={100}
                                            className='border border-black sm:w-20 sm:h-20 md:w-24 md:h-24' />
                                        <p className={`flex justify-center items-center px-2 py-1 rounded-lg capitalize
                                ${customer.status == "cancel" ? "bg-red-200" : customer.status == "active" ? "bg-emerald-200" : "bg-blue-200"}`}>
                                            {customer.status}
                                            <span className={`mx-2 inline-block w-2 h-2 rounded-full
                                    ${customer.status == "cancel" ? "bg-red-500" : customer.status == "active" ? "bg-emerald-500" : "bg-blue-500"}`}> </span>
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-evenly items-start w-[50%]'>
                                        {customer?.currDate ?
                                            <p className='self-end text-right text-sm font-extrabold'>
                                                {customer?.currDate}
                                            </p>
                                            : null
                                        }
                                        <p className='font-bold text-xl text-left capitalize'>{customer.name}</p>
                                        <p className='text-md text-left capitalize w-full'>
                                            < GiModernCity className='inline-block text-blue-500 text-lg' /> : {customer.city}
                                        </p>
                                        <p className='text-md text-left'>
                                            < BsPhoneFill className='inline-block text-blue-500 text-lg' /> : {customer.phone}
                                        </p>
                                        <div className='flex justify-end w-full'>
                                            <Link href={`/customers/${customer._id}`} className='bg-blue-500 text-white px-4 py-2'>Show</Link>
                                        </div>
                                    </div>

                                </div>
                            })
                            :
                            null
                }

            </div>
            <div>
                {

                    (searchedUsers?.length == 0 && searchCustomer)
                        ? <div className='flex flex-col justify-evenly items-center h-52 w-full'>
                            <p className='text-4xl font bold text-slate-300'>Not Found any Customer.</p>
                        </div>
                        : null
                }
            </div>
            {
                users?.length ? null : <div className='flex flex-col justify-evenly items-center h-52 place-self-auto'>
                    <p className='text-4xl font bold text-slate-300'>Not Found any Customer Refresh the page.</p>
                    <button onClick={fetchCustomers} className='cursor-pointer border bg-blue-500 px-5 py-2 text-white text-lg'>
                        Refresh
                    </button>
                </div>
            }

        </div>
    )
}

export default Coustmers;