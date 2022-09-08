import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

interface Image {
    id: number;
    image: string;
}

export default function ImageModal(props: any) {
    const { selectImage } = props;
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<Array<Image>>([]);
    const [showImage, setShowImage] = useState("");

    const imagesAll = async () => {
        try {
            await axios.get<Array<Image>>("/api/imagesAll/").then((res) => {
                setImages(res.data);
            });
            setOpen(!open);
        } catch (e) {
            console.log(e);
        }
    };

    const cancelButtonRef = useRef(null);

    //selectImageが渡された関数でそれに対してImageの値を渡している
    const slectImageChild = (i: Image) => {
        selectImage(i);
        setShowImage(i.image);
        setOpen(false);
    };

    return (
        <>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={imagesAll}
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    画像選択
                </button>
            </div>
            {showImage && (
                <div className="my-4 flex justify-center">
                    <img
                        alt="image"
                        className="object-cover h-48 w-96 rounded-lg"
                        src={showImage}
                    />
                </div>
            )}

            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* この要素は、ブラウザを騙してモーダル コンテンツを中央に配置します。 */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                                画像選択
                                            </Dialog.Title>
                                            {images.length === 0 ? (
                                                <div className="mt-4">
                                                    画像の登録がありません
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap">
                                                    {images.map((i: any) => (
                                                        <div
                                                            key={i.id}
                                                            className="rounded-md md:w-1/2 p-2"
                                                        >
                                                            <div className="border-double border-4 border-gray-600 rounded-md p-2 md:p-4">
                                                                <a
                                                                    onClick={() =>
                                                                        slectImageChild(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        className="rounded-lg"
                                                                        src={
                                                                            i.image
                                                                        }
                                                                        alt="image"
                                                                        loading="lazy"
                                                                        width=""
                                                                        height=""
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        閉じる
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
