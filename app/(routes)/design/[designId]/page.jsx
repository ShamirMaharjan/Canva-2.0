"use client";
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import DesignHeader from '../_components/DesignHeader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Sidebar from '../_components/Sidebar';
import CanvasEditor from '../_components/CanvasEditor';
import { CanvasContext } from '@/context/CanvasContext';


const DesignEditor = () => {
    const { designId } = useParams();

    const [canvasEditor, setCanvasEditor] = useState();

    const DesignInfo = useQuery(api.designs.GetDesign, {
        id: designId
    });

    return (
        <div>
            <CanvasContext.Provider value={{ canvasEditor, setCanvasEditor }}>
                <DesignHeader DesignInfo={DesignInfo} />
                <div className='flex'>
                    <Sidebar />
                    <CanvasEditor DesignInfo={DesignInfo} />
                </div>
            </CanvasContext.Provider>
        </div>
    )
}

export default DesignEditor

export const useCanvasHook = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error('useCanvasHook must be used within a CanvasContextProvider');
    }
    return context;
}