"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CustomCanvaDialog from './CustomCanvaDialog'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'

const RecentDesign = () => {

    const [designList, setDesignList] = useState([]);
    const convex = useConvex();
    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter();


    useEffect(() => {
        userDetail && GetRecentDesigns();
    }, [userDetail])

    const GetRecentDesigns = async () => {
        const result = await convex.query(api.designs.GetUserDesigns, {
            uid: userDetail?._id
        })
        console.log("result", result);
        setDesignList(result);
    }
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-2xl'>Recent Designs</h2>

            {designList?.length == 0 ?
                <div className='flex flex-col gap-4 items-center mt-5'>
                    <Image src={"/edittool.png"} alt="edit" width={100} height={100} />
                    <h2 className='text-center'> You dont have any design created</h2>
                    <CustomCanvaDialog>
                        <Button>+Create New</Button>
                    </CustomCanvaDialog>

                </div> :
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
                    {designList.map((design, index) => (
                        <div key={index} className='bg-secondary rounded-md'>
                            {design?.imagePreview && (
                                <Image src={design.imagePreview} alt={design?.name} width={500} height={500}
                                    className='w-full h-[150px] object-contain rounded-md cursor-pointer '
                                    onClick={() => router.push("/design/" + design?._id)}
                                />
                            )}
                            {/* <div className='flex gap-2'>
                                <h2>{design?.name}</h2>
                                <h2>{design?.createdAt}</h2>
                            </div> */}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default RecentDesign