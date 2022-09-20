import { Fragment, useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart(props: any) {
    const { data, labels } = props;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "劇団売上確認",
            },
        },
    };

    const dataA = {
        labels,
        datasets: [
            {
                label: "売上",
                data: data,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <>
            <div className="flex justify-center items-center  mt-10">
                <div>
                    <Bar options={options} data={dataA} />
                </div>
            </div>
        </>
    );
}
