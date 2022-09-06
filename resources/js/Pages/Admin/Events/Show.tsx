import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import dayjs from "dayjs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Inertia } from "@inertiajs/inertia";

export default function Show(props: any) {
    const editEvent = (id: number) => {
        Inertia.get(route("admin.events.edit", id));
    };
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.event.name} (
                    {dayjs(props.event.start_date).format("YYYY/MM/DD")}) の詳細
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="py-16 bg-white">
                                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                                    <div className="space-y-6 md:space-y-0 lg:flex md:gap-6 lg:items-center lg:gap-12">
                                        <div className="mb-3 md:5/12 lg:w-5/12">
                                            <img
                                                className="rounded-lg"
                                                src={props.event.image}
                                                alt="image"
                                                loading="lazy"
                                                width=""
                                                height=""
                                            />
                                        </div>

                                        <div className="md:6/12 lg:w-6/12">
                                            <label
                                                htmlFor="name"
                                                className="text-sm font-medium text-gray-500 dark:text-gray-300"
                                            >
                                                イベント名
                                            </label>
                                            <h2 className="name text-xl  mb-3 text-gray-900 font-bold md:text-2xl">
                                                {props.event.name}
                                            </h2>
                                            <label
                                                htmlFor="info"
                                                className="text-sm font-medium text-gray-500 dark:text-gray-300"
                                            >
                                                イベント詳細
                                            </label>
                                            <p className="info mb-3 text-gray-600">
                                                {props.event.information}
                                            </p>
                                            <label
                                                htmlFor="date"
                                                className="text-sm font-medium text-gray-500 dark:text-gray-300"
                                            >
                                                イベント予定時刻
                                            </label>
                                            <p className="date text-gray-600">
                                                {dayjs(
                                                    props.event.start_date
                                                ).format("YYYY-MM-DD HH時")}
                                                -
                                                {dayjs(
                                                    props.event.end_date
                                                ).format("HH時")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            editEvent(props.event.id)
                                        }
                                        key={props.event.id}
                                        className="text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        編集
                                        <HiOutlinePencilAlt className="w-6 h-6"></HiOutlinePencilAlt>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
