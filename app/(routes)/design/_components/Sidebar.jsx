"use client"
import { sideBarMenu } from '@/services/Options'
import React, { useState } from 'react'
import SidebarSettings from './SidebarSettings'

const Sidebar = () => {
    const [selectedOption, setSelectedOption] = useState();
    return (
        <div className='flex'>
            <div className='p-2 w-[120px] border-r h-screen pt-2'>
                {sideBarMenu.map((menu, index) => (
                    <div key={index} className={`p-2 mb-3 flex flex-col items-center hover:bg-secondary cursor-pointer 
                        ${menu.name == selectedOption?.name && "bg-secondary"}`}
                        onClick={() => setSelectedOption(menu)}
                    >
                        <menu.icon />
                        <h2 className='mt-2'>{menu.name}</h2>
                    </div>
                ))}
            </div>
            <SidebarSettings selectedOption={selectedOption} />
        </div>
    )
}

export default Sidebar