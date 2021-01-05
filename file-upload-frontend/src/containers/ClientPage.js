import { connect } from "react-redux";
import ClientPage from "../pages/ClientPage";
import { getDownloadLink, downloadFile, downloadFolder, downloadOrOpenFile } from "../redux-store/actions";

const mapStateToProps = ({ links: { downloadLink } , errorLoading: { isLoading }}) => ({
  downloadLink, isLoading
});

const mapDispatchToProps = (dispatch) => ({
  getDownloadLink: (id) => dispatch(getDownloadLink(id)),
  downloadFile: (path) => dispatch(downloadFile(path)),
  downloadFolder: (path) => dispatch(downloadFolder(path)),
  downloadOrOpenFile: (path) => dispatch(downloadOrOpenFile(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
