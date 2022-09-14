import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FlashMessage } from "@/Components/FlashMessage";
import Pagination from "@/Components/Pagination";
import dayjs from "dayjs";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props: any) {
    const showEvent = (id: number) => {
        Inertia.get(route("admin.events.show", id));
    };
    const noImage = "/storage/images/no_image.jpg";
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    演目一覧
                </h2>
            }
        >
            <Head title="演目一覧" />

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
                                <table className="table border-secondary table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th className="border-secondary">
                                                演目名
                                            </th>
                                            <th>開始時刻</th>
                                            <th>会場上限</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.events.data.map((event: any) => (
                                            <tr key={event.id}>
                                                <th>{event.name}</th>
                                                <td>
                                                    {dayjs(
                                                        event.start_date
                                                    ).format("YYYY-MM-DD HH時")}
                                                </td>
                                                <td>{event.max_people}人</td>
                                                <td>
                                                    {" "}
                                                    {event.image === null ? (
                                                        <a>
                                                            <img
                                                                onClick={() =>
                                                                    showEvent(
                                                                        event.id
                                                                    )
                                                                }
                                                                key={event.id}
                                                                src={noImage}
                                                                className="object-cover h-14 w-14 rounded-2xl "
                                                            ></img>
                                                        </a>
                                                    ) : (
                                                        <a>
                                                            <img
                                                                onClick={() =>
                                                                    showEvent(
                                                                        event.id
                                                                    )
                                                                }
                                                                key={event.id}
                                                                src={
                                                                    event.image
                                                                }
                                                                className="object-cover h-14 w-14 rounded-2xl "
                                                            ></img>
                                                        </a>
                                                    )}
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
