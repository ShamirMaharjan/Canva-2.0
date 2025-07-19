import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@stackframe/stack'
import { Download, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useCanvasHook } from '../[designId]/page'
import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'

const DesignHeader = ({ DesignInfo }) => {

    const { canvasEditor } = useCanvasHook();
    const SaveDesign = useMutation(api.designs.saveDesign);
    const { designId } = useParams();

    //used to save design in json format in db
    const onSave = async () => {
        if (canvasEditor) {
            const jsonDesign = canvasEditor.toJSON();
            // console.log(jsonDesign);
            const result = await SaveDesign({
                id: designId,
                jsonDesign: jsonDesign,
            })

            console.log(result);
            toast.success("Design Saved");
        }
    }

    const onExport = () => {
        const dataUrl = canvasEditor.toDataURL({
            format: 'png',
            quality: 1
        })

        const link = document?.createElement("a");
        link.href = dataUrl;
        link.download = "CanvaDesign.png";
        link.click();

        toast.success("Design Exported");
        link.remove();

    }

    return (
        <div className='p-3 flex justify-between bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600'>
            <Image src={"/logo-white.png"} alt="logo" width={100} height={50} />
            <input placeholder="design Name" className='border-none outline-none text-white'
                value={DesignInfo?.name || ''} readOnly />
            <div className='flex gap-5'>
                <Button onClick={onSave} ><Save />Save</Button>
                <Button onClick={() => onExport()}><Download />Export</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default DesignHeader