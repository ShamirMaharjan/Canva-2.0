import React, { useState } from 'react'
import ColorPickerEditor from './ColorPickerEditor'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

const BorderColor = () => {
    const { canvasEditor } = useCanvasHook();
    const [color, setColor] = useState("#000");

    const onColorChange = (color) => {
        setColor(color);
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            activeObject.set({
                stroke: color
            });
            canvasEditor.renderAll();
        }
    }
    return (
        <div>
            <ColorPickerEditor onColorChange={(v) => onColorChange(v)}
                value={color}
            />
        </div>
    )
}

export default BorderColor