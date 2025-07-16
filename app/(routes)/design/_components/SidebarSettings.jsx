import React from 'react'

const SidebarSettings = ({ selectedOption }) => {
    return (
        <div className='w-[280px] p-5 h-screen border-r'>
            {selectedOption?.name}
        </div>
    )
}

export default SidebarSettings