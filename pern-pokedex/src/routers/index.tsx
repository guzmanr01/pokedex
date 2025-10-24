
import { createBrowserRouter }from "react-router-dom"
import Pokedex from "../features/cuadricula/Pokedex.component";
import App from "../App";
import Equipo from "../features/equipo/components/Equipo.component";
import Error from "../errors/Error.component";
import { EjemploUseReducer } from "../features/ejemplosHooks/EjemploUseReducer";
import RutaProtegida from "../features/layout/components/RutaProtegida.component";

export const router = createBrowserRouter([{

    path: "/",
    Component: App,
    errorElement: <Error/>,
    children: [
        {
            path: "/",
            Component: Pokedex
        },{
            path: "/equipo",
            element: (<RutaProtegida>
                <Equipo/>
            </RutaProtegida>)
        },{
            path: "/batalla",
            Component: EjemploUseReducer
        }
    ]



}]);