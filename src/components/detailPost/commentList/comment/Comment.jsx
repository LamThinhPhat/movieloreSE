import './comment.scss'
import { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Context } from '../../../../store'
import axios from 'axios';
import { Link } from 'react-router-dom';


function Comment(props) {
    const { userState } = useContext(Context.userContext);
    const [showRootOption, setShowRootOption] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [updateComment, setUpdateComment] = useState(props?.comment?.content || props?.reply?.content);
    const [isReply, setIsReply] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    let authenticate = null;
    if (userState.id === (props?.comment?.userID || props?.reply?.userID)) {
        authenticate = 'owner';
    } else if (userState.role) {
        authenticate = 'admin'
    } else if (userState.name !== null) {
        authenticate = 'user'
    }

    const handleShowRootOption = () => setShowRootOption(true);
    const handleHiddenRootOption = () => setShowRootOption(false);

    const handleSaveUpdate = () => {
        setIsLoadingBtn(true);
        const oldComment = props?.comment || props?.reply;
        oldComment.content = updateComment;
        axios.post('https://movielore-database.herokuapp.com/comment/update', oldComment)
            .then(res => {
                if (res.data.error === 0) {
                    if (props?.comment) props.comment.content = updateComment;
                    if (props?.reply) props.comment.content = updateComment;
                    setIsEdit(false);
                    setIsLoadingBtn(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsEdit(false);
                setIsLoadingBtn(false);
            })
    }

    const handleReplyComment = async () => {
        setIsLoadingBtn(true);
        await props.handleReplyComment(props.comment._id, replyContent);
        setIsReply(false);
        setReplyContent('');
        setIsLoadingBtn(false);
    }

    return (
        <>
            {props.comment ?
                <div className="comment-item">
                    <div className="root-comment">
                        {/* other name */}
                        {authenticate !== 'owner' &&
                            <div className='mb-1'>
                                <Link to={`/other/${props.comment.userID}`} className='comment-username'>{props.comment.name}</Link>
                            </div>}

                        {/* owner name */}
                        {authenticate === 'owner' &&
                            <div className='mb-1'>
                                <span className='comment-username owner-username'>Tôi</span>
                            </div>}

                        {authenticate === 'owner' && !isEdit &&
                            <div className='list-comment-content feature-notice' tabIndex={0} onClick={showRootOption ? handleHiddenRootOption : handleShowRootOption} onBlur={handleHiddenRootOption}>
                                {props.comment.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}

                                {showRootOption &&
                                    <ul className='root-item-dropbox'>
                                        <li className='dropbox-item' onClick={() => setIsEdit(true)}>Chỉnh sửa</li>
                                        <li className='dropbox-item' onClick={() => props.handleDeleteComment(props.comment._id)}>Xóa</li>
                                    </ul>}
                            </div>
                        }
                        {/* update root cmt */}
                        {authenticate === 'owner' && isEdit &&
                            <>
                                <textarea value={updateComment} onChange={e => setUpdateComment(e.target.value)}></textarea>
                                <div>
                                    <button className='comment-btn' onClick={isLoadingBtn ? null : handleSaveUpdate}>{isLoadingBtn ? 'Đang lưu...' : 'Lưu'}</button>
                                    <button className='comment-btn cancel-btn' onClick={isLoadingBtn ? null : (() => setIsEdit(false))}>Hủy</button>
                                </div>
                                <div className="clearfix"></div>
                            </>
                        }

                        {authenticate === 'admin' &&
                            <div className='list-comment-content feature-notice' tabIndex={0} onClick={showRootOption ? handleHiddenRootOption : handleShowRootOption} onBlur={handleHiddenRootOption}>
                                {props.comment.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}

                                {showRootOption &&
                                    <ul className='root-item-dropbox'>
                                        <li className='dropbox-item' onClick={() => setIsReply(true)}>Trả lời</li>
                                        <li className='dropbox-item' onClick={() => props.handleDeleteComment(props.comment._id)}>Xóa</li>
                                    </ul>}
                            </div>
                        }

                        {authenticate === 'user' &&
                            <div className='list-comment-content feature-notice' tabIndex={0} onClick={showRootOption ? handleHiddenRootOption : handleShowRootOption} onBlur={handleHiddenRootOption}>
                                {props.comment.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}

                                {showRootOption &&
                                    <ul className='root-item-dropbox'>
                                        <li className='dropbox-item' onClick={() => setIsReply(true)}>Trả lời</li>
                                    </ul>}
                            </div>
                        }

                        {/* reply textarea */}
                        {isReply &&
                            <>
                                <textarea className='mt-3' value={replyContent} onChange={e => setReplyContent(e.target.value)}></textarea>
                                <div>
                                    <button className='reply-comment-btn' onClick={isLoadingBtn ? null : handleReplyComment}>{isLoadingBtn ? 'Đang lưu...' : 'Lưu'}</button>
                                    <button className='reply-comment-btn reply-cancel-btn' onClick={isLoadingBtn ? null : (() => setIsReply(false))}>Hủy</button>
                                </div>
                            </>
                        }

                        {authenticate === null &&
                            <div className='list-comment-content'>
                                {props.comment.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="comment-item">
                    <div className="child-comment">
                        {/* other name */}
                        {authenticate !== 'owner' &&
                            <div className='mb-1'>
                                <Link to={`/other/${props.reply.userID}`} className='comment-username' >{props.reply.name}</Link>
                                <div className="clearfix"></div>
                            </div>}

                        {/* owner name */}
                        {authenticate === 'owner' &&
                            <div className='mb-1'>
                                <span className='comment-username owner-username'>Tôi</span>
                                <div className="clearfix"></div>
                            </div>}


                        {authenticate === 'owner' && !isEdit &&
                            <div div className='list-comment-content feature-notice' tabIndex={0} onClick={showRootOption ? handleHiddenRootOption : handleShowRootOption} onBlur={handleHiddenRootOption}>
                                {props.reply.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}

                                {showRootOption &&
                                    <ul className='child-item-dropbox'>
                                        <li className='dropbox-item' onClick={() => setIsEdit(true)}>Chỉnh sửa</li>
                                        <li className='dropbox-item' onClick={() => props.handleDeleteComment(props.reply._id)}>Xóa</li>
                                    </ul>}
                            </div>
                        }

                        {/* update child cmt */}
                        {authenticate === 'owner' && isEdit &&
                            <>
                                <textarea value={updateComment} onChange={e => setUpdateComment(e.target.value)}></textarea>
                                <button onClick={isLoadingBtn ? null : handleSaveUpdate}>{isLoadingBtn ? 'Đang lưu...' : 'Lưu'}</button>
                                <button className='cancle-btn' onClick={isLoadingBtn ? null : (() => setIsEdit(false))}>Hủy</button>

                            </>
                        }

                        {authenticate === 'admin' &&
                            <div className='list-comment-content feature-notice' tabIndex={0} onClick={showRootOption ? handleHiddenRootOption : handleShowRootOption} onBlur={handleHiddenRootOption}>
                                {props.reply.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}

                                {showRootOption &&
                                    <ul className='child-item-dropbox'>
                                        <li className='dropbox-item' onClick={() => props.handleDeleteComment(props.reply._id)}>Xóa</li>
                                    </ul>}
                            </div>
                        }

                        {(authenticate === 'user' || authenticate === null) &&
                            <div className='list-comment-content'>
                                {props.reply.content.split('\n').map((item, index) => <div key={index}>{item}</div>)}
                            </div>
                        }
                        <div className="clearfix"></div>
                    </div>


                </div>
            }
        </>
    )
}

export default Comment;