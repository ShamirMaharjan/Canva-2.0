import React from 'react'
import { shapesSettingsList } from '../Options'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Trash } from 'lucide-react'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

const ShapesSetting = () => {
    const { canvasEditor } = useCanvasHook();
    const onDelete = () => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            if (activeObject) {
                canvasEditor.remove(activeObject);
                canvasEditor.renderAll();
            }
        }
    }
    return (
        <div className='flex gap-6 items-center'>
            {shapesSettingsList.map((shape, index) => (
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
            <Trash className='hover:scale-115 transition-all cursor-pointer' onClick={onDelete} />
        </div>
    )
}

export default ShapesSetting