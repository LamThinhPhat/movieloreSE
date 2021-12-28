import './login.scss'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

function Login() {
    const history = useHistory();

    const handleValidate = () => {
        // chưa xog
        axios({
            url: 'http://localhost:4000/users',
            method: 'GET',

        })
            .then(res => console.log(res.data))
            .then(history.push('/login'))
            .catch(error => console.log(error))
    }

    return (
        <div className="login-container">
            <h1>Đăng nhập</h1>

            <form onSubmit={handleValidate} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                <label htmlFor="login-email-input">Email:</label>
                <input type="email" id="login-email-input" required autoComplete="on" name="email" />

                <label htmlFor="login-password-input">Mật khẩu:</label>
                <input type="password" id="login-password-input" required autoComplete="on" name="password" />

                <div className="forget-password">Quên mật khẩu?</div>
                <div className="login-button">
                    <button onClick={() => history.goBack()}>Quay lại</button>
                    <button value="Submit">Đăng nhập</button>
                </div>
            </form>

            <p>Hoặc</p>

            <Link to="/register" className="register-account">Tạo tài khoản</Link>


        </div>
    )
}

export default Login;