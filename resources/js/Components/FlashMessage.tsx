import { usePage } from "@inertiajs/inertia-react";
import React from "react";

export const FlashMessage = () => {
    const { flash } = usePage().props as any;

    return (
        <>
            <div>
                {flash.message && (
                    <div className="bg-blue-300 text-white p-4">
                        {flash.message}
                    </div>
                )}
            </div>
            <div>
                {flash.error && (
                    <div className="bg-red-300 text-white p-4">
                        {flash.error}
                    </div>
                )}
            </div>
        </>
    );
};
