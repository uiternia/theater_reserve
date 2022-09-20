import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Bar } from "react-chartjs-2";

export default function Dashboard(props: any) {
    const data = {
        // x 軸のラベル
        labels: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月"],
        datasets: [
            {
                label: "Dataset",
                // データの値
                data: [65, 59, 80, 81, 56, 55, 40],
                // グラフの背景色
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                // グラフの枠線の色
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                // グラフの枠線の太さ
                borderWidth: 1,
            },
        ],
    };
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            hello
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
