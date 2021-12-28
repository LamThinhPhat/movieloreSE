import './information.scss'
import { useState } from 'react'
import { ArrowUpward } from '@material-ui/icons'


function Information() {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="information-container">
            <h1>Thông tin tài khoản</h1>

            <div className="information-label">
                <label>Tên:</label>
                <label>Email:</label>
                <label>Chức vụ:</label>
            </div>

            {isEdit ? <form>
                <div className="information-content">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </div>

                <div className="clearfix"></div>
                <input type="button" value="Hủy" className='information-toggle-button cancel-change' onClick={() => setIsEdit(false)} />
                <input type="submit" value="Lưu" className='information-toggle-button change-info' />
            </form>
                :
                <>
                    <div className="information-content">
                        <div>nhan</div>
                        <div>nhahoang@gmail.com</div>
                        <div>Thành viên <span><ArrowUpward /></span></div>
                    </div>

                    <div className='clearfix'></div>

                    <input type="submit" value="Sửa thông tin" className="information-toggle-button start-change" onClick={() => setIsEdit(true)} />
                </>
            }


        </div>
    )
}

export default Information;