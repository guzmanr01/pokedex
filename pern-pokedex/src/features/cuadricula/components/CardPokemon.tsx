import { ActionIcon } from "@mantine/core";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import { IconHeart, IconWalk } from "@tabler/icons-react";
import useFavoritos from "../hooks/useFavoritos";

interface CardPokemonProps {
  pokemon: Pokemon,
  isFav?: boolean
  callback?: (pokemon: Pokemon) => void,
  callbackButton?: (pokemon: Pokemon) => void
  callbackE?: (pokemon: Pokemon) => void
}

export default function CardPokemon({ pokemon, callback, isFav=false, callbackButton, callbackE }: CardPokemonProps) {
  // const {agregar} =  useFavoritos()
  const { nombre, imagen } = pokemon;

  return (
    <div
      key={nombre}
      className="bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center"
      onClick={() => {
        if (callback) callback(pokemon)
      }}>

      <h2>{nombre.toUpperCase()}</h2>
      <img src={imagen} alt={nombre} />
 
      <ActionIcon onClick={() => {if(callbackButton) callbackButton(pokemon)}}
        variant={!isFav ? 'outline' : ''}
        size="sm">
        <IconHeart />
      </ActionIcon>
 
      <ActionIcon onClick={() => {if(callbackE) callbackE(pokemon)}}
        size="sm">
        <IconWalk />
      </ActionIcon>
    </div>
  );
}
