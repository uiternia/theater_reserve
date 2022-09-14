import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import dayjs from "dayjs";
import Pagination from "@/Components/Pagination";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FlashMessage } from "@/Components/FlashMessage";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props: any) {
    const { data, setData, get, errors, processing } = useForm({
        search: "",
    });

    function onSubmit(e: any) {
        e.preventDefault();
        get(route("admin.reserves.index"));
    }

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    予約一覧
                </h2>
            }
        >
            <Head title="予約一覧" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <div className="sm:flex justify-between">
                                <div className="m-8">
                                    <form onSubmit={onSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                placeholder="name or email"
                                                className="input input-bordered"
                                                value={data.search}
                                                onChange={(e) =>
                                                    setData(
                                                        "search",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                className="btn btn-square"
                                                type="submit"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="m-8">
                                    <Link href="/admin/reserves/create">
                                        <button
                                            type="button"
                                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            新規お客様予約
                                            <HiOutlinePlusSm className="w-6 h-6"></HiOutlinePlusSm>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            {props.reserves.data.length === 0 ? (
                                <>
                                    <div className="flex justify-center mb-10">
                                        検索結果はありません
                                    </div>
                                    <div className="flex justify-center mb-10">
                                        <Link
                                            href={route("admin.reserves.index")}
                                        >
                                            <button
                                                type="button"
                                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                一覧に戻る
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="table border-secondary table-zebra w-full">
                                            <thead>
                                                <tr>
                                                    <th className="border-secondary ">
                                                        予約者
                                                    </th>
                                                    <th>演目</th>
                                                    <th>開始時刻</th>
                                                    <th>予約人数</th>
                                                    <th>紹介</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.reserves.data.map(
                                                    (reserve: any) => (
                                                        <tr key={reserve.id}>
                                                            <th className="text-blue-500">
                                                                <Link
                                                                    href={route(
                                                                        "admin.reserves.edit",
                                                                        reserve.id
                                                                    )}
                                                                >
                                                                    {
                                                                        reserve.name
                                                                    }
                                                                </Link>
                                                            </th>

                                                            <td>
                                                                {reserve.e_name}
                                                            </td>
                                                            <td>
                                                                {dayjs(
                                                                    reserve.start_date
                                                                ).format(
                                                                    "YYYY-MM-DD HH時"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    reserve.number_of_people
                                                                }
                                                                人
                                                            </td>
                                                            <td>
                                                                {reserve.introduction ? (
                                                                    <p>有</p>
                                                                ) : (
                                                                    <p>無</p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="ml-4">
                                            <Pagination
                                                className="mt-6"
                                                links={props.reserves.links}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
