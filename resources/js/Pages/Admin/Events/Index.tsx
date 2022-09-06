import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { HiOutlinePlusSm, HiOutlinePencilAlt } from "react-icons/hi";
import { FlashMessage } from "@/Components/FlashMessage";
import Pagination from "@/Components/Pagination";
import dayjs from "dayjs";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props: any) {
    const showEvent = (id: number) => {
        Inertia.get(route("admin.events.show", id));
    };
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    イベント一覧
                </h2>
            }
        >
            <Head title="Event" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="mt-4 bg-white border-b border-gray-200">
                            <div className="flex justify-center mb-4">
                                <Link href="/admin/events/create">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        新規作成
                                        <HiOutlinePlusSm className="w-6 h-6"></HiOutlinePlusSm>
                                    </button>
                                </Link>
                            </div>
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                演目名
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                開始時刻
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                会場上限
                                            </th>

                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.events.data.map((event: any) => (
                                            <tr
                                                key={event.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {event.name}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {/* {event.start_date} */}
                                                    {dayjs(
                                                        event.start_date
                                                    ).format("YYYY-MM-DD HH時")}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {event.max_people}人
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            showEvent(event.id)
                                                        }
                                                        key={event.id}
                                                        className="text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        編集
                                                        <HiOutlinePencilAlt className="w-6 h-6"></HiOutlinePencilAlt>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="ml-4">
                                    <Pagination
                                        className="mt-6"
                                        links={props.events.links}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
