// START: IMPORTS
import styled from "@emotion/styled";
import { CssBaseline } from "@material-ui/core";

import { observer } from 'mobx-react'
import store from '../src/store'

import PokemonInfo from "../components/PokemonInfo";
import PokemonFilter from "../components/PokemonFilter";
import PokemonTable from "../components/PokemonTable";
// END: IMPORTS

// START: STYLED COMPONENTS
const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;
// END: STYLED COMPONENTS



// START: COMPONENT ---
const Home = () => {
  // Start: Templates
  if (!store.pokemons) {
    return <div>Loading data</div>;
  }
  return (
    <PageContainer>
      <CssBaseline />
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter />
          <PokemonTable />
        </div>
        <PokemonInfo />
      </TwoColumnLayout>
    </PageContainer>
  );
  // End: Templates
}
// END: COMPONENT ---

export default observer(Home);