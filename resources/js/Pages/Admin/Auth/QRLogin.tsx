import QRReader, { QRCode } from "@/Components/QRReader ";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "@inertiajs/inertia-react";

function QRLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        uuid: "",
    });

    const [stopOnRecognize, setStopOnRecognize] = React.useState(true);
    const [qrParam, setQRParam] = useState({
        width: 500,
        height: 500,
        pause: true,
    });

    //const [code, setCode] = useState("");

    const onRecognizeCode = (e: QRCode) => {
        setData("uuid", e.data);
        //setCode(e.data);
        if (stopOnRecognize) {
            setQRParam((e) => {
                return { ...e, pause: true };
            });
        }
    };

    const toggleVideoStream = () => {
        setQRParam((e) => {
            return { ...e, pause: !e.pause };
        });
    };

    const login = (e: any) => {
        e.preventDefault();
        post("auth/qr_login");
    };

    return (
        <div className="App">
            <Stack alignItems="center" pt={2} mx={10}>
                <QRReader {...qrParam} gecognizeCallback={onRecognizeCode} />
            </Stack>
            <div>
                {/* <label>
                    <input
                        type="hidden"
                        name="rdo"
                        value="0"
                        onChange={(e) =>
                            setStopOnRecognize(e.target.value === "0")
                        }
                        checked={stopOnRecognize}
                    />
                </label>
                <label>
                    <input
                        type="radio"
                        name="rdo"
                        value="1"
                        onChange={(e) =>
                            setStopOnRecognize(e.target.value === "0")
                        }
                        checked={!stopOnRecognize}
                    />
                    認識時も処理継続
                </label> */}
                <Stack alignItems="center" pt={2}>
                    <Button variant="contained" onClick={toggleVideoStream}>
                        {qrParam.pause ? "スキャン開始" : "スキャン停止"}
                    </Button>
                    <Stack pt={4}>
                        <Button
                            disabled={data.uuid === ""}
                            variant="contained"
                            onClick={login}
                        >
                            注文を開始する
                        </Button>
                    </Stack>
                </Stack>
            </div>
        </div>
    );
}

export default QRLogin;
