"use client"
import { WorkspaceMenu } from '@/services/Options'
import { CirclePlusIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import CustomCanvaDialog from './CustomCanvaDialog'

function Sidebar() {

    const path = usePathname();
    const router = useRouter();
    console.log(path)
    return (
        <div className='h-screen shadow-sm bg-purple-50 '>
            <CustomCanvaDialog>
                <div className='p-2 flex items-center flex-col hover:cursor-pointer mb-5 mt-3'>
                    <CirclePlusIcon className='bg-purple-600 text-white rounded-full h-8 w-8' />
                    <p className="text-purple-600">Create</p>
                </div>
            </CustomCanvaDialog>

            {WorkspaceMenu.map((menu, index) => {
                return (
                    <div key={index} className={`p-2 px-5  flex items-center flex-col mb-3 group hover:bg-purple-100 rounded-xl cursor-pointer 
                    ${menu.path === path && 'bg-purple-100'}`} onClick={() => router.push(menu.path)}>
                        <menu.icon className={`w-[20px] h-[20px] group-hover:text-purple-800 ${menu.path === path && 'bg-purple-100'}`} />
                        <p className={`group-hover:text-purple-800 ${menu.path === path && 'bg-purple-100'}`}>{menu.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar