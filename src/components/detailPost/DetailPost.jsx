import './detailPost.scss'
import Comment from './comment/Comment'
import { useParams, useHistory } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Context } from '../../store'
import { Settings, Grade } from '@material-ui/icons'

function DetailPost() {
    const { id } = useParams();
    const { state } = useContext(Context.movieContext);
    const { userState } = useContext(Context.userContext);
    const history = useHistory();
    const movie = state.movies.find(item => item._id === id);
    const [isShowOption, setIsShowOption] = useState(false);
    const [isShowTrailer, SetIsShowTrailer] = useState(false);

    const handleShowOption = () => {
        setIsShowOption(!isShowOption);
    }

    const handleDeleteReview = () => {
        console.log('xóa bài r');
        history.push('/');
    }

    const handleShowTrailer = () => {
        SetIsShowTrailer(true);
    }

    const handleCloseTrailer = () => {
        SetIsShowTrailer(false);
    }

    return (
        <>
            {movie && <div className="detail-container">
                <div className="detail-first-block">
                    {userState.role && <div className="detail-option-icon" onClick={handleShowOption}><Settings /></div>}
                    {isShowOption && <div className="detail-option-dropdown">
                        <div className="option-item">Sửa đổi</div>
                        <div className="option-item" onClick={handleDeleteReview}>Xóa</div>
                    </div>}
                    <img src={movie.poster} alt={movie.name} className="detail-background" />

                    <div className="detail-information">
                        <div className="detail-name">{movie.name}</div>
                        <div className="detail-writter">Tác giả: {movie.author}</div>
                        <div className="detail-director">Đạo diễn: {movie.director}</div>
                        <div className="detail-type">Nhãn: {movie.type}</div>
                        <div className="detail-time">Thời lượng: {movie.time}</div>
                        <div className="detail-time">Công chiếu: {movie.releaseDate}</div>
                        <div className="detail-gerne">Thể loại: {movie.gerne.join(', ')}</div>
                        <div className="detail-cast">Diễn viên: {movie.cast}</div>

                    </div>

                    <img src={movie.poster} alt={movie.name} className="detail-poster" />

                    <div className="detail-feature">
                        <div className="detail-add-fav detail-button">Yêu thích</div>
                        <div className="detail-trailer detail-button" onClick={handleShowTrailer}>Xem trailer</div>
                    </div>
                </div>


                <div className="second-block">
                    <div className="detail-plot">
                        <h1 className="detail-plot-header">Nội dung</h1>
                        {movie.plot.split('\r\n').map((item, index) => <div className="detail-plot-content" key={index}>{item}</div>)}

                    </div>

                    <div className="detail-review">
                        <h1 className="detail-review-header">Đánh giá</h1>
                        {movie.review.map((item, index) => {
                            return (
                                <div key={index} className="review-section">
                                    <h2 className="review-title">{`${index + 1}) ${Object.keys(item)}`}</h2>
                                    {Object.values(item)[0].split('\r\n').map((item, index) => <p className="review-content" key={index}>{item}</p>)}
                                </div>
                            )
                        })}


                    </div>

                    <h1 className="detail-rate">Mức điểm: {movie.rate}/10 <Grade className="detail-rate-icon" /></h1>
                </div>

            </div>}

            <div className="comment-section">
                <Comment />
            </div>

            {isShowTrailer && <div className="trailer-screen" onClick={handleCloseTrailer}>
                <iframe className="trailer-video" src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`} title="youtube" frameBorder="0" allow='autoplay' onClick={event => event.stopPropagation()}></iframe>
            </div>}
        </>
    )
}

export default DetailPost;