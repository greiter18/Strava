import {connect} from 'react-redux';
import { createRoute } from '../../actions/routes_action';
import RouteForm from './routes_form'

const mstp = (store) => {
  console.log('container------',store)
  debugger
  return {
    session: store.session,
    route :{}
  };
};

const mdtp = dispatch => {
  return {
    createRoute: route => dispatch(createRoute(route))
  }
}

export default connect(mstp,mdtp)(RouteForm);