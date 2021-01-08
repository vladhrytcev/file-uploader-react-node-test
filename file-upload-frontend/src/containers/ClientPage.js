import { connect } from "react-redux";
import ClientPage from "../pages/ClientPage";
import { getDownloadLink, downloadFile, downloadFolder } from "../redux-store/actions";

const mapStateToProps = ({ links: { downloadLink } , errorLoading: { isLoading }}) => ({
  downloadLink, isLoading
});

const mapDispatchToProps = (dispatch) => ({
  getDownloadLink: (id) => dispatch(getDownloadLink(id)),
  downloadFile: (path) => dispatch(downloadFile(path)),
  downloadFolder: (path) => dispatch(downloadFolder(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
