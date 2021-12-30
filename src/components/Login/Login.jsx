import './login.scss'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { useState, useContext } from 'react';
import { Context } from '../../store';
import { userActions } from '../../store';

function Login() {
    const { userDispatch } = useContext(Context.userContext);


    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [warn, setWarn] = useState('');
    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    const handleValidate = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios({
            url: 'https://movielore-database.herokuapp.com/user/authenticate',
            method: 'POST',
            data: info
        })
            .then(res => {
                setIsLoading(false);
                if (res.data.code) {
                    setWarn('Mật khẩu không chính xác');
                    setTimeout(() => setWarn(''), 3000);
                    return;
                } else {
                    userDispatch(userActions.StoreAccount(res.data));
                    history.goBack();
                }
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                setWarn('Lỗi hệ thống, mời thử lại');
                setTimeout(() => setWarn(''), 3000);
            })
    }

    return (
        <div className="login-container">
            <h1>Đăng nhập</h1>

            <form onSubmit={e => handleValidate(e)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                <label htmlFor="login-email-input">Email:</label>
                <input type="email" id="login-email-input" required autoComplete="on" name="email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} />

                <label htmlFor="login-password-input">Mật khẩu:</label>
                <input type="password" id="login-password-input" required autoComplete="on" name="password" value={info.password} onChange={e => setInfo({ ...info, password: e.target.value })} />

                <div className="forget-password">Quên mật khẩu?</div>

                <div id="login-alert">{warn}</div>
                {isLoading ? <div className="login-loader-containter">
                    <div className="loader"></div>
                </div>
                    :
                    <div className="login-button">
                        <button onClick={() => history.goBack()}>Quay lại</button>
                        <button value="submit">Đăng nhập</button>
                    </div>}
            </form>
            <p>Hoặc</p>
            <Link to="/register" className="register-account">Tạo tài khoản</Link>
        </div>
    )
}

export default Login;
