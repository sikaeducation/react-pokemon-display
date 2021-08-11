import { useState, useEffect } from "react"
import "./PokemonCard.css"

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        setError(false)
        setPokemon(pokemon)
      }).catch(error => setError(true))
  }, [name])

  const titleCasedName = pokemon.name && titleCase(pokemon.name)

  return (
    <div className="PokemonCard">
      {
        pokemon.name
          ? <>
            <h2>{titleCasedName}</h2>,
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </>
          : <span>Loading...</span>
      }
      {
        error
          ? <span>There was a problem loading this Pokemon.</span>
          : null
      }
    </div>
  )
}

export default PokemonCard

function titleCase(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ")
}
