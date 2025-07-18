"use client"
import { Canvas } from 'fabric';
import React, { useEffect, useRef, useState } from 'react'
import { useCanvasHook } from '../[designId]/page';
import TopNavbar from '@/services/Components/TopNavbar';

const CanvasEditor = ({ DesignInfo }) => {

    const canvasref = useRef();
    const [canvas, setCanvas] = useState(null);
    const { canvasEditor, setCanvasEditor } = useCanvasHook();

    //used to initialize canvas with default width and heright
    useEffect(() => {

        if (canvasref.current && DesignInfo) {
            const initCanvas = new Canvas(canvasref.current, {
                width: DesignInfo?.width / 1.2,
                height: DesignInfo?.height / 1.2,
                backgroundColor: '#ffffff',
                preserveObjectStacking: true,
            });

            //set high resolution scale factor
            const scaleFactor = window.devicePixelRatio || 1;
            initCanvas.set({
                width: DesignInfo?.width * scaleFactor,
                height: DesignInfo?.height * scaleFactor,
                zoom: 1 / scaleFactor
            })


            if (DesignInfo?.jsonTemplete) {
                initCanvas.loadFromJSON(DesignInfo?.jsonTemplete, () => {
                    initCanvas.requestRenderAll();
                })
            }

            setCanvas(initCanvas);
            setCanvasEditor(initCanvas);
            return () => {
                initCanvas.dispose();
            }
        }
    }, [DesignInfo])

    //used to delete selected object from canvas
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key == "Delete" || event.key == "Backspace") {
                if (canvasEditor) {
                    const activeObject = canvasEditor.getActiveObject();
                    if (activeObject) {
                        canvasEditor.remove(activeObject);
                        canvasEditor.renderAll();
                    }
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [canvasEditor])
    return (
        <div className='bg-secondary w-full h-screen'>
            <TopNavbar />
            <div className='mt-10 flex flex-col items-center justify-center'>
                <canvas id="canvas" ref={canvasref} />
            </div>
        </div>
    )
}

export default CanvasEditor