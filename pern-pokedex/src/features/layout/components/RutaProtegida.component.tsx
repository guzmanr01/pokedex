import { data } from "react-router-dom";
import { useUserStore } from "../store/useStore"

interface RutaProtegida{
    children: React.ReactNode
}

export default function RutaProtegida({children}: RutaProtegida) {

    const usuario = useUserStore((state)=> state.usuario);

    if(!usuario){
        throw data({message: "No autorizado"}, {status: 401})
    }

  return (
    <>{children}</>
  )
}
