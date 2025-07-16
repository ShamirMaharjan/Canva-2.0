import React from 'react'

const SidebarSettings = ({ selectedOption }) => {
    return (
        <div className='w-[280px] p-5 h-screen border-r'>
            {selectedOption?.name}
            <h2 className='text-sm text-gray-500'>{selectedOption?.desc}</h2>
        </div>
    )
}

export default SidebarSettings