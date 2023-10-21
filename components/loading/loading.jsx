const Loading = ()=>{
    return (
        <div className="w-full h-screen backdrop-blur-sm flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 z-10">
            <div className="w-full md:w-[40%] h-[40%] flex flex-col justify-evenly items-center">
                <p className="text-md md:text-xl font-bold">Please wait....</p>
                <span className=" w-9 h-9  md:w-14 md:h-14 border-t-4 border-t-blue-500 inline-block animate-spin rounded-full"></span>
            </div>
        </div>
    )
}
export default Loading;