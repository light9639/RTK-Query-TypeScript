import { useGetPokemonByNameQuery } from './services/pokemon'
import React from 'react'

interface PokeType {
  name: string
  pollingInterval: number
}

export default function Pokemon({ name, pollingInterval }: PokeType): JSX.Element {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(name, { pollingInterval })

  if (error) return (<>Oh no, there was an error</>)

  if (isLoading) return (<>Loading...</>)

  return (
    <div className='Content_Box'>
      <h3>
        {data.species.name} {isFetching ? '...' : ''}
      </h3>
      <img src={data.sprites.front_shiny} alt={data.species.name} />
    </div>
  )
}