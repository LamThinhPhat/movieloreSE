import './information.scss'
// import { ArrowUpward } from '@material-ui/icons'
import { Context, userActions } from '../../../store';
import { useContext, useState } from 'react'
import axios from 'axios';


function Information() {
    const { userState, userDispatch } = useContext(Context.userContext);
    const [newInfo, setNewInfo] = useState({
        name: userState.name,
        email: userState.email
    })

    const [isEdit, setIsEdit] = useState(false);
    const [warn, setWarn] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = () => {
        setIsEdit(false);
        setNewInfo({
            name: userState.name,
            email: userState.email
        })
    }

    const handleChangeInfo = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`https://movielore-database.herokuapp.com/user/update/${userState.id}`, newInfo)
            .then(res => {
                if (res.data.code === 1) {
                    setIsLoading(false);
                    setWarn('Email đã được sử dụng');
                    setTimeout(() => setWarn(''), 2000);
                } else {
                    userDispatch(userActions.storeNewInfo(newInfo));
                    setIsEdit(false);
                    setIsLoading(false);
                }
            })
    }


    return (
        <div className="information-container">
            <h1>Thông tin tài khoản</h1>

            <div className="information-label">
                <label>Tên:</label>
                <label>Email:</label>
                <label>Chức vụ:</label>
            </div>

            {isEdit ?
                <form onSubmit={e => handleChangeInfo(e)}>
                    <div className="information-content">
                        <input type="text" value={newInfo.name} onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })} required />
                        <input type="text" value={newInfo.email} onChange={(e) => setNewInfo({ ...newInfo, email: e.target.value })} required />
                        <div>Thành viên</div>
                    </div>
                    <div className="clearfix"></div>

                    {isLoading ? <div className="loader"></div>
                        :
                        <>

                            <div className="warning-message">{warn}</div>
                            <input type="button" value="Hủy" className='information-toggle-button cancel-change' onClick={handleBack} />
                            <input type="submit" value="Lưu" className='information-toggle-button change-info' /></>}
                </form>
                :
                <>
                    <div className="information-content">
                        <div>{userState.name}</div>
                        <div>{userState.email}</div>
                        {userState.role ? <div>Quản trị viên</div>
                            :
                            <div>Thành viên</div>}
                    </div>

                    <div className='clearfix'></div>

                    <input type="submit" value="Sửa thông tin" className="information-toggle-button start-change" onClick={() => setIsEdit(true)} />
                </>
            }
        </div>
    )
}

export default Information;