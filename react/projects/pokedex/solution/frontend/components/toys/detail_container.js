import { connect } from 'react-redux';
import ToyDetail from './detail';

const mapStateToProps = (state, ownProps) => {
  const { params: {toyId} } = ownProps;
  const toy = state.pokemonDetail.toys[toyId] || {};

  return { toy };
};

export default connect(
  mapStateToProps,
  null
)(ToyDetail);
