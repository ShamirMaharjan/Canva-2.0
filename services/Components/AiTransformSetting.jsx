import Image from 'next/image'
import React, { useState } from 'react'
import { AITransformationSettings } from '../Options'
import CustomImageUpload from '../Sharable/CustomImageUpload'

const AiTransformSetting = () => {

    const [selectedAi, setSelectedAi] = useState();

    return (
        <div>
            <CustomImageUpload selectedAi={selectedAi} />
            <div className='grid grid-cols-2 gap-3 mt-2'>
                {AITransformationSettings.map((option, index) => (
                    <div key={index} onClick={() => setSelectedAi(option)}>
                        <Image src={option.image} alt={option.name} width={100} height={100}
                            className='w-full h-[100px] object-cover rounded-md'
                        />
                        <p className='text-xs text-center'>{option.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTransformSetting