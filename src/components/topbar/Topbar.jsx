import { PostAdd, Notifications } from '@material-ui/icons'
import "./topbar.scss"
import SearchBar from "../searchBar/SearchBar"
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { MovieContext } from "../../store"
import { actions } from '../../store'

function Topbar() {
    const { dispatch } = useContext(MovieContext);

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
                    {/* <span className="topbar-signup">Đăng nhập</span> */}
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="" className="topbar-avatar" />
                    <span className="topbar-user-name">Nhân Hoàng</span>
                </div>

            </div>
        </div>
    )
}

export default Topbar;