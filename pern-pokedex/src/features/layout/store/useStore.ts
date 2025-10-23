import { json } from 'zod'
import { create } from 'zustand'

export interface UserDTO{
    id:number,
    username: string
}

type UserStore = {
    usuario: UserDTO | null,
    setUser : (usuario: UserDTO | null) => void
    logout: () => void
}
// https://zustand-demo.pmnd.rs/
export const useUserStore = create<UserStore>()((set) => {

    const usuarioLocal = localStorage.getItem("usuario");
    const initUser = usuarioLocal ? JSON.parse(usuarioLocal) : null;

    console.log("init usuer: ", initUser);
    
    return {
        usuario: initUser,
        setUser: (usuario) => {
            set({usuario})
            if(usuario){
                localStorage.setItem("usuario", JSON.stringify(usuario));
            } else {
                localStorage.removeItem("usuario");
            }            
        },
        logout: () => set({usuario:null})
    }
});
