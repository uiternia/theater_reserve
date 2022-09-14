import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserSearchModal(props: any) {
    const { selectUserEmit } = props;
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<Array<User>>([]);
    const [selectUser, setSelectUser] = useState("");

    const [search, setSearch] = useState("");

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const searchUsers = async () => {
        try {
            await axios
                .get(`/api/searchUsers/?search=${search}`)
                .then((res) => {
                    setUsers(res.data);
                });
            setOpen(!open);
        } catch (e) {
            console.log(e);
        }
    };

    const cancelButtonRef = useRef(null);

    //selectImageが渡された関数でそれに対してImageの値を渡している
    const slectUserChild = (u: User) => {
        selectUserEmit(u);
        setSelectUser("名前: " + u.name + "  " + "email: " + u.email);
        setOpen(false);
    };

    return (
        <>
            <div className="flex justify-center items-center form-control mb-10">
                <div>
                    <label className="label">
                        <span className="label-text">顧客検索</span>
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="name or email"
                            className="input input-bordered"
                            value={search}
                            onChange={onChangeSearch}
                        />
                        <button
                            className="btn btn-square"
                            onClick={searchUsers}
                            type="button"
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
                </div>
                <div>
                    {selectUser && <div className="my-4">{selectUser}</div>}
                </div>
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
                                                            <th>Email</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map((u: any) => (
                                                            <tr key={u.id}>
                                                                <td>{u.id}</td>
                                                                <td>
                                                                    {u.name}
                                                                </td>
                                                                <td>
                                                                    {u.email}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() =>
                                                                            slectUserChild(
                                                                                u
                                                                            )
                                                                        }
                                                                        type="button"
                                                                        className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    >
                                                                        選択
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
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
