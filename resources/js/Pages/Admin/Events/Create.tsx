import React, { useCallback, useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { getToday, timeSelect } from "@/Common/Time";
import ValidationErrors from "@/Components/ValidationErrors";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FlashMessage } from "@/Components/FlashMessage";
import ImageModal from "@/Components/ImageModal";

interface Image {
    id: string;
    image: string;
}

export default function Create(props: any) {
    useEffect(() => {
        data.date = getToday();
        data.start_time = "10:00:00";
        data.end_time = "11:00:00";
    }, []);

    const time = timeSelect();

    //formメソッド
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        max_people: "",
        information: "",
        image_id: "",
        date: "",
        start_time: "",
        end_time: "",
    });

    const startTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setData("start_time", value);
    };

    const endTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setData("end_time", value);
    };

    //関数をImageModal.tsxに渡しそれを子側で渡し受け取る関数
    const selectImageEmit = (i: Image) => {
        console.log(i);
        setData("image_id", i.id);
    };

    function onSubmit(e: any) {
        e.preventDefault();
        post(route("admin.events.store"));
    }

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    新規イベント
                </h2>
            }
        >
            <Head title="演目作成" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="p-16 bg-white border-b border-gray-200">
                            <form onSubmit={onSubmit}>
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
                                <div>
                                    <div className="relative">
                                        <label
                                            htmlFor="date"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            イベント日付
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={data.date}
                                            onChange={(e) =>
                                                setData("date", e.target.value)
                                            }
                                            className="w-full mb-6 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 mb-6 w-full group">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                            開始時間
                                        </label>
                                        <select
                                            onChange={startTimeChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {time.map((t, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={t}
                                                    >
                                                        {t}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                            終了時間
                                        </label>
                                        <select
                                            onChange={endTimeChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {time.map((t, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={t}
                                                    >
                                                        {t}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        イベント追加
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
