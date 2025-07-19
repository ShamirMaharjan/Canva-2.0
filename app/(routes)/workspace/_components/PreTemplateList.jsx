"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const PreTemplateList = () => {


    const templateList = useQuery(api.templates.GetAllTemplates);

    const createnewDesignFromTemplate = useMutation(api.designs.CreateDesignFromTemplate)
    const { userDetail } = useContext(UserDetailContext);

    const router = useRouter();

    const onTemplateSelect = async (template) => {
        const id = await createnewDesignFromTemplate({
            imagePreview: template?.imagePreview,
            jsonTemplete: template?.jsonData,
            name: template?.name,
            uid: userDetail?._id,
            width: template?.width,
            height: template?.height
        })
        router.push(`/design/${id}`)

    }

    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
                {templateList && templateList.length > 0 && templateList.map((design, index) => (
                    <div key={index} className='bg-secondary rounded-md'>
                        {design?.imagePreview && (
                            <Image src={design.imagePreview} alt={design?.name} width={500} height={500}
                                className='w-full h-[150px] object-contain rounded-md cursor-pointer '
                                onClick={() => onTemplateSelect(design)}
                            />
                        )}
                        {/* <div className='flex gap-2'>
                                <h2>{design?.name}</h2>
                                <h2>{design?.createdAt}</h2>
                            </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PreTemplateList