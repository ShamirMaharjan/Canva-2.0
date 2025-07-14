import { canvasSizeOptions } from '@/services/Options'
import Image from 'next/image'
import React from 'react'

const IntroOptions = () => {
    return (
        <div>
            <div className='relative'>
                <Image src={"/banner-home.png"} alt="banner" width={100} height={100}
                    className='w-full h-[200px] rounded-2xl object-cover' />
                <h2 className='text-3xl absolute bottom-5 text-white left-10'>WorldSpace</h2>
            </div>
            <div className='flex gap-6 justify-center items-center mt-8'>
                {canvasSizeOptions.map((option, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center'>
                            <Image src={option.icon} alt={option.name} width={60} height={60}
                                className='hover:scale-105 transation-all cursor-pointer' />
                            <p className='text-sm pt-2 font-medium'>{option.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default IntroOptions