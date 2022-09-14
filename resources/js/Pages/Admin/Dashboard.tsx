import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";

export default function Dashboard(props: any) {
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            売上管理
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
