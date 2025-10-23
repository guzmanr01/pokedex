import { Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { JSX } from "react";

interface NotiProps{
    icon?: JSX.Element,
    message?: string,
    color?: string
}


export default function Notificacion(props: NotiProps) {
    const iconDefault = <IconCheck size={20} />;

    const {
        icon = iconDefault,
        message="Mensaje por default",
        color = "teal"
    } = props;

    return (
        <Notification icon={icon} color={color} title="Pokenoti" mt="md">
            {message}
        </Notification>
    )
}
