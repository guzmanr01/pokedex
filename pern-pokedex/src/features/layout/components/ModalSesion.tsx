
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Modal } from '@mantine/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCrearUsuario, useIniciarSesion } from '../../pokemonDetalles/hooks/useRegistro'
import ButtonCustom from './ButtonCustom'

const LOGIN = z.object({
    username: z.string().min(5, 'Usuario no valido'),
    contrasena: z.string().min(8, 'Contraseña no valida')
})

type formValues = z.infer<typeof LOGIN>

export default function ModalSesion({ onOpened, onClose }: { onOpened: boolean, onClose: () => void }) {
    const [sesion, setSesion] = useState(false)

    const { mutate } = useIniciarSesion();
    const { mutate: crearUsuario } = useCrearUsuario();

    const form = useForm<formValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: '',
            contrasena: ''
        }
    })

    const onSubmit = (data: formValues) => {
        sesion ? crearUsuario(data) : mutate(data);        
    }

    return (
        <Modal onClose={onClose} opened={onOpened}
            title={sesion ? 'Registrarse' : 'Iniciar Sesión'}>
                
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Input className='p-5' placeholder="Ingresar usuario" {...form.register('username')} error={form.formState.errors.username?.message} />
                <Input  className='p-5' type="password" placeholder="Ingresar contraseña" {...form.register('contrasena')} error={form.formState.errors.contrasena?.message} />
                {/* <ButtonCustom type='submit' color="primary" label="Iniciar sesión" /> */}
                <ButtonCustom type="submit" color={sesion ? 'primary' : 'secondary'} onClick={() => setSesion(sesion)} label={sesion ? 'Iniciar Sesión' : 'Registrarse'} />
            </form>

        </Modal>
    )
}
