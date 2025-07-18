import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Slider } from '@/components/ui/slider';
import React from 'react'

const Opacity = () => {
    const { canvasEditor } = useCanvasHook();
    const onOpacityChange = (value) => {
        if (!canvasEditor) return;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            activeObject.set({
                opacity: value
            });
            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <h2 className='my-2'>Update Opacity</h2>
            <Slider defaultValue={[5]} max={1} step={0.1} onValueChange={(v) => onOpacityChange(v[0])} />
        </div>
    )
}

export default Opacity