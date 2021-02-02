import { connect } from "react-redux";
import Login from "../pages/Login";
import { setIsAuth } from "../redux-store/actions";

const mapStateToProps = ({ errorLoading: { isLoading }}) => ({
  isLoading
});

const mapDispatchToProps = (dispatch) => ({
  setIsAuth: (isAuth) => dispatch(setIsAuth(isAuth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
