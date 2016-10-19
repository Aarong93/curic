import History from '../util/history';

import { fetchAllPokemon,
         fetchSinglePokemon,
         postPokemon } from '../util/api_util';

import { receiveAllPokemon,
			   receiveSinglePokemon,
         receiveNewPokemon,
         REQUEST_ALL_POKEMON,
         REQUEST_SINGLE_POKEMON,
         CREATE_POKEMON,
         receivePokemonErrors } from '../actions/pokemon_actions';


export default ({dispatch}) => next => action => {
  const receivePokemonSuccess = data => dispatch(receiveAllPokemon(data));
  const receiveSinglePokemonSuccess = data => dispatch(receiveSinglePokemon(data));
  const receiveNewPokemonSuccess = data => {
    dispatch(receiveNewPokemon(data));
    History.push(`/pokemon/${data.id}`);
  };
  const pokemonFailure = errors => {
    dispatch(receivePokemonErrors(errors.responseJSON));
  }

  switch (action.type) {
    case REQUEST_ALL_POKEMON:
      fetchAllPokemon(receivePokemonSuccess);
      next(action);
      break;
    case REQUEST_SINGLE_POKEMON:
      fetchSinglePokemon(action.id, receiveSinglePokemonSuccess);
      next(action);
      break;
    case CREATE_POKEMON:
      postPokemon(action.pokemon, receiveNewPokemonSuccess, pokemonFailure);
      next(action);
      break;
    default:
      next(action);
  }
};
