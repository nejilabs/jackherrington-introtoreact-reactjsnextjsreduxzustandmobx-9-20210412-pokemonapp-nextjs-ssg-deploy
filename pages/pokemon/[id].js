import { useRouter } from "next/router";
import { observer } from "mobx-react";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import styled from "@emotion/styled";

import store from "../../src/store";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TypeHeader = styled.span`
  font-weight: bold;
`;

export async function getStaticPaths() {
  const pokemons = require('../../src/pokemon.json')
  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        id: pokemon.id.toString()
      }
    })),
    fallback: false
  };
}


export async function getStaticProps(context) {
  const pokemons = require('../../src/pokemon.json')
  const pokemon = pokemons.find((p) => p.id === parseInt(context.params.id));
  return {
    props: {
      pokemon
    },
  }
}

export default ({ pokemon }) => {
  const router = useRouter();

  return (
    <PageContainer>
      <CssBaseline />

      <div>
        {pokemon && (
          <>
            <h1>{pokemon.name.english}</h1>
            <p>
              <TypeHeader>Type:</TypeHeader> {" " + pokemon.type.join(", ")}
            </p>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(pokemon.base).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{pokemon.base[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </PageContainer>
  );
};