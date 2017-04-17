import { connect } from 'react-redux';
import PokemonIndex from './pokemon_index';
import { requestAllPokemon } from '../../actions/pokemon_actions';
import { selectAllPokemon } from '../../reducers/selectors';

// import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  pokemon: selectAllPokemon(state),
  loading: state.loading.indexLoading
});

const mapDispatchToProps = dispatch => ({
  requestAllPokemon: () => dispatch(requestAllPokemon())
});

// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PokemonIndex));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonIndex);
