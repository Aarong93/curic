import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SessionForm from './session_form';
import { login, logout, signup } from '../../actions/session_actions';


const mapStateToProps = ({ session }) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;

  return {
    processForm: user => dispatch(processForm(user)),
    push: (location) => dispatch(push(location)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
