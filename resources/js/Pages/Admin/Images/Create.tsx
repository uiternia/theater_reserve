import React, { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { getToday, timeSelect } from "@/Common/Time";
import ValidationErrors from "@/Components/ValidationErrors";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FlashMessage } from "@/Components/FlashMessage";

export default function Create(props: any) {
    const time = timeSelect();

    //formメソッド
    const { data, setData, post, errors, processing } = useForm({
        image: "",
    });

    function onSubmit(e: any) {
        e.preventDefault();
        post(route("admin.images.store"));
    }

    //image表示メソッド
    const [value, setValue] = useState("");
    //any -> React.ChangeEvent<HTMLInputElement>
    const onChangeInputFile = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setData("image", e.target.files[0]);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setValue(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    イベント画像追加
                </h2>
            }
        >
            <Head title="Event" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-16 bg-white border-b border-gray-200">
                            <form onSubmit={onSubmit}>
                                <div className="flex justify-center">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                                        htmlFor="image"
                                    >
                                        イベント画像
                                    </label>
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                        <label className="image">
                                            <span className="sr-only">
                                                ファイル選択
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onChangeInputFile}
                                                className="image w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <img
                                            className="my-3 rounded-lg"
                                            src={value}
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        画像追加
                                        <HiOutlinePlusSm className="w-6 h-6"></HiOutlinePlusSm>
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
