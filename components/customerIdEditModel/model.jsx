"use client";
import { RxCross1 } from 'react-icons/rx';
const Model = ({ action, updateToolStatus }) => {
    return (
        <div className="absolute left-0 right-0 w-full h-full flex justify-center items-center backdrop-blur-sm ">{/* Main container */}
            <div className="flex flex-col justify-between items-center border-2 rounded-lg border-blue-500 w-full sm:w-[80%] md:w-[60%] bg-white p-5">
                <div className='flex justify-end w-full p-3'>
                    <RxCross1 className='text-2xl cursor-pointer text-red-500' onClick={()=>action(false)}/> {/* action hides model */}
                </div>
                <div>
                    <p className="font-bold text-xl text-center p-2 "> What you want to do ?</p>
                    <div>
                        <ol className=" p-8 border border-black">
                            <li className='my-3'><span className="font-bold text-red-500">Cancel</span> : Cancellation will exclude the tool's rent and remove from list.</li>
                            <li className='my-3'><span className="font-bold text-green-500">Return</span> : Returning now includes the current rent but excludes rent charges from tomorrow.</li>
                        </ol>
                    </div>
                </div>
                <div className="w-full flex justify-evenly items-center p-5">
                    <button className="hover:bg-red-500 hover:text-white border-2 border-red-500 rounded-lg px-4 py-2" onClick={() => updateToolStatus("cancel")}>
                        Yes, Cancel
                    </button>
                    <span className="font-bold">OR</span>
                    <button className="hover:bg-green-500 hover:text-white border-2 border-green-500 rounded-lg px-4 py-2" onClick={() => updateToolStatus("return")}>
                        Yes, Return
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Model;