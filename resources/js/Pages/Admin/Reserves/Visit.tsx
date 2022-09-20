import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { TbUserCheck } from "react-icons/tb";
import { MdFreeCancellation } from "react-icons/md";

import { FlashMessage } from "@/Components/FlashMessage";

export default function Visit(props: any) {
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
                    当日予約管理
                </h2>
            }
        >
            <Head title="当日予約管理" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FlashMessage />
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <div className="sm:flex justify-between">
                                <div className="m-4">
                                    {/* <form onSubmit={onSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                placeholder="必要そうなら機能つけます！"
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
                                    </form> */}
                                </div>
                            </div>
                            {props.reservesVisit.length === 0 &&
                            props.reservesVisited.length === 0 ? (
                                <>
                                    <div className="flex justify-center mb-10">
                                        本日の予約はありません。
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center my-4">
                                        <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                                            まだ来場でないお客様
                                        </h2>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table border-secondary table-zebra w-full">
                                            <thead>
                                                <tr>
                                                    <th className="border-secondary ">
                                                        予約者
                                                    </th>
                                                    <th>Email</th>
                                                    <th>予約人数</th>
                                                    <th>紹介有無</th>
                                                    <th>変更する</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.reservesVisited.map(
                                                    (reserve: any) => (
                                                        <tr key={reserve.id}>
                                                            <th>
                                                                {reserve.name}
                                                            </th>

                                                            <td>
                                                                {reserve.email}
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
                                                            <td>
                                                                <Link
                                                                    href={route(
                                                                        "admin.visit.true",
                                                                        reserve.id
                                                                    )}
                                                                >
                                                                    <TbUserCheck className="w-6 h-6" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-center mt-20">
                                        <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                                            既に来場したお客様
                                        </h2>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table border-secondary table-zebra w-full">
                                            <thead>
                                                <tr>
                                                    <th className="border-secondary ">
                                                        予約者
                                                    </th>
                                                    <th>Email</th>
                                                    <th>予約人数</th>
                                                    <th>紹介有無</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.reservesVisit.map(
                                                    (reserve: any) => (
                                                        <tr key={reserve.id}>
                                                            <th>
                                                                {reserve.name}
                                                            </th>

                                                            <td>
                                                                {reserve.email}
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
                                                            <td>
                                                                <Link
                                                                    href={route(
                                                                        "admin.visit.false",
                                                                        reserve.id
                                                                    )}
                                                                >
                                                                    <MdFreeCancellation className="w-6 h-6" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
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
