import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { IText } from 'fabric';
import React from 'react'

const TextSettings = () => {

    const { canvasEditor } = useCanvasHook();

    const onAddTextClick = (type) => {
        if (canvasEditor) {
            if (type === 'Heading') {
                const typeRef = new IText("Add Heading", {
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    fill: "black",
                    left: 100,
                    top: 100
                })
                canvasEditor.add(typeRef)
            } else if (type === 'SubHeading') {
                const typeRef = new IText("Add Sub-Heading", {
                    fontSize: 20,
                    fontWeight: '400',
                    fontFamily: 'Roboto',
                    fill: "black",
                    left: 100,
                    top: 100
                })
                canvasEditor.add(typeRef)
            } else {
                const typeRef = new IText("Add Paragraph", {
                    fontSize: 13,
                    fontWeight: 'normal',
                    fontFamily: 'Roboto',
                    fill: "black",
                    left: 100,
                    top: 100
                })
                canvasEditor.add(typeRef)
            }
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-3xl bg-secondary p-3 rounded-md cursor-pointer '
                onClick={() => onAddTextClick('Heading')}
            >Add Heading</h2>
            <h2 className='font-medium text-xl bg-secondary p-3 rounded-md cursor-pointer'
                onClick={() => onAddTextClick('SubHeading')}
            >Sub Heading</h2>
            <h2 className=' text-bd bg-secondary p-3 rounded-md cursor-pointer'
                onClick={() => onAddTextClick('Paragraph')}
            >Paragraph</h2>
        </div>
    )
}

export default TextSettings