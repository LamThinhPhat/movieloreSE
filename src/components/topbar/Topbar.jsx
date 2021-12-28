import { PostAdd, Notifications, Face } from '@material-ui/icons'
import "./topbar.scss"
import SearchBar from "./searchBar/SearchBar"
import { Link } from 'react-router-dom'
import { useContext, useState } from "react"
import { MovieContext } from "../../store"
import { actions } from '../../store'

function Topbar() {
    const { dispatch } = useContext(MovieContext);

    const handleResetPost = () => {
        dispatch(actions.resetPostList());
    }

    const [showOption, setShowOption] = useState(false);

    return (
        <div className="topbar-container">
            <div className="left-topbar">
                <Link className="main-logo" to="/" onClick={handleResetPost}>MovieLore</Link>
            </div>
            <div className="middle-topbar">
                <SearchBar />
            </div>
            <div className="right-topbar">
                <div className="topbar-icon">
                    <Link to="/add" className="add-icon"><PostAdd /></Link>
                </div>
                <div className="topbar-icon">
                    <Notifications />
                    <span className="topbar-icon-badge">2</span>
                </div>
                <div className="topbar-login" onClick={() => setShowOption(!showOption)}>
                    <span><Face className="topbar-user-icon" /></span>
                    <span className="topbar-user-name">Nhân</span>

                    {/* <span className="topbar-signup">Đăng nhập</span> */}

                    {/* dropbox */}
                    <div className="topbar-login-dropbox">
                        <div className="topbar-dropbox-item">Sửa thông tin</div>
                        <div className="topbar-dropbox-item">Đổi mật khẩu</div>
                        <div className="topbar-dropbox-item">Yêu thích</div>
                        <div className="topbar-dropbox-item">Đăng xuất</div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Topbar;