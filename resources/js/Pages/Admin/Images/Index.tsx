import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { GoTrashcan } from "react-icons/go";
import { MdOutlineCameraEnhance } from "react-icons/md";
import { FlashMessage } from "@/Components/FlashMessage";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props: any) {
    const destroyImage = (id: number) => {
        if (confirm("イベント画像を消去してしまってもよろしいでしょうか?")) {
            Inertia.delete(route("admin.images.destroy", id));
        }
    };
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    画像一覧
                </h2>
            }
        >
            <Head title="画像管理" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-center">
                                <Link href="/admin/images/create">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        画像追加
                                        <MdOutlineCameraEnhance className="text-center ml-1 w-6 h-6"></MdOutlineCameraEnhance>
                                    </button>
                                </Link>
                            </div>
                            <div className="flex flex-wrap">
                                {props.images.map((i: any) => (
                                    <div
                                        key={i.id}
                                        className="rounded-md md:w-1/2 lg:w-1/3 p-4"
                                    >
                                        <div className="border-double border-4 border-gray-600 rounded-md p-2 md:p-4">
                                            <img
                                                className="rounded-lg"
                                                src={i.image}
                                                alt="image"
                                                loading="lazy"
                                                width=""
                                                height=""
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => destroyImage(i.id)}
                                            className=" mt-1 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-blue-500"
                                        >
                                            削除
                                            <GoTrashcan className="text-center ml-1 w-6 h-6"></GoTrashcan>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
