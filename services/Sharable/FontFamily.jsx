import React from 'react'
import { FontFamilyList } from '../Options'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

const FontFamily = () => {

    const { canvasEditor } = useCanvasHook();

    const onFontFamilyChange = (value) => {
        if (!canvasEditor) return;
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            activeObject.set({
                fontFamily: value
            });
            canvasEditor.renderAll();
        }
    }

    return (
        <div className='h-[200px] overflow-auto'>
            {FontFamilyList.map((font, index) => (
                <h2 key={index} className='text-lg p-2 bg-secondary rounded-md mb-2 cursor-pointer'
                    style={{
                        fontFamily: font
                    }}
                    onClick={() => onFontFamilyChange(font)}>{font}</h2>
            ))}
        </div>
    )
}

export default FontFamily