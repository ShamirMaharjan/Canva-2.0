"use client"
import { canvasSizeOptions } from '@/services/Options'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';

const IntroOptions = () => {

    const createDesignRecord = useMutation(api.designs.CreateNewDesign);
    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const OnCanvasOptionSelect = async (option) => {
        toast("Loading...")
        const result = await createDesignRecord({
            name: option.name,
            width: option.width,
            height: option.height,
            uid: userDetail?._id
        });

        console.log(result);

        router.push("/design/" + result);
    }

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
                        <div key={index} className='flex flex-col items-center' onClick={() => OnCanvasOptionSelect(option)}>
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