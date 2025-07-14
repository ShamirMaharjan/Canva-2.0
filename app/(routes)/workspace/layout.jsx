import React from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader'
import Sidebar from './_components/Sidebar'

function WorkSpaceLayout({ children }) {
    return (
        <div>
            <WorkspaceHeader />
            <div className='flex'>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default WorkSpaceLayout