import React, { useState } from 'react'
import { TextSettingsList } from '../Options'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Trash } from 'lucide-react';
import FontStyles from '../Sharable/FontStyles';

const TextSettingsNavbar = () => {
    const { canvasEditor } = useCanvasHook();
    const [show, setShow] = useState(false);
    const onDelete = () => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            if (activeObject) {
                canvasEditor.remove(activeObject);
                setShow(true);
            }
        }
    }

    return (
        <div className='flex gap-6 items-center'>
            {TextSettingsList.map((shape, index) => (
                <div key={index} className='hover:scale-115 transition-all cursor-pointer'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <shape.icon />
                        </PopoverTrigger>
                        <PopoverContent>
                            {shape?.component}
                        </PopoverContent>
                    </Popover>
                </div>
            ))}

            <FontStyles />

            <Trash className='hover:scale-115 transition-all cursor-pointer' onClick={onDelete} />
        </div>
    )
}

export default TextSettingsNavbar