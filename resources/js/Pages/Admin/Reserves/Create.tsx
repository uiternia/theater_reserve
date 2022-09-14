import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { HiOutlinePlusSm } from "react-icons/hi";
import ValidationErrors from "@/Components/ValidationErrors";
import { FlashMessage } from "@/Components/FlashMessage";
import UserSearchModal from "@/Components/UserSearchModal";
import EventSearchModal from "@/Components/EventSearchModal";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Program {
    id: string;
    name: string;
    start_date: string;
}

export default function Create(props: any) {
    const { data, setData, post, errors, processing } = useForm({
        user_id: "",
        event_id: "",
        number_of_people: "",
        introduction: "",
    });

    function onSubmit(e: any) {
        e.preventDefault();
        post(route("admin.reserves.store"));
    }

    const selectUserEmit = (u: User) => {
        setData("user_id", u.id);
    };

    const selectEventEmit = (p: Program) => {
        setData("event_id", p.id);
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    お客様イベント予約
                </h2>
            }
        >
            <Head
                title="顧客管理
        "
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="p-16 bg-white border-b border-gray-200">
                            <form onSubmit={onSubmit}>
                                <div className="flex justify-center">
                                    <UserSearchModal
                                        selectUserEmit={selectUserEmit}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <EventSearchModal
                                        program_name={props.program_name}
                                        selectEventEmit={selectEventEmit}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="flex justify-center">
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">
                                                    紹介有り
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="radio-6"
                                                    className="radio ml-4 checked:bg-blue-500"
                                                    checked={
                                                        data.introduction ===
                                                        "0"
                                                    }
                                                    value={data.introduction}
                                                    onChange={(e) =>
                                                        setData(
                                                            "introduction",
                                                            "0"
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">
                                                    紹介無し
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="radio-6"
                                                    className="radio ml-4 checked:bg-blue-500"
                                                    checked={
                                                        data.introduction ===
                                                        "1"
                                                    }
                                                    value={data.introduction}
                                                    onChange={(e) =>
                                                        setData(
                                                            "introduction",
                                                            "1"
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="number"
                                            name="number_of_people"
                                            id="max_people"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                            onChange={(e) =>
                                                setData(
                                                    "number_of_people",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="max_people"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            予約人数
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        お客様予約追加
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
