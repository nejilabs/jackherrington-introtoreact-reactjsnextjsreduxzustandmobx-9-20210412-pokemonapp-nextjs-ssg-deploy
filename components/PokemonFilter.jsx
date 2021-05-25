import { observer } from 'mobx-react'
import store from '../src/store'

import Styled from "@emotion/styled"

const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = () => {
  return (
    <Input type="text" value={store.filter} onChange={(e) => store.setFilter(e.target.value)} />
  )
}

export default observer(PokemonFilter)
