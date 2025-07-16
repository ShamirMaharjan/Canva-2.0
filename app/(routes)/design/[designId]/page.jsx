"use client";
import { useParams } from 'next/navigation'
import React from 'react'
import DesignHeader from '../_components/DesignHeader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Sidebar from '../_components/Sidebar';


const DesignEditor = () => {
    const { designId } = useParams();
    console.log(designId);
    const DesignInfo = useQuery(api.designs.GetDesign, {
        id: designId
    });

    return (
        <div>
            <DesignHeader DesignInfo={DesignInfo} />
            <div>
                <Sidebar />
            </div>
        </div>
    )
}

export default DesignEditor