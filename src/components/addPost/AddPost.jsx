import './addPost.scss'
import { useState, useEffect } from 'react'
import { Grade, MovieCreation } from '@material-ui/icons'

function AddPost() {
    const gernes = ['Anime', 'Âm nhạc', 'Bí ẩn', 'Chiến tranh', 'Chính kịch', 'Drama',
        'Hoạt hình', 'Gia đình', 'Giật Gân', 'Hài', 'Hành động', 'Viễn tưởng', 'Kinh dị',
        'Lãng mạn', 'Phiêu lưu', 'Tài liệu', 'Tâm lí'];

    const types = ['Mọi lứa tuổi', 'C13', 'C16', 'C18', 'R'];
    const [poster, setPoster] = useState();
    const [reviews, setReviews] = useState([
        { section: '', content: '' },
    ]);

    useEffect(() => {
        return () => {
            poster && URL.revokeObjectURL(poster.preview);
        }
    }, [poster])

    const handleChoosePoster = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file);
            setPoster(file);
            e.target.value = null;
        }
    }

    const handleChangeReview = (event, index) => {
        const { name, value } = event.target;
        const list = [...reviews];

        list[index][name] = value;
        setReviews(list);
    }

    const handleAddReview = () => {
        setReviews([...reviews, { section: '', content: '' }]);
    }

    const handleRemoveReview = () => {
        const list = [...reviews];
        if (list.length > 1) {
            list.pop();
            setReviews(list);
        }
    }

    return (
        <div className="add-post-container">
            <div className="create-container">
                <div className="header-title">
                    <MovieCreation className="header-title-icon" />
                    VIẾT REVIEW
                </div>

                <div className="first-block">
                    <div className="information">
                        <label htmlFor="first-movies-title" className="block-label">Tên phim:</label>
                        <input type="text" id="first-movies-title" className="block-input" placeholder="vd: Movie Lore" />

                        <label htmlFor="first-trailer" className="block-label">Trailer URL (link youtube):</label>
                        <input type="text" id="first-trailer" className="block-input" placeholder="vd: https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

                        <label htmlFor="first-country" className="block-label">Quốc gia:</label>
                        <input type="text" id="first-country" className="block-input" placeholder="vd: Việt Nam, Mỹ, Nhật,..." />

                        <label htmlFor="first-release-day" className="block-label">Ngày công chiếu:</label>
                        <input type="text" id="first-release-day" className="block-input" placeholder="DD/MM/YYYY" />

                        <label htmlFor="first-time-long" className="block-label">Thời lượng phim:</label>
                        <input type="text" id="first-time-long" className="block-input" placeholder="vd: 180 phút" />

                        <div className="first-type">
                            Nhãn:
                            {types.map((type, index) => {
                                return (
                                    <span key={index} className="first-type-tags">
                                        <input id={'first-type-' + index} type="radio" name="types" />
                                        <label htmlFor={'first-type-' + index}>{type}</label>
                                    </span>
                                )
                            })}

                        </div>
                    </div>

                    <div className="poster-block">
                        <label htmlFor="poster-upload" className="poster-upload-btn">Chọn ảnh</label>
                        <input type="file" id="poster-upload" accept="image/*" onChange={handleChoosePoster} style={{ display: "none" }} />
                        {poster && <img src={poster.preview} alt="poster" className="poster-upload-img" />}
                    </div>
                </div>

                <div className="second-block">
                    <label htmlFor="second-writters" className="block-label">Tác giả:</label>
                    <input type="text" id="second-writters" className="block-input" placeholder="vd: Robert Zemeckis, Robert Zemeckis, J.K. Rowling,..." />

                    <label htmlFor="second-director" className="block-label">Đạo diễn:</label>
                    <input type="text" id="second-director" className="block-input" placeholder="vd: Christopher Nolan, Robert Zemeckis, Robert Zemeckis,..." />

                    <label htmlFor="second-cast" className="block-label">Diễn viên:</label>
                    <input type="text" id="second-cast" className="block-input" placeholder="vd: Tom Hank, Emma Stone, Johnny Depp,..." />
                </div>

                <div className="gerne-block">
                    <label>Thể loại:</label>
                    <div>
                        {gernes.map((gerne, index) => {
                            return (
                                <span className="gerne-tag" key={index}>{gerne}</span>
                            )
                        })}
                    </div>
                </div>

                <div className="plot-block">
                    <label htmlFor="plot-input" className="block-label">Nội dung:</label>
                    <textarea id="plot-input" className="block-input" placeholder="Nội dung chính của phim" />
                </div>

                {/* làm thêm add và remove cho nhiều block */}
                <div className="review-block">
                    <div className="review-title">Nhận xét:</div>

                    {reviews.map((review, index) => {
                        return (
                            <div className="review-area" key={index}>
                                <input className="review-btn" name="section" value={review.section} onChange={event => handleChangeReview(event, index)} placeholder="Tiêu đề" />
                                <textarea id="review-input" className="block-input" name="content" value={review.content} onChange={event => handleChangeReview(event, index)} placeholder="Viết nhận xét..." />
                            </div>
                        )
                    })}

                    <div className="review-option">
                        <div className="review-remove-btb" onClick={handleRemoveReview}>Xóa</div>
                        <div className="review-add-btn" onClick={handleAddReview}>Thêm</div>
                    </div>
                </div>

                <div className="rate-block">
                    <span>Đánh giá:</span>
                    <input type="text" className="rate-input" />
                    <span>/10</span>
                    <span className="rate-icon"><Grade /></span>
                </div>

                <div className="submit-block">
                    <button className="submit-btn">ĐĂNG BÀI</button>
                </div>
            </div>
        </div>
    )
}

export default AddPost;