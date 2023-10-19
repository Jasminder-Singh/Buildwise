import poster from '@/public/banner.png';
import Image from 'next/image';
const Banner = ()=>{
	return(
		<div className='flex justify-center p-2'>
			<div className=' w-full'>
				<Image src={poster} alt='Poster' className='w-full rounded-2xl'/>
			</div>
		</div>   
		)
}
export default Banner;