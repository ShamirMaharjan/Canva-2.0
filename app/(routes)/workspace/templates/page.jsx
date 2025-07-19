import Image from 'next/image'
import React from 'react'
import PreTemplateList from '../_components/PreTemplateList'

const Templates = () => {
    return (
        <div className='p-10 w-full'>
            <div className='relative'>
                <Image src={"/banner-home.png"} alt="banner" width={100} height={100}
                    className='w-full h-[200px] rounded-2xl object-cover' />
                <h2 className='text-3xl absolute bottom-5 text-white left-10'>Templates</h2>
            </div>
            <PreTemplateList />
        </div>
    )
}

export default Templates