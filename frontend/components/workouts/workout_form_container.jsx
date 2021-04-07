import {connect} from 'react-redux';
import { createWorkout } from '../../actions/workout_actions';
import { fetchRoutes } from '../../actions/routes_action';
import WorkoutForm from './workout_form'

const mstp = (store) => {
  return {
    workout: {title:'',description:'',date:'',time:'', run_type:''},
    routes: Object.values(store.entities.routes),
    session: store.session,
  };
};

const mdtp = dispatch => {
  return {
    createWorkout: workout => dispatch(createWorkout(workout)),
    fetchRoutes: id => dispatch(fetchRoutes(id))
  }
}

export default connect(mstp,mdtp)(WorkoutForm);