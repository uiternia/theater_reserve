import React, { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { getToday, timeSelect } from "@/Common/Time";
import ValidationErrors from "@/Components/ValidationErrors";
import { FlashMessage } from "@/Components/FlashMessage";
import { RiSendPlaneLine } from "react-icons/ri";
import ImageModal from "@/Components/ImageModal";

interface Image {
    id: string;
    image: string;
}

export default function Edit(props: any) {
    //初期値として渡ってくるimageの設定(画像の表示と初期props値)
    const [propsImage, setPropsImage] = useState("");
    const [initialImage, setInitialImage] = useState(true);
    useEffect(() => {
        setPropsImage(props.event.image);
    });
    //formメソッド
    const { data, setData, put, errors, processing } = useForm({
        name: props.event.name || "",
        max_people: props.event.max_people || "",
        information: props.event.information || "",
        image_id: props.event.image_id,
    });

    const selectImageEmit = (i: Image) => {
        setInitialImage(false);
        setData("image_id", i.id);
    };

    function onSubmit(e: any) {
        e.preventDefault();
        put(route("admin.events.update", props.event.id));
    }

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    イベント編集
                </h2>
            }
        >
            <Head title="演目編集" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="p-16 bg-white border-b border-gray-200">
                            <form method="post" onSubmit={onSubmit}>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="name"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            イベント名
                                        </label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="number"
                                            name="max_people"
                                            id="max_people"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                            value={data.max_people}
                                            onChange={(e) =>
                                                setData(
                                                    "max_people",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="max_people"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            会場上限人数
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                                        イベント詳細
                                    </label>
                                    <input
                                        type="text"
                                        id="information"
                                        value={data.information}
                                        onChange={(e) =>
                                            setData(
                                                "information",
                                                e.target.value
                                            )
                                        }
                                        className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <label
                                        className=" block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                                        htmlFor="image"
                                    >
                                        イベント画像
                                    </label>
                                </div>
                                <ImageModal
                                    selectImageEmit={selectImageEmit}
                                ></ImageModal>

                                {props.event.image === null && initialImage ? (
                                    <div className="my-4 flex justify-center">
                                        <img
                                            alt="image"
                                            className="object-cover h-48 w-96 rounded-lg"
                                            src="/storage/images/no_image.jpg"
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {props.event.image && initialImage ? (
                                    <div className="my-4 flex justify-center">
                                        <img
                                            alt="image"
                                            className="object-cover h-48 w-96 rounded-lg"
                                            src={propsImage}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <div className="mt-4 flex justify-center">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        編集
                                        <RiSendPlaneLine className="w-6 h-6"></RiSendPlaneLine>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
