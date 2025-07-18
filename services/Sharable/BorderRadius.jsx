import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Slider } from '@/components/ui/slider';
import React from 'react'

const BorderRadius = () => {
    const { canvasEditor } = useCanvasHook();
    const onRadiusChange = (value) => {
        if (!canvasEditor) return;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            activeObject.set({
                rx: value,
                ry: value
            });
            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <h2 className='my-2'>Border Radius</h2>
            <Slider defaultValue={[0]} max={100} step={1} onValueChange={(v) => onRadiusChange(v[0])} />
        </div>
    )
}

export default BorderRadius