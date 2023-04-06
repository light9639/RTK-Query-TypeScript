# 🍪 Redux-Toolkit-Query를 이용한 예제 파일.
:octocat: 바로 가기 : https://light9639.github.io/RTK-Query-TypeScript/

![light9639 github io_RTK-Query-TypeScript_](https://user-images.githubusercontent.com/95972251/229794559-da06e64b-4922-4d2a-8113-5d3ac13882bd.png)

:sparkles: 🍪 Redux-Toolkit-Query를 이용한 예제 파일. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료.
## 🌟 Redux-Toolkit 설치
- Redux-Toolkit 설치 명령어
```bash
npm install redux react-redux @reduxjs/toolkit
# or
yarn add redux react-redux @reduxjs/toolkit
```
## ✒️ App.tsx, main.tsx, Pokemon.tsx, pokemon.ts 수정 및 작성
### ⚡ App.tsx
- `map` 반복문으로 데이터 중 일부를 가져와 화면에 생성한다.
- `select`의 `onChange` 함수를 사용하여 몇초마다 데이터를 가져올지를 정할 수 있다.
```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Pokemon from './Pokemon'

const pokemon = ['bulbasaur', 'pikachu', 'ditto', 'bulbasaur']

export default function App() {
  const [pollingInterval, setPollingInterval] = useState<number>(0)

  return (
    <div className="App">
      <div>
        <a href="https://ko.redux.js.org/introduction/getting-started/" target="_blank" rel="noreferrer">
          <img src="https://camo.githubusercontent.com/7b7f04b16cc2d2d4a32985710e4d640985337a32bbb1e60cdacede2c8a4ae57b/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f72656475782e737667" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Redux-Toolkit-Query</h1>
      <select
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div className='Content_Wrapper'>
        {pokemon.map((poke, index) => (
          <Pokemon key={index} name={poke} pollingInterval={pollingInterval} />
        ))}
      </div>
    </div>
  )
}
```
### ⚡ main.tsx
- `ApiProvider`는 리덕스쿼리에서 `pokemonApi`는 `pokemon.ts`에서 `import` 한 다음 `<App />`을 감싸면 리덕스 쿼리를 사용할 수 있다
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { pokemonApi } from './services/pokemon'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={pokemonApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
)
```
### ⚡ Pokemon.tsx
- `useGetPokemonByNameQuery`를 사용하여 로딩중일 때 에러가 났을 때 화면을 표시할 수 있다.
```typescript
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
```
### ⚡ pokemon.ts
- `createApi`, `fetchBaseQuery`를 `import` 한 다음 `pokemonApi`를 `useGetPokemonByNameQuery`로 내보내 사용한다.
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
})

// 사용할 hook를 내보내기
export const { useGetPokemonByNameQuery } = pokemonApi
```
