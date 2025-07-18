"use client"
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { Button } from '@/components/ui/button'
import { FabricImage } from 'fabric'
import ImageKit from 'imagekit'
import { ImageUp } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CustomImageUpload = ({ selectedAi }) => {
    const { designId } = useParams();
    const { canvasEditor } = useCanvasHook();

    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    var imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KIT,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KIT,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });

    const onImageUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];

        const imageRef = await imagekit.upload({
            file: file,
            fileName: designId + ".png",
            isPublished: true,
        });

        setImage(imageRef?.url)
        setLoading(false);
    }

    const onAddToCanvas = async () => {
        const canvasImageref = await FabricImage.fromURL(
            image
        )
        canvasEditor.add(canvasImageref);
        setImage(null)

    }

    useEffect(() => {

        let imageUrl = image;

        if (selectedAi) {
            if (image?.includes("?tr=")) {
                imageUrl = imageUrl + "," + selectedAi.command
            } else {
                imageUrl = imageUrl + "?tr=" + selectedAi.command
            }

            console.log(imageUrl);
            setImage(imageUrl);
        }

    }, [selectedAi])

    return (
        <div>
            {!image ?
                <label htmlFor='uploadImage' className='bg-secondary p-4 flex flex-col items-center justify-center rounded-md h-[100px] mb-4'>
                    <ImageUp />
                    <p>Upload Image</p>
                </label> :
                <label htmlFor='uploadImage'>
                    <Image src={image} alt="image" width={100} height={100} className='w-full h-[150px] rounded-md object-cover' />
                </label>
            }
            <input type='file' id="uploadImage" className='hidden'
                onChange={onImageUpload}
            />

            {image && <Button className="w-full my-2" onClick={onAddToCanvas} disabled={loading}>
                {loading && <Loader2Icon className='animate-spin' />}
                Add to canvas
            </Button>}
        </div>
    )
}

export default CustomImageUpload