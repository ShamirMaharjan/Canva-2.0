"use client"
import React, { useState } from 'react'
import ColorPickerEditor from '../Sharable/ColorPickerEditor'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

const BackgroundSettings = () => {
    const [bgColor, setBgColor] = useState('#ffffff');


    //used to chang the canvas background color
    const { canvasEditor } = useCanvasHook();
    const onColorChange = (color) => {
        setBgColor(color);
        canvasEditor?.set({
            backgroundColor: color,
            backgroundImage: null
        })
        canvasEditor.renderAll();
    }
    return (
        <div>
            <ColorPickerEditor
                value={bgColor}
                onColorChange={(v) => onColorChange(v)}
            />
        </div>
    )
}

export default BackgroundSettings