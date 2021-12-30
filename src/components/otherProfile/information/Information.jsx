import './information.scss'
import { ArrowUpward } from '@material-ui/icons'
import { Context } from '../../../store';
import { useContext, useState, useEffect } from 'react'
import axios from 'axios';


function Information(props) {
    const { userState } = useContext(Context.userContext);

    const [otherInfo, setOtherInfo] = useState({});

    useEffect(() => {
        setOtherInfo(props.otherInfo);
    }, [props.otherInfo])


    const upgradeUser = () => {
        axios.get(`https://movielore-database.herokuapp.com/user/upgrade/${props.otherInfo._id}`)
            .then(res => {
                if (!res.data.error) {
                    setOtherInfo({ ...otherInfo, role: true })
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="information-container">
            <h1>Thông tin tài khoản</h1>

            <div className="information-label">
                <label>Tên:</label>
                <label>Email:</label>
                <label>Chức vụ:</label>
            </div>

            <div className="information-content">
                <div>{otherInfo.name}</div>
                <div>{otherInfo.email}</div>
                {otherInfo.role && <div>Quản trị viên</div>}
                {!otherInfo.role && !userState.role && <div>Thành viên</div>}
                {!otherInfo.role && userState.role && <div>Thành viên <span onClick={upgradeUser}><ArrowUpward /></span></div>}
            </div>
        </div>
    )
}

export default Information;