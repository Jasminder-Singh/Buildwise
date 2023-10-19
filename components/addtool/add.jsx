"use client";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
const Add = () => {
    const [spiner, setSpiner] = useState(false);
    const [name, setName] = useState(
        [
            {
                name: 'tasla',
                punjabiName: "ਤਸਲਾ"
            },
            {
                name: 'chisel',
                punjabiName: "ਛੀਨੀ"
            },
            {
                name: 'axe',
                punjabiName: "ਕੁਹਾੜੀ"
            },
            {
                name: 'hammer1',
                punjabiName: "ਘਨ"
            },
            {
                name: 'hammer2',
                punjabiName: "ਤੇਸੀ"
            },
            {
                name: 'hammer3',
                punjabiName: "ਹਥੋਡਾ"
            },
            {
                name: 'crowbar',
                punjabiName: "ਸਬਲ"
            },
            {
                name: 'hoe2',
                punjabiName: "ਕਹੀ"
            },
            {
                name: 'chopper',
                punjabiName: "ਦਾਤ"
            },
            {
                name: 'hoe',
                punjabiName: "ਗੈਂਤੀ"
            },
            {
                name: 'rake',
                punjabiName: "ਪੰਜਾ"
            },
            {
                name: 'rammer',
                punjabiName: "ਦੁਰਮਟ"
            },
            {
                name: 'sickle',
                punjabiName: "ਦਾਤੀ"
            },
            {
                name: 'vibrator',
                punjabiName: "ਵਾਈਬ੍ਰੇਟਰ"
            },
            {
                name: 'jackhammer',
                punjabiName: "ਛੋਟੀ ਹਿਲਟੀ"
            },
            {
                name: 'hammer4',
                punjabiName: "ਹਿਲਟੀ"
            }
        ]);
    const [tool, setTool] = useState({
        name: "",
        punjabiName: "",
        quantity: "",
        price: ""
    });

    
    const submitToolData = async (e) => {
        setSpiner(true);

        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/addtool", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(tool)
            })
            setSpiner(false);
            if (response.status === 201) {
                toast.success('Added Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTool({name : "",punjabiName : "", quantity : "",price : ""});
             
            }
            else if (response.status === 409) {
                toast.warn('Already available !', {
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
            toast.error('Network or Server Error', {
                position: "top-center",
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

    useEffect(() => {
        const filteredObj = name.filter((obj) => {
            return obj.punjabiName === tool.punjabiName;
        })
        setTool({ ...tool, name: filteredObj[0]?.name });
    }, [tool.punjabiName]);
    return (
        <div className="border-2  h-[500px] flex justify-center items-center">
            <form className="border-2 h-full w-[50%] p-5 flex flex-col justify-around" onSubmit={submitToolData}>
                <div>
                    <h1 className="text-3xl font-bold text-blue-500 text-center">Add New Tool</h1>
                </div>
                <div className="flex ">
                    <select value={tool.punjabiName} onChange={(e) => setTool({ ...tool, punjabiName: e.target.value })}
                        className="bg-slate-100 border border-black rounded-lg px-4 py-2 w-[50%] text-center text-lg">
                        <option>Select tool</option>
                        {
                            name.map((toolObj) => {
                                return <option key={toolObj.name} value={toolObj.punjabiName} >
                                    {toolObj.punjabiName}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quantity" className="font-bold text-md">Quantity : </label>
                    <input type="number" placeholder="Quantity" id='quantity' value={tool.quantity}
                        className="border border-black px-4 py-2 rounded-lg"
                        onChange={(e) => setTool({ ...tool, quantity: e.target.value })} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-bold text-md">Price (₹) : </label>
                    <input type="number" placeholder="Price ₹" id='price' value={tool.price}
                        className="border border-black px-4 py-2 rounded-lg"
                        onChange={(e) => setTool({ ...tool, price: e.target.value })} />
                </div>
                <div className="flex justify-center items-center">
                    <button type="submit" className="border bg-emerald-500 px-6 py-2 text-center text-md text-white w-[25%] flex justify-center items-center">
                        {
                            spiner
                                ? <span className="animate-spin border-t-4 rounded-full w-8 h-8 block hover:border-[#1060D2]"></span>
                                : <span>Add</span>
                        }
                    </button>

                </div>

            </form>
        </div>
    )
}
export default Add;