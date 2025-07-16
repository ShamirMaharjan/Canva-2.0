import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/context/UserDetailContext'
import { Loader2Icon } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';

const CustomCanvaDialog = ({ children }) => {

    const [name, setName] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [loading, setLoading] = useState(false);

    const createDesignRecord = useMutation(api.designs.CreateNewDesign);
    const { userDetail } = useContext(UserDetailContext)

    const router = useRouter();

    const onCreate = async () => {
        toast("Loading...")
        setLoading(true);
        const result = await createDesignRecord({
            name: name,
            width: Number(width),
            height: Number(height),
            uid: userDetail?._id
        });

        console.log(result);
        setLoading(false);

        router.push("/design/" + result);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Custom Dialog</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-1'>
                            <h2 className='text-md'>Provide Canvas width and height</h2>
                            <div className='mt-2'>
                                <label >Design Name</label>
                                <Input className="mt-2" placeholder={"Design Name"} onChange={(e) => setName(e.target.value)} />
                                <div className='mt-2 flex gap-5'>
                                    <div className='w-full'>
                                        <label className=''>Width</label>
                                        <Input className="mt-2" type="number" placeholder={500} onChange={(e) => setWidth(e.target.value)} />
                                    </div>
                                    <div className='w-full'>
                                        <label className=''>Height</label>
                                        <Input className="mt-2" type="number" placeholder={500} onChange={(e) => setHeight(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end mt-6 '>
                                <Button className="w-full"
                                    disabled={loading || !name || !width || !height || !userDetail}
                                    onClick={onCreate}
                                >
                                    {loading ? <Loader2Icon className='animate-spin' /> : "Create"}
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CustomCanvaDialog