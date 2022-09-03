import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AdminAuthenticated";
import { Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export default function Dashboard(props: any) {
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
                        <div className="p-6 bg-white border-b border-gray-200">
                            イベント一覧
                        </div>
                        <Link href="/admin/events/create">
                            <Button
                                variant="outlined"
                                endIcon={<ControlPointIcon />}
                            >
                                Menu追加
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
