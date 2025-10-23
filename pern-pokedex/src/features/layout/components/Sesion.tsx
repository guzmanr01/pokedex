import { Avatar, Menu } from "@mantine/core";
import { useState } from "react";
import ModalSesion from "./ModalSesion";
import { useUserStore } from "../store/useStore";

export default function Sesion() {
    const [modal, setModal] = useState(false)

    return (
        <>
            <div className="mr-10">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar
                            size={50}
                            name="Roberto"
                            color="initials"
                            className="cursor-pointer"
                            allowedInitialsColors={["var(--color-secondary-600)"]}
                            styles={{
                                placeholder: {
                                    backgroundColor: "white"
                                }
                            }}
                        />
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label
                            style={{
                                color: "var(--color-primary-500)"
                            }}
                        >
                            Invitado
                        </Menu.Label>
                        <Menu.Item onClick={() => setModal(true)}
                            styles={{
                                item: {
                                    backgroundColor: "var(--color-info-200)"
                                }
                            }}
                        >
                            Iniciar sesion
                            {/* function Counter() {
                            const { count, inc } = useStore()
                            return (
                                <div>
                                <span>{count}</span>
                                <button onClick={inc}>one up</button>
                                </div>
                            )
                            } */}


                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalSesion onOpened={modal} onClose={() => setModal(false)} />
        </>
    )
}