import React, { useEffect, useState } from 'react'
import ShapesSetting from '../Sharable/ShapesSetting'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

const TopNavbar = () => {
    const { canvasEditor } = useCanvasHook();
    const [showShapeSettings, setShowShapeSettings] = useState(false);

    useEffect(() => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            console.log(activeObject, canvasEditor);
        }

    }, [canvasEditor]);

    if (canvasEditor) {
        canvasEditor.on("selection:created", function (e) {
            const activeObject = canvasEditor.getActiveObject();

            if (e.selected[0]?.cornerStyle == "rect") {
                setShowShapeSettings(true);
            }
        })

        canvasEditor.on("selection:cleared", function () {
            setShowShapeSettings(false);
        })
    }
    return (
        <div className='p-3 bg-white'>
            {showShapeSettings && <ShapesSetting />}
        </div>
    )
}

export default TopNavbar