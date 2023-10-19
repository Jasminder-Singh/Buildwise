"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import tasla from '@/public/tasla.svg';
import chisel from '@/public/chisel.svg';
import axe from '@/public/axe.svg';
import hammer1 from '@/public/hammer1.svg'
import hammer2 from '@/public/hammer2.svg'
import hammer3 from '@/public/hammer3.svg'
import hammer4 from '@/public/hammer4.svg'//big hilti machine
import crowbar from '@/public/crowbar.svg';
import chopper from '@/public/chopper.svg';
import hoe from '@/public/hoe.svg';
import hoe2 from '@/public/hoe2.svg';
import jackhammer from '@/public/jackhammer.svg';
import rake from '@/public/rake.svg';
import rammer from '@/public/rammer.svg';
import sickle from '@/public/sickle.svg';
import vibrator from '@/public/vibrator.svg';
import toolSchema from '@/formValidation/validation';
import { useFormik } from "formik";
import { MdEmail } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { GiModernCity } from 'react-icons/gi';
import { BsPhoneFill } from 'react-icons/bs';
import { HiIdentification } from 'react-icons/hi';
import { MdAddCircleOutline } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im'
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import Loading from "../loading/loading";

const ToolForm = () => {
    const [identity, setIdentity] = useState(''); // This is working as only for placeholder.
    const [flag, setFlag] = useState(false); // For disabling the submit button. If any of tool select then it will true;
    const [image, setImage] = useState('');
    const [getTools, setGetTools] = useState(""); // Tools are fetched by api with fetchTools function();
    const [loading, setLoading] = useState(false); // Show loading model.

    const router = useRouter();
    const [identities, setIdentities] = useState(
        ["Aadhar card",
            "Pan card",
            "Voter card",
            "Rashan card",
            "Passport",
            "Ayushman card",
            "Driving license",
            "Railway Identity Cards",
            "ATM card",
            "Credit card",
            "Debit card",
            "Other"]);

    const [tools, setTools] = useState([
        {
            name: 'tasla',
            punjabi: "ਤਸਲਾ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active",
        },
        {
            name: 'chisel',
            punjabi: "ਛੀਨੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'axe',
            punjabi: "ਕੁਹਾੜੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'hammer1',
            punjabi: "ਘਨ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'hammer2',
            punjabi: "ਤੇਸੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'hammer3',
            punjabi: "ਹਥੋਡਾ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'crowbar',
            punjabi: "ਸਬਲ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'hoe2',
            punjabi: "ਕਹੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'chopper',
            punjabi: "ਦਾਤ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'hoe',
            punjabi: "ਗੈਂਤੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'rake',
            punjabi: "ਪੰਜਾ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'rammer',
            punjabi: "ਦੁਰਮਟ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'sickle',
            punjabi: "ਦਾਤੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'vibrator',
            punjabi: "ਵਾਈਬ੍ਰੇਟਰ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'jackhammer',
            punjabi: "ਛੋਟੀ ਹਿਲਟੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
        {
            name: 'hammer4',
            punjabi: "ਹਿਲਟੀ",
            quantity: "",
            availQuantity: 0,
            rent: 0,
            status: "active"
        },
    ]);

    // Formik for form validation.
    const { values, errors, touched, handleChange, handleSubmit, handleReset, handleBlur } = useFormik({
        initialValues: {
            name: '',
            city: '',
            phone: '',
            email: '',
            identityCard: '',
        },
        validationSchema: toolSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await fetch('https://buildwise-three.vercel.app/api/rent', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ values, tools, image, identity })
                })
                setLoading(false);
                if (response.status === 201) {
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
                    router.push("/customers");
                } else if (response.status === 409) {
                    toast.error('Already exist.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else if (response.status === 500) {
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
                else {
                    toast.error('Rent at least one tool.', {
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
                console.log(err);
            }

        }
    })
    // Function for handling form image.
    function handleImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }

    // function for remove the selected image.
    function removeImage() {
        setImage('');
    }

    // function for changing the quantity of tools.
    function getQuantity(id, newQuantity) {
        if (newQuantity === "") {

            const repairTool = tools.map((toolObj, index) => {
                if (index === id) {
                    return { ...toolObj, quantity: "" }
                }
                return toolObj;
            });
            setTools(repairTool);
            return;
        }; // To prevent from bug because "" doest not be parsed into int.

        // Checking the available quantity of the tools.
        let moreQuantity = false;
        getTools.forEach((obj) => { // finding the quantity for tools if greater then it will true the moreQuantity variable.
            if (obj.punjabiName === tools[id].punjabi && newQuantity > obj.quantity) {
                moreQuantity = true;
            }

        });
        // If the quantity is more than available quantity then it will not run.
        if (newQuantity > 0 && !moreQuantity) {
            setFlag(true);
            const updatedTools = tools.map((obj, index) => {
                if (id === index && newQuantity >= 0) {
                    return { ...obj, quantity: parseInt(newQuantity) };
                }
                return obj;
            })
            setTools(updatedTools);
        }
    };

    // Fetching the tools from database;
    async function fetchTools() {
        try {
            const data = await fetch("https://buildwise-three.vercel.app/api/gettools", {
                method: "GET",
                cache : "no-store",
                headers : {
                    "Content-type" : "application/json"
                }
            });
            const result = await data.json();
            setGetTools(result.tools);


        } catch (err) {
            console.log(err);
        }
    }
    // Function for reseting all the selected tools and image.
    function resetTools() {
        const removeTools = tools.map((obj) => {
            return { ...obj, quantity: 0 }
        })
        setImage('');
        setTools(removeTools);

    }
    useEffect(() => {
        !getTools ? fetchTools() : null;
        if (getTools) {
            const updatedTools = tools?.map((obj) => {
                return {
                    ...obj, availQuantity: getTools?.find((obj2) => obj2.punjabiName === obj.punjabi)?.quantity,
                    rent: getTools?.find((obj2) => obj2.punjabiName === obj.punjabi)?.price
                }
            })
            setTools(updatedTools);
        }
    }, [getTools])

    return (

        <div className="border">{/* Main container START*/}
            {loading && <Loading />}
            <form className="sm:p-2 flex justify-center" onSubmit={handleSubmit} onReset={handleReset} id='toolform' name='tool' autoComplete="false">{/*Form start. */}
                <div className="border-2 rounded-md border-blue-900 w-full md:w-[80%] lg:w-[70%] sm:p-3">{/*ALL input Fields container START*/}
                    <h1 className="text-xl md:text-3xl text-center my-5 bg-blue-400 text-white p-5 rounded-md">
                        Rent the Best Tools, Unleash Your Success
                    </h1>
                    <span className="border-2 border-black border-l-2 p-2 text-lg block mb-2">
                        Personal details :
                    </span>
                    <div className="p-5">{/*Personal detail container START*/}
                        <div className="flex flex-col sm:flex-row justify-evenly">{/* Contains name and city field START*/}
                            <div className="flex mb-5 justify-center">{/*Full name Field START*/}
                                <label htmlFor="name" className="relative w-8 mx-2 flex items-start">
                                    <sup className="text-red-500 text-lg absolute top-0 left-0">*</sup>
                                    <IoIosPerson className="text-3xl text-blue-600" />
                                </label>
                                <div>{/*For error and input field */}
                                    <input type="text" name="name" id="name" placeholder="Full name." value={values.name}
                                        required={true}
                                        className="w-full border border-black rounded-sm p-1 md:p-2"
                                        onChange={handleChange} onBlur={handleBlur} autoComplete="true"/>
                                    <p className={`text-red-500 ${errors.name && touched.name ? 'block' : 'invisible'}`}>{errors.name}.</p>
                                </div>
                            </div>{/*Full name Field END*/}

                            <div className="flex mb-5 justify-center">{/*City/Village name Field START*/}
                                <label htmlFor="city" className="relative w-8 mx-2 flex items-start">
                                    <sup className="text-red-500 text-lg absolute top-0 left-0">*</sup>
                                    <GiModernCity className="text-3xl text-blue-600" />
                                </label>
                                <div>
                                    <input type="text" name="city" id="city" placeholder="City/Village name." value={values.city}
                                        required={true}
                                        className="w-full border border-black rounded-sm p-1 md:p-2"
                                        onChange={handleChange} onBlur={handleBlur} autoComplete="true"/>
                                    <p className={`text-red-500 ${errors.city && touched.city ? 'block' : 'invisible'}`}>{errors.city}.</p>
                                </div>
                            </div>{/*City/Village name Field END*/}
                        </div>{/* Contains name and city field END*/}

                        <div className="flex flex-col sm:flex-row justify-evenly">{/*Contains phone and email START*/}
                            <div className="flex mb-5 justify-center">{/*Contact Field START*/}
                                <label htmlFor="phone" className="w-8 mx-2 flex items-start">
                                    <BsPhoneFill className="text-3xl text-blue-500" />
                                </label>
                                <div>
                                    <input type="text" name="phone" id="phone" placeholder="Phone number." value={values.phone} required={true}
                                        className="w-full border border-black rounded-sm p-1 md:p-2" onChange={handleChange} autoComplete="true"/>
                                    <p className={`text-red-500 ${errors.phone && touched.phone ? 'block' : 'invisible'}`}>{errors.phone}.</p>
                                </div>
                            </div>{/*Contact Field END*/}

                            <div className="flex mb-5 justify-center">{/*Contact Field START*/}
                                <label htmlFor="email" className="w-8 mx-2 flex items-start">
                                    <MdEmail className="text-3xl text-blue-500" />
                                </label>
                                <div>
                                    <input type="email" name="email" id="email" placeholder="example@gmail.com." value={values.email}
                                        className="w-full border border-black rounded-sm p-1 md:p-2" onChange={handleChange} autoComplete="true"/>
                                    <p className={`text-red-500 ${errors.email && touched.email ? 'block' : 'invisible'}`}>{errors.email}.</p>
                                </div>
                            </div>{/*Contact Field END*/}
                        </div>{/*Contains phone and email END*/}
                        <div className="border flex flex-col sm:flex-row justify-evenly">{/*Contains card and file input field START. */}
                            <div className="flex flex-col justify-start sm:justify-center items-center">{/*Identity proof Field START*/}
                                <div className="flex justify-center">{/*Container for select tag. */}
                                    <span className="w-8 mx-2 flex items-center invisible">
                                        <MdEmail className="text-2xl text-blue-500" />
                                    </span>
                                    <select className="border-2 border-black p-2 bg-slate-100 rounded-md mb-5 w-full"

                                        onChange={(e) => setIdentity(e.target.value)} name="identity" value={identity}>
                                        <option>Select identity proof</option>
                                        {
                                            identities.map((item) => {
                                                return <option key={item} value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="self-cemter">
                                    <div className={`flex ${identity.length ? 'visible' : 'hidden'} mb-5`}>{/*Card select then it will show.*/}
                                        <label htmlFor="identity" className="w-8 mx-2 flex items-center">
                                            <HiIdentification className="text-2xl text-blue-500" />
                                        </label>
                                        <input type="text" name="identityCard" id="identity" placeholder={`${identity}.`} value={values.identityCard}
                                            className="w-full border border-black rounded-sm p-1 md:p-2" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>{/*Identity proof Field END*/}
                            <div className="flex items-center justify-center sm:w-[30%] p-2 ">{/*Upload image field START */}

                                {image
                                    ?
                                    <div className="relative">
                                        <ImCancelCircle className="absolute top-[-10px] right-[-10px] text-2xl text-red-600 "
                                            onClick={removeImage} />
                                        <Image src={image} alt='customer' width={100} height={100} />
                                    </div>
                                    : <label htmlFor="image"
                                        className=" border-dashed border-2 border-black cursor-pointer
                                    w-20 h-20 my-2 flex justify-center items-center">
                                        <MdAddCircleOutline className="text-4xl" />
                                    </label>}
                                <input type='file' id='image' accept="image/*" name="image" onChange={handleImage}
                                    className="hidden" />
                            </div>{/*Upload image field END */}
                        </div>
                    </div>{/*Personal detail container END*/}
                    {/*######################################### (RENTAL TOOLS STARTS HERE.) ################ */}
                    <div>{/*Rental tool heading START */}
                        <span className="border-2 border-black border-l-2 p-2 text-lg block mb-2">
                            Select your Tools for Rent :
                        </span>
                    </div>{/*Rental tool heading END */}

                    <div className="p-3">{/*All Rental tool container START*/}
                        <div className="flex flex-col sm:flex-row items-center justify-around mb-4">
                            <div className="flex justify-start items-center">
                                <label htmlFor="tasla" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={tasla} alt="tasla" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='tasla' id='tasla' placeholder="ਤਸਲਾ" value={tools[0]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(0, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[0]?.availQuantity ? "Available only : " : !getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[0]?.availQuantity ? tools[0]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center">
                                <label htmlFor="chisel" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={chisel} alt="chisel" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='chisel' id='chisel' placeholder="ਛੀਨੀ" value={tools[1]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(1, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[1]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[1]?.availQuantity ? tools[1]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around mb-4">
                            <div className="flex justify-start items-center mb-4">
                                <label htmlFor="axe" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={axe} alt="axe" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='axe' id='axe' placeholder="ਕੁਹਾੜੀ" value={tools[2]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(2, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[2]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[2]?.availQuantity ? tools[2]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center">
                                <label htmlFor="hammer1" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={hammer1} alt="hammer1" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hammer1' id='hammer1' placeholder="ਘਨ" value={tools[3]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(3, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[3]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[3]?.availQuantity ? tools[3]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around mb-4">
                            <div className="flex justify-start items-center mb-4">
                                <label htmlFor="hammer2" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={hammer2} alt="hammer2" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hammer2' id='hammer2' placeholder="ਤੇਸੀ" value={tools[4]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(4, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[4]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[4]?.availQuantity ? tools[4]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center">
                                <label htmlFor="hammer3" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={hammer3} alt="hammer3" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hammer3' id='hammer3' placeholder="ਹਥੋਡਾ" value={tools[5]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(5, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[5]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[5]?.availQuantity ? tools[5]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around mb-4">

                            <div className="flex justify-start items-center mb-4">
                                <label htmlFor="crowbar" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={crowbar} alt="crowbar" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='crowbar' id='crowbar' placeholder="ਸਬਲ" value={tools[6]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(6, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[6]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[6]?.availQuantity ? tools[6]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center">
                                <label htmlFor="hoe2" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={hoe2} alt="hoe2" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hoe2' id='hoe2' placeholder="ਕਹੀ" value={tools[7]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(7, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[7]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[7]?.availQuantity ? tools[7]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around mb-4">
                            <div className="flex justify-start items-center mb-4">
                                <label htmlFor="chopper" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={chopper} alt="chopper" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='chopper' id='chopper' placeholder="ਦਾਤ" value={tools[8]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(8, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[8]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[8]?.availQuantity ? tools[8]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center">
                                <label htmlFor="hoe" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={hoe} alt="hoe" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hoe' id='hoe' placeholder="ਗੈਂਤੀ" value={tools[9]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(9, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[9]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[9]?.availQuantity ? tools[9]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around mb-4">
                            <div className="flex justify-start items-center mb-4">
                                <label htmlFor="rake" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={rake} alt="rake" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='rake' id='rake' placeholder="ਪੰਜਾ" value={tools[10]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(10, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[10]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[10]?.availQuantity ? tools[10]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center">
                                <label htmlFor="rammer" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={rammer} alt="rammer" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='rammer' id='rammer' placeholder="ਦੁਰਮਟ" value={tools[11]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(11, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[11]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[11]?.availQuantity ? tools[11]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-around mb-2">
                            <div className="flex justify-start items-center mb-2">
                                <label htmlFor="sickle" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={sickle} alt="sickle" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='sickle' id='sickle' placeholder="ਦਾਤੀ" value={tools[12]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(12, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[12]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[12]?.availQuantity ? tools[12]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center invisible">{/*Not working. */}
                                <label htmlFor="dummy" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={sickle} alt="sickle" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='dummy' placeholder="dummy" id='dummy'
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]" />

                                </div>
                            </div>
                        </div>
                        <span className="border-2 border-black block p-3 text-lg text-blue-900 font-bold">
                            Machines section
                        </span>
                        <div className="flex flex-col sm:flex-row justify-around items-center mb-4 p-3">
                            <div className="flex justify-start items-center mb-4">
                                <label htmlFor="vibrator" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={vibrator} alt="vibrator" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='vibrator' id='vibrator' placeholder="vibrator" value={tools[13]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(13, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[13]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[13]?.availQuantity ? tools[13]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start md:justify-end items-center ">
                                <label htmlFor="jackhammer" className="relative w-10 md:w-14 inline-block mx-2">
                                    <Image src={jackhammer} alt="jackhammer" className="w-full " />
                                </label>
                                <div>
                                    <input type='number' name='jackhammer' id='jackhammer' placeholder="Jackhammer" value={tools[14]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(14, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[14]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[14]?.availQuantity ? tools[14]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-around items-center">
                            <div className="flex justify-start items-center">
                                <label htmlFor="hammer4" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={hammer4} alt="hammer4" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hammer4' id='hammer4' placeholder="ਹਿਲਟੀ" value={tools[15]?.quantity || ""}
                                        className="border border-black p-1 md:p-2 w-full sm:w-[70%]"
                                        onChange={(e) => getQuantity(15, e.target.value)} />
                                    <p className="text-sm font-bold p-1">
                                        {tools[15]?.availQuantity ? "Available only : " : getTools ? <span className="text-blue-500">Loading.....</span> : <span className="text-red-500">Not availbale</span>}
                                        <span className="text-green-600">
                                            {tools[15]?.availQuantity ? tools[15]?.availQuantity : null}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end items-center invisible">{/*NOT working. */}
                                <label htmlFor="hammer5" className="w-10 md:w-14 inline-block relative mx-2">
                                    <Image src={hammer4} alt="hammer5" className="w-full" />
                                </label>
                                <div>
                                    <input type='number' name='hammer5' id='hammer5' placeholder=""
                                        className="border border-black p-1 md:p-2 w-full sm:w-[50%]" />

                                </div>
                            </div>
                        </div>

                    </div>{/*All Rental tool container END */}
                    <div className="flex flex-col-reverse sm:flex-row justify-around p-2">
                        <button type='reset' className="border px-4 py-2 sm:px-6 sm:py-3 text-white bg-red-500 rounded-md mb-2"
                            onClick={resetTools} >
                            Reset</button>
                        <button type='submit' className={`${!flag ? 'cursor-not-allowed' : 'cursor-pointer'} border px-4 py-2 sm:px-6 sm:py-3 text-white bg-[#1060D2] rounded-md mb-2`}
                            disabled={!flag}>
                            Submit</button>
                    </div>
                </div>{/*ALL input Fields container END*/}
            </form > {/*form end. */}
        </div >
    )
}
export default ToolForm;