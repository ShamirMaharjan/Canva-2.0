"use client"
import { Canvas } from 'fabric';
import React, { useEffect, useRef, useState } from 'react'

const CanvasEditor = ({ DesignInfo }) => {

    const canvasref = useRef();
    const [canvas, setCanvas] = useState(null);

    //used to initialize canvas with default width and heright
    useEffect(() => {

        if (canvasref.current && DesignInfo) {
            const initCanvas = new Canvas(canvasref.current, {
                width: DesignInfo?.width / 1.5,
                height: DesignInfo?.height / 1.5,
                backgroundColor: '#ffffff'
            });

            //set high resolution scale factor
            const scaleFactor = window.devicePixelRatio || 1;
            initCanvas.set({
                width: DesignInfo?.width * scaleFactor,
                height: DesignInfo?.height * scaleFactor,
                zoom: 1 / scaleFactor
            })
            initCanvas.renderAll();
            setCanvas(initCanvas);
            return () => {
                initCanvas.dispose();
            }
        }
    }, [DesignInfo])
    return (
        <div className='bg-secondary w-full h-screen flex flex-col items-center justify-center'>
            <canvas id="canvas" ref={canvasref} />
        </div>
    )
}

export default CanvasEditor