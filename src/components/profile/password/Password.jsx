import './password.scss'
import { useState, useContext } from 'react'
import { Context, userActions } from '../../../store';
import bcrypt from 'bcryptjs';
import axios from 'axios';


function Password() {
    const [warn, setWarn] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        rePassword: '',
    })

    const { userState, userDispatch } = useContext(Context.userContext);

    const handleChangePassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!bcrypt.compareSync(password.oldPassword, userState.password)) {
            setIsLoading(false);
            setWarn('Mật khẩu hiện tại không chính xác');
            setTimeout(() => setWarn(''), 2000);
        } else if (password.newPassword.length < 8) {
            setIsLoading(false);
            setWarn('Mật khẩu phải chứ ít nhất 8 kí tự');
            setTimeout(() => setWarn(''), 2000);
        } else if (password.newPassword !== password.rePassword) {
            setIsLoading(false);
            setWarn('Mật khẩu nhập lại không khớp');
            setTimeout(() => setWarn(''), 2000);
        } else {
            axios.post(`https://movielore-database.herokuapp.com/user/password/${userState.id}`, { newPass: password.newPassword })
                .then(res => {
                    if (!res.data.code) {
                        setIsLoading(false);
                        setSuccess('Đổi mật khẩu thành công');
                        setPassword({ oldPassword: '', rePassword: '', newPassword: '' })
                        setTimeout(() => setSuccess(''), 2000);
                        userDispatch(userActions.storeNewPass(res.data.password))
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <form className="password-container" onSubmit={e => handleChangePassword(e)}>
            <h1>Đổi mật khẩu</h1>

            <div className="password-label" >
                <label>Mật khẩu hiện tại:</label>
                <label>Mật khẩu mới:</label>
                <label>Nhập lại mật khẩu:</label>
            </div>
            <div className="password-content">
                <input type="password" name="oldPassword" required value={password.oldPassword} onChange={e => setPassword({ ...password, oldPassword: e.target.value })} autoComplete='on' />
                <input type="password" name="newPassword" required value={password.newPassword} onChange={e => setPassword({ ...password, newPassword: e.target.value })} autoComplete='on' />
                <input type="password" name="rePassword" required value={password.rePassword} onChange={e => setPassword({ ...password, rePassword: e.target.value })} autoComplete='on' />
            </div>
            <div className='clearfix'></div>

            {isLoading ? <div className="loader"></div> :
                <>
                    <div className='warning-password'>{warn}</div>
                    <div className='success-password'>{success}</div>
                    <input type="submit" value="Đổi" className="password-button" />
                </>}
        </form>
    )
}

export default Password;
