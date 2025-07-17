import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios'
import { FabricImage } from 'fabric';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const SearchImages = () => {

    const [ImageList, setImageList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const { canvasEditor } = useCanvasHook();
    useEffect(() => {
        getImageList("Gradient");
    }, [])

    const getImageList = async (searchInput) => {

        const result = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: searchInput,
                page: 1,
                per_page: 20,
            },
            headers: {
                Authorization: `Client-ID ` + process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
            }
        });
        setImageList(result?.data?.results)
        console.log(result);
    }

    //to add selected to canvas
    const addImageToCanvas = async (imageUrl) => {
        const canvasImageRef = await FabricImage.fromURL(
            imageUrl,
        )
        canvasEditor.add(canvasImageRef);
        canvasEditor.renderAll();

    }

    return (
        <div className='mt-5'>
            <h2 className='font-semibold'>Search Images</h2>
            <div className='flex gap-2 items-center my-2'>
                <Input placeholder={"bakugo"} onChange={(e) => { setSearchInput(e.target.value) }} />
                <Button onClick={() => getImageList(searchInput)}><SearchIcon /></Button>
            </div>
            <div className='mt-5 grid grid-cols-2 gap-2 overflow-auto h-[69.5vh]'>
                {ImageList.map((image, index) => (
                    <div key={index} onClick={() => addImageToCanvas(image?.urls?.small)} className='cursor-pointer'>
                        <Image src={image?.urls?.thumb} alt={image?.slug}
                            width={300} height={300}
                            className='w-full h-[80px] rounded-sm object-cover'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchImages