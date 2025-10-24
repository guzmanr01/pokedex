import { useReducer } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import { equipoReducer, estadoInicial, type PokemonTeam } from "../../ejemplosHooks/reducers/PokeTeamReducer";
import { Grid } from "@mantine/core";

export default function Equipo() {

    const [state, dispatch] = useReducer(equipoReducer, estadoInicial);
    
    const agregarPokemon = (pokemon: Pokemon) => {
        const nuevoPokemon: PokemonTeam = {
        ...pokemon,
        vida: 100,
        };

        dispatch({ type: "AGREGAR_POKEMON", payload: nuevoPokemon });
    };

    return (
    <>
      <div className="bg-gray-100 rounded-lg mb-5 p-5 m-10">
        <h3 className="text-xl font-bold mb-3">
          🎒 Equipo Pokémon ({state.equipo.length}/6)
          {state.enBatalla && " - 🔥 EN BATALLA"}
        </h3>

            {state.equipo.length === 0 && (
            <p className="text-gray-500 italic">
                Tu equipo está vacío. ¡Agrega algunos Pokémon!
            </p>
            )}

            <div className="flex flex-col gap-3 p-10">
                <Grid>
          {state.equipo.map((pokemon) => {
            const esActivo = pokemon.id === state.pokemonActivo;
            const vidaPorcentaje = (pokemon.vida / 100) * 100;

            return (
                <Grid.Col span={4}>
              <div
                key={pokemon.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  esActivo
                    ? "bg-green-100 border-2 border-green-500"
                    : "bg-white border border-gray-300"
                }`}
              >
                {/* Imagen del Pokémon */}
                <img
                  src={pokemon.imagen}
                  alt={pokemon.nombre}
                  className="w-16 h-16"
                />

                {/* Información */}
                <div className="flex-1">
                  <h4 className="mb-1 capitalize flex items-center gap-2">
                    <span className="font-semibold">{pokemon.nombre}</span>
                    {esActivo && (
                      <span className="text-green-600">⭐ Activo</span>
                    )}
                  </h4>

                  {/* Barra de vida */}
                  <div className="w-full bg-gray-200 rounded-full overflow-hidden h-5">
                    <div
                      className={`h-full flex items-center justify-center text-white text-sm font-bold transition-all ${
                        pokemon.vida > 50
                          ? "bg-green-500"
                          : pokemon.vida > 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${vidaPorcentaje}%` }}
                    >
                      {pokemon.vida} HP
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "SELECCIONAR_POKEMON_ACTIVO",
                        payload: pokemon.id,
                      })
                    }
                    disabled={esActivo || state.enBatalla}
                    className={`px-4 py-2 text-white rounded-md transition-opacity ${
                      esActivo ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                    } ${
                      esActivo || state.enBatalla
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {esActivo ? "Activo" : "Seleccionar"}
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVER_POKEMON", payload: pokemon.id })
                    }
                    disabled={state.enBatalla}
                    className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                      state.enBatalla
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Liberar
                  </button>
                </div>
              </div>
              </Grid.Col>
            );
          })}
          </Grid>
        </div>
    </div>
        <Cuadricula callbackEquipo={(pokemon) => agregarPokemon(pokemon)}/>
    </>
    )
}
