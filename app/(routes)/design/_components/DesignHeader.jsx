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
import ImageKit from 'imagekit'

const DesignHeader = ({ DesignInfo }) => {

    const { canvasEditor } = useCanvasHook();
    const SaveDesign = useMutation(api.designs.saveDesign);
    const { designId } = useParams();

    var imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KIT,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KIT,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });

    //used to save design in json format in db
    const onSave = async () => {
        if (canvasEditor) {
            const base64Image = canvasEditor.toDataURL({
                format: 'png',
                quality: 0.5
            })

            //get list of files
            const existingFiles = await imagekit.listFiles({
                searchQuery: `name="${designId}.png"`
            })

            //delete old file of exists
            if (existingFiles && existingFiles.length > 0) {
                await imagekit.deleteFile(existingFiles[0].fileId);
            }
            const imageRef = await imagekit.upload({
                file: base64Image,
                fileName: designId + ".png",
                isPublished: true,
                useUniqueFileName: false,
            })
            console.log(imageRef.url);

            const jsonDesign = canvasEditor.toJSON();

            const result = await SaveDesign({
                id: designId,
                jsonDesign: jsonDesign,
                imagePreview: imageRef.url, //imagekit url
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