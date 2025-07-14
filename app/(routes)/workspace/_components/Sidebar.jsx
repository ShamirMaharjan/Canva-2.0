"use client"
import { WorkspaceMenu } from '@/services/Options'
import { CirclePlusIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

function Sidebar() {

    const path = usePathname();
    console.log(path)
    return (
        <div className='h-screen shadow-sm bg-purple-50 '>

            <div className='p-2 flex items-center flex-col hover:cursor-pointer mb-5 mt-3'>
                <CirclePlusIcon className='bg-purple-600 text-white rounded-full h-8 w-8' />
                <p text-purple-600>Create</p>
            </div>
            {WorkspaceMenu.map((menu, index) => {
                return (
                    <div key={index} className={`p-2 px-5  flex items-center flex-col mb-3 group hover:bg-purple-100 rounded-xl cursor-pointer 
                    ${menu.path === path && 'bg-purple-100'}`}>
                        <menu.icon className={`w-[20px] h-[20px] group-hover:text-purple-800 ${menu.path === path && 'bg-purple-100'}`} />
                        <p className={`group-hover:text-purple-800 ${menu.path === path && 'bg-purple-100'}`}>{menu.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar