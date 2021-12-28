import './comment.scss'
import { Context } from '../../../store';
import { useContext } from 'react'


function Comment() {
    const { userState } = useContext(Context.userContext);

    return (
        <div className="comment-container">
            {userState.name &&
                <>
                    <div className="user-comment">
                        <textarea placeholder='Để lại bình luận của bạn....'></textarea>
                        <button>Đăng</button>
                    </div>
                    <div className="clearfix"></div>
                    <div className="comment-seperate-line"></div>
                </>
            }

            {/* thêm class self cmt để edit */}
            <div className="list-comment">
                <div className='comment-item'>
                    <label htmlFor="">Tôi</label>
                    <div className='list-comment-content'>
                        <div>Đây quả thực là một bộ fim hay</div>
                        <div>Tôi phải coi lại mấy chục lần</div>
                    </div>

                    <ul className='comment-item-dropbox'>
                        <li className='dropbox-item'>Chỉnh sửa</li>
                        <li className='dropbox-item'>Xóa</li>
                    </ul>
                </div>

                <div className='comment-item'>
                    <label htmlFor="">Phát</label>
                    <div className='list-comment-content'>
                        <div>Đây quả thực là một bộ fim hay</div>
                        <div>Tôi phải coi lại mấy chục lần</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;