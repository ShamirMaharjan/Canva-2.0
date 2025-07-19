import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image';
import React from 'react'

const TemplatesList = () => {
    const { canvasEditor } = useCanvasHook();
    const templatesList = useQuery(api.templates.GetAllTemplates);
    // console.log("templates", templatesList)

    const onTemplateSelect = (template) => {
        if (canvasEditor) {
            canvasEditor.loadFromJSON(template?.jsonData, () => {
                canvasEditor?.requestRenderAll();
            });
        }
    }

    return (
        <div>
            <div className='grid grid-cols-2 gap-5'>
                {templatesList && templatesList.length > 0 ? (
                    templatesList.map((template, index) => (

                        <Image src={template.imagePreview} alt={template.name} width={100} height={100} key={index}
                            onClick={() => onTemplateSelect(template)}
                            className="w-full h-[150px] rounded-md object-contain bg-secondary cursor-pointer"
                        />

                    ))
                ) : (
                    <p>No templates found.</p>
                )}
            </div>
        </div>
    )
}

export default TemplatesList