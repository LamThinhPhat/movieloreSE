import './register.scss'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Register() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: ""
    })

    const [warn, setWarn] = useState("");

    const handleCreateAccount = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            name: "",
            email: "",
            password: "",
        }

        for (const item in info) {
            if (info[item] === "") {
                setIsLoading(false);
                setWarn('Vui lòng điền đẩy đủ thông tin');
                setTimeout(() => setWarn(''), 3000);
                return;
            } else {
                data[item] = info[item];
            }
        }

        if (info.password.length < 8) {
            setIsLoading(false);
            setWarn('Mật khẩu phải dài ít nhất 8 kí tự');
            setTimeout(() => setWarn(''), 3000);
            return;
        }

        if (info.password !== info.rePassword) {
            setIsLoading(false);
            setWarn('Vui lòng kiểm tra lại mật khẩu');
            setTimeout(() => setWarn(''), 3000);
            return;
        }

        axios({
            url: 'https://movielore-database.herokuapp.com/user',
            method: 'POST',
            data
        })
            .then(res => {
                setIsLoading(false);
                const { code } = res.data;
                if (parseInt(code) === 1) {
                    setWarn('Email đã có người sử dụng');
                    setTimeout(() => setWarn(''), 3000);
                    return;
                } else {
                    history.goBack();
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="register-container">
            <h1>Tạo tài khoản</h1>

            <form onSubmit={e => handleCreateAccount(e)} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                <label htmlFor="register-lastName-input">Tên:</label>
                <input type="text" id="register-name-input" name="name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} placeholder="Unarmed Army" autoComplete="on" required />

                <label htmlFor="register-email-input">Email:</label>
                <input type="email" id="register-email-input" name="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} placeholder="unarmed@army.com" autoComplete="on" required />

                <label htmlFor="register-password-input">Mật khẩu:</label>
                <input type="password" id="register-password-input" name="password" value={info.password} onChange={(e) => setInfo({ ...info, password: e.target.value })} autoComplete="on" required />

                <label htmlFor="register-rePassword-input">Nhập lại mật khẩu:</label>
                <input type="password" id="register-rePassword-input" name="rePassword" value={info.rePassword} onChange={(e) => setInfo({ ...info, rePassword: e.target.value })} autoComplete="on" required />

                <div id="register-alert">{warn}</div>
                {isLoading ?

                    <div className="register-loader-containter">
                        <div className="loader"></div>
                    </div>
                    :
                    <div className="register-button">
                        <button onClick={() => history.goBack()}>Quay lại</button>
                        <button value="submit">Đăng ký</button>
                    </div>
                }

            </form>
        </div>
    )
}

export default Register;
