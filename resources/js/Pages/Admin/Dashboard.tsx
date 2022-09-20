import React, { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { getToday, timeSelect } from "@/Common/Time";
import ValidationErrors from "@/Components/ValidationErrors";
import axios from "axios";
import Chart from "@/Components/Chart";

interface Date {
    date: string;
}

interface Total {
    date: number;
}

export default function Dashboard(props: any) {
    useEffect(() => {
        data.start = getToday();
        data.end = getToday();
    }, []);
    //formメソッド
    const { data, setData, post, errors, processing } = useForm({
        start: "",
        end: "",
        type: "perDay",
    });

    const [labels, setLabels] = useState<Array<Date>>([]);
    const [totals, setTotals] = useState<Array<Total>>([]);
    //分析が他にも必要な場合に使用_@
    const [types, setTypes] = useState("");

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios
                .get("/api/analysis/", {
                    params: {
                        startDate: data.start,
                        endDate: data.end,
                        type: data.type,
                    },
                })
                .then((res) => {
                    setLabels(res.data.labels);
                    setTotals(res.data.totals);
                    setTypes(res.data.type);
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-mono font-medium text-xl text-gray-800 leading-tight">
                    売上管理
                </h2>
            }
        >
            <Head title="売上管理" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-16 bg-white border-b border-gray-200">
                            <form onSubmit={onSubmit}>
                                <div className="flex justify-center">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">
                                                日別
                                            </span>
                                            <input
                                                type="radio"
                                                name="radio-6"
                                                className="radio ml-4 checked:bg-blue-500"
                                                checked={data.type === "perDay"}
                                                value={data.type}
                                                onChange={(e) =>
                                                    setData("type", "perDay")
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">
                                                月別
                                            </span>
                                            <input
                                                type="radio"
                                                name="radio-6"
                                                className="radio ml-4 checked:bg-blue-500"
                                                checked={
                                                    data.type === "perMonth"
                                                }
                                                value={data.type}
                                                onChange={(e) =>
                                                    setData("type", "perMonth")
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">
                                                年別
                                            </span>
                                            <input
                                                type="radio"
                                                name="radio-6"
                                                className="radio ml-4 checked:bg-blue-500"
                                                checked={
                                                    data.type === "perYear"
                                                }
                                                value={data.type}
                                                onChange={(e) =>
                                                    setData("type", "perYear")
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-around sm:justify-center">
                                    <div className="relative mr-2">
                                        <label
                                            htmlFor="date"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            From
                                        </label>
                                        <input
                                            type="date"
                                            id="start"
                                            name="start"
                                            value={data.start}
                                            onChange={(e) =>
                                                setData("start", e.target.value)
                                            }
                                            className="w-full mb-6 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label
                                            htmlFor="date"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            To
                                        </label>
                                        <input
                                            type="date"
                                            id="end"
                                            name="end"
                                            value={data.end}
                                            onChange={(e) =>
                                                setData("end", e.target.value)
                                            }
                                            className="w-full mb-6 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        集計する
                                    </button>
                                </div>
                            </form>
                            {totals.length === 0 ? (
                                <></>
                            ) : (
                                <Chart data={totals} labels={labels} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
