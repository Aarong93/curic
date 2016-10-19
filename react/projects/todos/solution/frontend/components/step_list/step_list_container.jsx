import { connect } from 'react-redux';
import StepList from './step_list';
// Actions
import { stepsById } from '../../reducers/selectors';
import { createStep } from '../../actions/step_actions';

const mapStateToProps = (state, { todo_id }) => ({
  steps: stepsById(state, todo_id),
  todo_id
});

const mapDispatchToProps = dispatch => ({
  createStep: step => dispatch(createStep(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepList);
