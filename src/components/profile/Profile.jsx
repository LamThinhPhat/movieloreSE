import './profile.scss'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Information from './information/Information';
import Password from './password/Password';
import Favorite from './favorite/Favorite';

function Profile(props) {
    const [section, setSection] = useState('');
    const location = useLocation();
    const { request } = location.state;

    useEffect(() => {
        setSection(request);
    }, [request])
    return (
        <div className='profile-container'>

            <div className="profile-menu">
                <div className={section === 'information' ? 'profile-menu-item active' : 'profile-menu-item'} onClick={e => setSection('information')}>Tài khoản</div>
                <div className={section === 'password' ? 'profile-menu-item active' : 'profile-menu-item'} onClick={e => setSection('password')}>Mật khẩu</div>
                <div className={section === 'favorite' ? 'profile-menu-item active' : 'profile-menu-item'} onClick={e => setSection('favorite')}>Yêu thích</div>
            </div>

            <div className="profile-content">
                {section === 'information' && <Information />}
                {section === 'password' && <Password />}
                {section === 'favorite' && <Favorite />}
            </div>

        </div>
    )
}

export default Profile;
