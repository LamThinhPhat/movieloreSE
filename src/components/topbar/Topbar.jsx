import { PostAdd, Notifications, Face } from '@material-ui/icons'
import "./topbar.scss"
import SearchBar from "./searchBar/SearchBar"
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { Context } from "../../store"
import { actions } from '../../store'

function Topbar() {
    const { dispatch } = useContext(Context.movieContext);

    const handleResetPost = () => {
        dispatch(actions.resetPostList());
    }

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
                <div className="topbar-login">
                    <span><Face className="topbar-user-icon" /></span>
                    <span className="topbar-user-name">Nhân</span>

                    {/* dropbox */}
                    <div className="topbar-login-dropbox">
                        <div className="topbar-dropbox-item">Sửa thông tin</div>
                        <div className="topbar-dropbox-item">Đổi mật khẩu</div>
                        <div className="topbar-dropbox-item">Yêu thích</div>
                        <div className="topbar-dropbox-item">Đăng xuất</div>
                    </div>
                </div>

                <div className="topbar-register">
                    <Link to="/login" className="topbar-register-title">Đăng nhập</Link>
                </div>



            </div>
        </div>
    )
}

export default Topbar;