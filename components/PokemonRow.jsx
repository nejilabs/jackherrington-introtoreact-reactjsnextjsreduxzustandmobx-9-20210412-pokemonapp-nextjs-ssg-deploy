import Link from 'next/link'
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

import PokemonType from '../src/PokemonType'

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr>
      <td>
        <Link href={`pokemon/${pokemon.id}`}>
          <a>{pokemon.name.english}</a>
        </Link>
      </td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClick(pokemon)}
        >
          More Information
        </Button>
      </td>
    </tr>
  </>
);

PokemonRow.propTypes = {
  pokemons: PokemonType,
};

export default PokemonRow;