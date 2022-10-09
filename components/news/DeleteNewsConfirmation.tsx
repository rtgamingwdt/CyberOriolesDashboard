import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Constants from "../../Constants";

export default function DeleteNewsConfirmation({ show, onClose, id }: { show: boolean, onClose: CallableFunction, id: string }) {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e: any) => {
        e.preventDefault();
        onClose();
    };

    const handleSubmit = async (e: any) => {
        await fetch(`${Constants.SERVER.URL}/api/deleteNews?passcode=${process.env.NEXT_PUBLIC_PASSWORD}&id=${id}`)
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
                        <span className="text-[5vh]">Are you sure you want to delete this?</span>
                        <button className="bg-red-600 pl-[1vw] pt-[1vh] pr-[1vw] pb-[1vh] rounded-full">Delete</button>
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