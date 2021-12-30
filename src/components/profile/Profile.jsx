import './profile.scss'
import { useState } from 'react';
import { Link, Switch, Route, BrowserRouter, useLocation } from 'react-router-dom'
import Information from './information/Information';
import Password from './password/Password';
import Favorite from './favorite/Favorite';

function Profile(props) {
    const l = useLocation().pathname;
    const [location, setLocation] = useState(l);

    return (
        <div className='profile-container'>
            <BrowserRouter>
                <div className="profile-menu">
                    <Link to='/profile' className={location === '/profile' ? 'profile-menu-item active' : 'profile-menu-item'} onClick={e => setLocation('/profile')}>Tài khoản</Link>
                    <Link to='/profile/password' className={location === '/profile/password' ? 'profile-menu-item active' : 'profile-menu-item'} onClick={e => setLocation('/profile/password')}>Mật khẩu</Link>
                    <Link to='/profile/favorite' className={location === '/profile/favorite' ? 'profile-menu-item active' : 'profile-menu-item'} onClick={e => setLocation('/profile/favorite')}>Yêu thích</Link>
                </div>

                <div className="profile-content">
                    <Switch>
                        <Route path="/profile/password">
                            <Password />
                        </Route>

                        <Route path="/profile/favorite">
                            <Favorite />
                        </Route>

                        <Route path="/profile">
                            <Information />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Profile;
