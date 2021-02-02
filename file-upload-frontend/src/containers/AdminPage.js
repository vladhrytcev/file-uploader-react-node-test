import { connect } from "react-redux";
import AdminPage from "../pages/AdminPage";
import { getLinks, uploadFiles, resetLastCreateLink, deleteLink } from "../redux-store/actions";

const mapStateToProps = ({ links: { links, lastCreated } , errorLoading: { isLoading, isAuth }}) => ({
  links, isLoading, lastCreated, isAuth
});

const mapDispatchToProps = (dispatch) => ({
  getLinks: () => dispatch(getLinks()),
  uploadFiles: (data) => dispatch(uploadFiles(data)),
  resetLastCreateLink: () => dispatch(resetLastCreateLink()),
  deleteLink: (id) => dispatch(deleteLink(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
