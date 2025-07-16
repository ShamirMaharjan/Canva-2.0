import React from 'react'

const SidebarSettings = ({ selectedOption }) => {
    return (
        <div className='w-[280px] p-5 h-screen border-r'>
            <h2 className='font-semibold text-xl'>{selectedOption?.name}</h2>
            <h2 className='text-sm text-gray-500'>{selectedOption?.desc}</h2>
            <div className='mt-7'>

                {selectedOption?.component}
            </div>
        </div>
    )
}

export default SidebarSettings