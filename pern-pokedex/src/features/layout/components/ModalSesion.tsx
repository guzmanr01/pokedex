
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Modal, Switch } from '@mantine/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCrearUsuario, useIniciarSesion } from '../../pokemonDetalles/hooks/useRegistro'
import ButtonCustom from './ButtonCustom'
import { useUserStore, type UserDTO } from '../store/useStore'
import { IconCheck, IconX } from '@tabler/icons-react'
import Notificacion from './Noticacion.component'

const LOGIN = z.object({
    username: z.string().min(5, 'Usuario no valido'),
    contrasena: z.string().min(8, 'Contraseña no valida')
})

type formValues = z.infer<typeof LOGIN>

export default function ModalSesion({ onOpened, onClose }: { onOpened: boolean, onClose: () => void }) {
    const [sesion, setSesion] = useState(false)

    const { mutate } = useIniciarSesion();
    const { mutate: crearUsuario } = useCrearUsuario();
    const { usuario, setUser } = useUserStore();
    const form = useForm<formValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: '',
            contrasena: ''
        }
    })

    // false iniciar sesion
    // true registrar
    const [typeLogin, setTypeLogin] = useState<boolean>(false)
    const checkIcon = <IconCheck size={20} />;

    const [noti, setNoti] = useState<boolean>(false);
    const xIcon = <IconX size={20} />;
    const onSubmit = (data: formValues) => {
        
        if(typeLogin){ //sesion
            crearUsuario(data, {
                onSuccess(response) {
                    console.log(response);
                    form.reset();

                    setNoti(true);
                    setTimeout(()=> setNoti(false), 4500);
                }
            });
        }else{
            mutate(data, {
                onSuccess: (response: UserDTO) => {
                    console.log("usuario login:", response);
                    setSesion(true);
                    setUser(response);
                    form.reset();

                    setNoti(true);
                    setTimeout(()=> setNoti(false), 4500);
                }
            });
        }
    }
    return (
        <Modal onClose={onClose} opened={onOpened}
            title="Formulario">

            <Switch
                checked = {typeLogin}
                color="green"
                label={ typeLogin ? 'Registrar': "Iniciar sesion" }
                onClick={() => setTypeLogin(!typeLogin)}
            />
                
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Input className='p-5' placeholder="Ingresar usuario" {...form.register('username')} error={form.formState.errors.username?.message} />
                <Input  className='p-5' type="password" placeholder="Ingresar contraseña" {...form.register('contrasena')} error={form.formState.errors.contrasena?.message} />
                <ButtonCustom type="submit" color={typeLogin ? 'primary' : 'secondary'}  label={typeLogin ? 'Registrar' : 'Iniciar Sesión'} />
            </form>

            {/* icon={xIcon} color="red" */}
            {noti && <Notificacion 
            message={typeLogin ? "Usuario registrado correctamente." : "Sesion iniciada correctamente."}></Notificacion>}


            

        </Modal>
    )
}
