import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Constants from "../../Constants";

export default function EditNews({ show, onClose, id, titlePlaceholder, descriptionPlaceholder }: { show: boolean, onClose: CallableFunction, id: string, titlePlaceholder: string, descriptionPlaceholder: string }) {

    const [isBrowser, setIsBrowser] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e: any) => {
        e.preventDefault();
        onClose();
    };

    const handleSubmit = async (e: any) => {
        if (typeof window !== 'undefined') {
            if (title.length == 0) {
                e.preventDefault();
                document.getElementById("title-error")!.innerHTML = "&nbsp;- REQUIRED";
            } else if (description.length == 0) {
                e.preventDefault();
                document.getElementById("title-error")!.innerHTML = "";
                document.getElementById("description-error")!.innerHTML = "&nbsp;- REQUIRED";
            } else {
                document.getElementById("title-error")!.innerHTML = "";
                document.getElementById("description-error")!.innerHTML = "";
                await fetch(`${Constants.SERVER.URL}/api/editNews?passcode=${process.env.NEXT_PUBLIC_PASSWORD}&id=${id}&title=${title}&description=${description}`).then(async (res) => {
                    console.log(await res.json());
                })
            }
        }
    }

    const modalContent = show ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)] select-none">
            <div>
                <div className="absolute">
                    <div className="flex items-center h-[6.5vh]">
                        <AiFillCloseCircle className="text-[5vh] text-orange-600 ml-[96vw] hover:cursor-pointer" onClick={() => onClose()} />
                    </div>
                </div>
                <div className="flex justify-center items-center h-screen text-white">
                    <form className="flex flex-col gap-5 justify-center items-center w-[50vw] h-[90vh] bg-stone-900 rounded-lg" onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col items-center">
                            <span className="flex text-[4vh]">
                                <span>Title</span>
                                <span id="title-error" className="text-red-600" />
                            </span>
                            <input className="outline-none w-[20vw] h-[5vh] rounded-md bg-stone-800 pl-[0.5vw] pt-[0.5vh] pr-[0.5vw] pb-[0.5vh]" placeholder={titlePlaceholder} value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="flex text-[4vh]">
                                <span>Description</span>
                                <span id="description-error" className="text-red-600" />
                            </span>
                            <div className="bg-stone-800 rounded-lg pl-[0.5vw] pr-[0.5vw] pt-[0.5vh] pb-[0.5vh]">
                                <textarea className="scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded-full scrollbar-track-orange-600 scrollbar-track-rounded-full outline-none resize-none w-[20vw] h-[30vh] rounded-md bg-stone-800 pl-[0.5vw] pt-[0.5vh] pr-[0.5vw] pb-[0.5vh] text-sm" placeholder={descriptionPlaceholder} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <button className="bg-blue-500 pl-[1vw] pt-[1vh] pr-[1vw] pb-[1vh] rounded-full">Edit</button>
                    </form>
                </div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("root")!
        );
    } else {
        return null;
    }
};