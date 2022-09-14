import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

interface Program {
    id: number;
    name: string;
    start_date: string;
}

export default function EventSearchModal(props: any) {
    const { program_name, selectEventEmit } = props;
    const [open, setOpen] = useState(false);
    const [programs, setPrograms] = useState<Array<Program>>([]);
    const [selectProgram, setSelectProgram] = useState("");

    const cancelButtonRef = useRef(null);

    //selectImageが渡された関数でそれに対してImageの値を渡している
    const selectProgramChild = (p: Program) => {
        selectEventEmit(p);
        setSelectProgram(
            "名前: " + p.name + "  " + "開始時刻: " + p.start_date
        );
        setOpen(false);
    };

    const handleChange = async (e: any) => {
        try {
            await axios
                .get(`/api/searchProgram/?program=${e.target.value}`)
                .then((res) => {
                    setPrograms(res.data);
                });
            setOpen(!open);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center form-control mb-10">
                <div>
                    <label className="label">
                        <span className="label-text">顧客検索</span>
                    </label>

                    <select
                        onChange={handleChange}
                        value={selectProgram}
                        className="select select-secondary w-full max-w-xs"
                    >
                        <option disabled value={selectProgram} selected>
                            演目選択
                        </option>
                        {program_name.map((p: any) => (
                            <option key={p.name} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectProgram && (
                    <div className="my-4 flex justify-center">
                        {selectProgram}
                    </div>
                )}
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* この要素は、ブラウザを騙してモーダル コンテンツを中央に配置します。 */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block justify-center align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 mb-4 font-medium text-gray-900"
                                            >
                                                顧客選択
                                            </Dialog.Title>
                                            <div className="overflow-x-auto">
                                                <table className="table w-full">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Name</th>
                                                            <th>開始時刻</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {programs.map(
                                                            (p: any) => (
                                                                <tr key={p.id}>
                                                                    <td>
                                                                        {p.id}
                                                                    </td>
                                                                    <td>
                                                                        {p.name}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            p.start_date
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() =>
                                                                                selectProgramChild(
                                                                                    p
                                                                                )
                                                                            }
                                                                            type="button"
                                                                            className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                        >
                                                                            選択
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        閉じる
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
