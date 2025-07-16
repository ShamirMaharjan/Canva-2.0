import { Input } from '@/components/ui/input'
import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

const DesignHeader = ({ DesignInfo }) => {
    return (
        <div className='p-3 flex justify-between bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600'>
            <Image src={"/logo-white.png"} alt="logo" width={100} height={50} />
            <input placeholder="design Name" className='border-none outline-none text-white'
                value={DesignInfo?.name || ''} readOnly />
            <UserButton />
        </div>
    )
}

export default DesignHeader