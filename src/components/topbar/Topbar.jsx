import { PostAdd, Notifications, Face } from '@material-ui/icons'
import "./topbar.scss"
import SearchBar from "./searchBar/SearchBar"
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { Context, movieActions } from "../../store"
import { userActions } from '../../store'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col } from 'react-bootstrap'


function Topbar() {
    const { dispatch } = useContext(Context.movieContext);
    const { userState, userDispatch } = useContext(Context.userContext);

    const [isShowNoticfication, setIsShowNotification] = useState(false);

    const [unread, setUnread] = useState(0);


    const handleResetPost = () => {
        dispatch(movieActions.resetPostList());
    }

    const handleLogOut = () => {
        userDispatch(userActions.logOut());
    }

    const handleCloseNotification = () => {
        setIsShowNotification(false);
        userState.notification.forEach(item => {
            if (item.status) {
                axios.get(`https://movielore-database.herokuapp.com/user/notification/read/${userState.id}`)
                    .then(res => {
                        if (res.data.error === 0) {
                            userDispatch(userActions.readAllNotification());
                            setUnread(0);
                            return;
                        }
                    })
                    .catch(err => console.log(err))

            }
        })
    }

    const handleShowNotification = () => setIsShowNotification(true)

    useEffect(() => {
        let amount = 0;
        userState.notification.forEach(item => {
            if (item.status) amount++;
        })
        setUnread(amount);
    }, [userState.notification])

    return (
        <div className="topbar-container">
            <Col>
                <div className="left-topbar">
                    <Link className="main-logo" to="/" onClick={handleResetPost}>MovieLore</Link>
                </div>
            </Col>

            <Col>
                <div className="middle-topbar">
                    <SearchBar />
                </div>
            </Col>

            <Col>
                <div className="right-topbar">
                    {userState.role && <div className="topbar-icon">
                        <Link to="/add" className="add-icon"><PostAdd /></Link>
                    </div>}
                    {userState.name && <div className={userState.role ? "topbar-icon" : "topbar-icon notic-icon"}>
                        <Notifications className={isShowNoticfication || unread > 0 ? 'notification-icon white-notification' : 'notification-icon'} tabIndex={0} onClick={isShowNoticfication ? handleCloseNotification : handleShowNotification} onBlur={() => handleCloseNotification} />
                        {unread > 0 &&
                            <span className="topbar-icon-badge" onClick={isShowNoticfication ? handleCloseNotification : handleShowNotification}>{unread}</span>}

                        {/* dropbox notification */}
                        {isShowNoticfication &&
                            <ul className="dropbox-notification">
                                {userState.notification.length > 0 ?
                                    userState.notification.map((item, index) => {
                                        if (item.status) return <li key={index} className="dropbox-notification-item unread-item">{item.content}</li>
                                        else return <li key={index} className="dropbox-notification-item">{item.content}</li>
                                    })
                                    :
                                    <li className="dropbox-notification-item no-notification">Bạn chưa có thông báo nào</li>
                                }
                            </ul>
                        }
                    </div>
                    }

                    {userState.name ?
                        <div className="topbar-login">
                            <span><Face className="topbar-user-icon" /></span>
                            <span className="topbar-user-name">{userState.name}</span>

                            {/* dropbox */}
                            <div className="topbar-login-dropbox">
                                <Link to={{ pathname: '/profile', state: { request: 'information' } }} className="topbar-dropbox-item">Tài khoản</Link>
                                <Link to={{ pathname: '/profile', state: { request: 'password' } }} className="topbar-dropbox-item">Mật khẩu</Link>
                                <Link to={{ pathname: '/profile', state: { request: 'favorite' } }} className="topbar-dropbox-item">Yêu thích</Link>
                                <Link to='#' className="topbar-dropbox-item" onClick={handleLogOut}>Đăng xuất</Link>
                            </div>
                        </div>
                        :
                        <div className="topbar-register">
                            <Link to="/login" className="topbar-register-title">Đăng nhập</Link>
                        </div>
                    }

                </div>
            </Col>
        </div>
    )
}

export default Topbar;