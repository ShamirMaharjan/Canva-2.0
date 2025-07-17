import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Slider } from '@/components/ui/slider'
import React from 'react'

const BorderWidth = () => {

    const { canvasEditor } = useCanvasHook();
    const onWidthChange = (value) => {
        if (!canvasEditor) return;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            activeObject.set({
                strokeWidth: value
            });
            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <h2 className='my-2'>Border Widht</h2>
            <Slider defaultValue={[33]} max={100} step={1} onValueChange={(v) => onWidthChange(v[0])} />
        </div>
    )
}


export default BorderWidth;