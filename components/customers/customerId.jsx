"use client";
import { useState, useEffect } from "react";
import face from "@/public/face.png"
import Image from "next/image";
import Loading from "../loading/loading";
import { IoIosPerson } from 'react-icons/io';
import { BsPhoneFill } from 'react-icons/bs';
import { GiModernCity } from 'react-icons/gi';
import Link from "next/link";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Model from "../customerIdEditModel/model";
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlineDownloadDone } from 'react-icons/md';


const CustomerId = ({ id }) => {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [currDate, setCurrDate] = useState("");
    const [flag, setFlag] = useState(false); // Checkboxes will appear.
    const [model, setModel] = useState(false); // Show Model. 
    const [showDate, setShowDate] = useState(false); // Displays the date of the each tool if cancel or complelted.
    const [updateTools, setUpdateTools] = useState(false); // It is used inside useEffect when changing happen then it tells useEffect to call a funciton.


    // Select checkbox then it will call. Used fo marking the which tool checked or not.
    const selectCheckbox = (name, action, e) => {
        if (action === "cancel") setFlag(false); // it hides the all checkboxes.

        if (e && e.target.checked) setModel(true); // if user checked then it show model, else no.

        const addCheckedUser = user.rentedTools.map((tool) => {
            if (tool.checked && action === "cancel") { // if user select cancel it set the checked value to false; 
                return { ...tool, checked: false };
            }
            else if (tool.punjabi === name) { // when user selects the chekbox it set true the particular checkbox.
                return { ...tool, checked: e.target.checked };
            }
            return tool
        });

        setUser({ ...user, rentedTools: addCheckedUser });
    }
    // It will call inside model. It update the tool status.
    const updateToolStatus = async (answer) => {
        //status = "cancel" || "return";

        if (answer === "cancel" && user.rentDays == 1) {
            let cancleTool;
            const updateUserRentToolsStatus = user.rentedTools.map((tool) => {
                if (tool.checked && tool.status !== "return") {
                    cancleTool = tool;
                    let newDate = new Date();
                    return { ...tool, status: "cancel", date: newDate.toLocaleDateString() };// update status active to cancel and add date.
                }
                return tool;
            })
            setUser({ ...user, rentedTools: updateUserRentToolsStatus, amount: user.amount - (cancleTool.rent * cancleTool.quantity) });
            setUpdateTools(true);
        }
        else if (answer === "return") {

            const updateUserRentToolsStatus = user.rentedTools.map((tool) => {
                if (tool.checked && tool.status !== "cancel") {
                    let newDate = new Date();
                    return { ...tool, status: "return", date: newDate.toLocaleDateString() }; // update status active to return and add date.
                }
                return tool;
            })
            setUser({ ...user, rentedTools: updateUserRentToolsStatus });
            setUpdateTools(true);
        } else {
            alert("This will not cancel, because you rented this tool for ", user.rentDays, " days.")
        }
        setModel(false);

    }
    const fetchCustomerById = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://buildwise-three.vercel.app/api/getcustomers/${id}`, {
                method: "GET"
            });
            setLoading(false);
            const result = await response.json();
            console.log(result);
            setUser(result.user);

        } catch (err) {
            console.log(err);
            toast.error('Server error.', {
                position: "top-right",
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

    // It will call when any changes happnes in user array. Such as "canceling" and "completing" etc.
    const submitResponse = async (userStatus) => {
        try {
            setLoading(true);
            const response = await fetch(`https://buildwise-three.vercel.app/api/getcustomers`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ user: user, userStatus })
            });
            setLoading(false);

            if (response.status === 200) {
                //  Update status of all the tools after cancel of completed the user status.
                const value = userStatus === "cancel" ? 'cancel' : "return";
                const temp = user.rentedTools.map((tool) => {
                    if (!tool.date || tool.status === "active") {
                        const newDate = new Date();
                        return { ...tool, status: value, date: newDate.toLocaleDateString() };
                    } 
                    return { ...tool, status: value };
                });

                setUser({ ...user, rentedTools: temp, status: userStatus });
                toast.success('success', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (response.status === 511) {
                toast.error('This might be of internet or server error.', {
                    position: "top-right",
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
            console.log(err);
            toast.error('Server error.', {
                position: "top-right",
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

    // Function for updating each tools status and quantity.
    const CancelOrReturn = async () => {
        try {
            setUpdateTools(false);
            
            const response = await fetch(`https://buildwise-three.vercel.app/api/getcustomers/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ tools: user.rentedTools, newAmount: user.amount })
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        !user ? fetchCustomerById() : null;
        setCurrDate(new Date((user?.date)).toLocaleString());
    }, [user]);

    useEffect(() => {

        if (updateTools) {
            CancelOrReturn();
        }
        
    }, [updateTools]);

    return (
        <>
            <div className=" flex justify-center items-center h-full p-2">{/* Main container */}
                {loading && <Loading />}
                {model && <Model action={setModel} updateToolStatus={updateToolStatus} />}
                {
                    user ?
                        <div className="border border-blue-500 rounded-xl h-full w-full md:w-[70%] py-5 px-3">
                            <Link href={"/customers"} className=" underline text-blue-500 my-1 inline-block border p-1" ><span> Go back</span></Link>
                            <div className="border border-black flex flex-row-reverse sm:flex-row justify-between items-center px-2 py-5">
                                <div className="flex flex-col justify-between px-4 py-2 w-[50%] sm:w-[30%] h-full mb-3">
                                    <Image src={user?.image || face} alt='face' width={100} height={100} className="border border-black rounded-lg mb-2 self-center" />
                                    <p className={`flex justify-center items-center capitalize 
                                    ${user?.status == "cancel" ? "bg-red-200" : user?.status === "active" ? "bg-green-200" : "bg-blue-200"} rounded-md`}> {user?.status}
                                        <span className={`mx-2 inline-block w-2 h-2 
                                         ${user?.status == "cancel" ? "bg-red-500" : user?.status === "active" ? "bg-emerald-500" : "bg-blue-500"} rounded-full`}> </span>
                                    </p>
                                </div>
                                <div className="w-full sm:w-[60%] p-4 flex flex-col justify-between h-full ">
                                    <p className=" tracking-wider capitalize mb-2 sm:self-end text-sm">
                                        <span className=" font-bold ">
                                            Date : {currDate}</span>
                                    </p>
                                    <p className=" tracking-wider capitalize mb-2  sm:text-xl"><span className=" font-bold ">
                                        <IoIosPerson className="inline-block text-blue-500 text-2xl" /> : </span>{user?.name}
                                    </p>
                                    <p className="font-serif capitalize mb-2 sm:text-xl"><span className="font-bold ">
                                        <GiModernCity className="inline-block text-blue-500 text-2xl " /> : </span>{user?.city}
                                    </p>
                                    <p className="font-serif mb-2 sm:text-xl"><span className="font-bold">
                                        <BsPhoneFill className="inline-block text-blue-500 text-2xl" /> : </span>{user?.phone}
                                    </p>
                                    {
                                        user?.cardtype
                                            ? <p className=" tracking-wider text-lg">
                                                <span className="">{user?.cardtype} :
                                                </span>{user?.identityCard}
                                            </p>
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="py-2 w-full">
                                <div className="flex justify-center border-t-2 border-black p-3">
                                    <p className="font-bold text-center w-full py-2 "> Rented tools : - </p>
                                    {
                                        flag
                                            ? <button className="bg-red-500 text-white px-4 py-2 self-end tracking-wider w-[30%] md:w-[20%]"
                                                onClick={() => selectCheckbox("", "cancel", "")}>Cancel</button>
                                            : <button className=" bg-purple-500 text-white px-4 py-2 self-end tracking-wider w-[30%] md:w-[20%]"
                                                onClick={() => setFlag(true)}>Edit</button>
                                    }
                                </div>
                                <div className="border-2 w-full overflow-x-auto">
                                    <table className="w-full text-center border-2">
                                        <thead>
                                            <tr className={`border-2 border-black text-blue-600`}>
                                                {
                                                    flag
                                                        ? <th className="p-1 md:p-2">Select</th>
                                                        : null
                                                }
                                                <th className="p-1 md:p-2">S.No.</th>
                                                <th className="p-1 md:p-2">Status</th>
                                                <th className="p-1 md:p-2">Name</th>
                                                <th className="p-1 md:p-2">Quant.</th>
                                                <th className="p-1 md:p-2">₹/tool</th>
                                                <th className="p-1 md:p-2">Days</th>
                                                <th className="p-1 md:p-2">Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                user?.rentedTools?.map((tool, index) => {

                                                    return <tr key={tool.name}
                                                        className={`border-b-2 ${user?.status === "cancel" || tool.status === "cancel" ? null : null}`}>
                                                        {
                                                            flag && tool.status === "active"
                                                                ? <td className="p-3 sm:text-lg font-sans">
                                                                    <input type="checkbox" onChange={(e) => selectCheckbox(tool.punjabi, "", e)}
                                                                        checked={tool?.checked ? true : false} className="cursor-pointer" />
                                                                </td>
                                                                : flag && tool.status === "cancel"
                                                                    ? <td className="flex justify-center items-center p-4">
                                                                        <ImCancelCircle className="text-red-500 text-lg" />
                                                                    </td>
                                                                    : flag && tool.status === "return"
                                                                        ? <td className="flex justify-center items-center p-4">
                                                                            <MdOutlineDownloadDone className="text-green-500 text-xl" />
                                                                        </td> : null
                                                        }

                                                        <td className="p-3 sm:text-lg font-sans">{index + 1}</td>
                                                        <td className={`sm:text-lg font-sans capitalize
                                                 ${tool.status == "active" ? 'text-green-500 bg-green-100' : tool.status === "cancel" ? 'text-red-500' : null}`}
                                                            onMouseEnter={() => setShowDate(true)} onMouseLeave={() => setShowDate(false)}>
                                                            {showDate ? tool?.date : tool.status}
                                                        </td>
                                                        <td className="p-3 sm:text-lg font-sans">{tool.punjabi}</td>
                                                        <td className="p-3 sm:text-lg font-sans">{tool.quantity}</td>
                                                        <td className="p-3 sm:text-lg font-sans">{tool.rent}₹</td>
                                                        <td className="p-3 sm:text-lg font-sans">{tool.status === "cancel" || tool.status === "return" ? "--" : user?.rentDays}</td>
                                                        <td className="p-3 sm:text-lg font-sans">{tool.rent * tool.quantity * user?.rentDays}₹</td>
                                                    </tr>

                                                })

                                            }
                                            <tr>
                                                <td colSpan={flag ? 7 : 6} className={`font-bold text-center p-3 border-2 text-md md:text-lg
                                         ${user?.status === "cancel" ? ' line-through' : null}`} >Total amount </td>
                                                <td className={`font-bold  ${user?.status === "cancel" ? ' line-through' : null}`} >
                                                    {user?.amount} ₹
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <p className="p-4">
                                        <span className="font-bold text-red-500">Note</span> :
                                        To choose a particular tool, simply click on the <span className="font-bold mx-1">"Edit"</span>
                                        button, which will stop the rent and prevent any additional charges.
                                    </p>
                                </div>
                                <div className="p-4 flex justify-between items-center">

                                    <button className={`bg-yellow-500 text-white px-5 py-2 
                                    ${flag ? 'cursor-not-allowed' : null} ${user?.status === "completed" ? 'invisible' : null}`}
                                        disabled={user?.status === "completed" || user?.status === "cancel" || flag}
                                        onClick={() => submitResponse("cancel")}>
                                        {user?.status == "cancel" ? "Canceled" : "Cancel"}
                                    </button>

                                    <button className={` px-5 py-2 
                                    ${user?.status === "cancel" ? 'invisible' : null}
                                    ${user?.status === "completed" ? "bg-none border-2 rounded-lg text-green-500 " : "bg-green-500"}
                                    ${flag ? 'cursor-not-allowed' : null}`}
                                        disabled={user?.status == "cancel" || user?.status === "completed" || flag}
                                        onClick={() => submitResponse("completed")}>
                                        {user?.status == "completed" ? "Completed" : "Complete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div >
        </>
    )
}

export default CustomerId;