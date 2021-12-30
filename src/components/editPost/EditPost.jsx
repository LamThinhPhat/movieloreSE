import './editPost.scss'
import { useParams } from 'react-router-dom'
import { Context, movieActions } from '../../store'
import { useState, useContext, useEffect } from 'react'
import { Grade, MovieCreation } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


function EditPost() {
    const gernes = ['Anime', 'Âm nhạc', 'Bí ẩn', 'Chiến tranh', 'Chính kịch', 'Drama',
        'Hoạt hình', 'Gia đình', 'Giật Gân', 'Hài', 'Hành động', 'Viễn tưởng', 'Kinh dị',
        'Lãng mạn', 'Phiêu lưu', 'Tài liệu', 'Tâm lí', 'Tội phạm'];

    const types = ['Mọi lứa tuổi', 'C13', 'C16', 'C18', 'R'];

    const { id } = useParams();
    const history = useHistory();
    const { state, dispatch } = useContext(Context.movieContext);
    const movie = state.movies.find(item => item._id === id)

    const [isLoading, setIsLoading] = useState(false);
    const [poster, setPoster] = useState();
    const [reviews, setReviews] = useState(movie.review);
    const [errorMessage, setErrorMessage] = useState('');

    const [data, setData] = useState({
        name: movie.name,
        trailer: movie.trailer,
        country: movie.country,
        releaseDate: movie.releaseDate,
        time: movie.time,
        type: movie.type,
        director: movie.director,
        author: movie.author,
        cast: movie.cast,
        gerne: movie.gerne,
        plot: movie.plot,
        review: movie.review,
        rate: movie.rate,
        poster: movie.poster
    })

    const handleChoosePoster = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file);
            setPoster(file);
            e.target.value = null;
        }
    }

    const handleAddReview = () => {
        setReviews([...reviews, { section: '', content: '' }]);
    }

    const handleRemoveReview = () => {
        const list = [...reviews];
        if (list.length > 1) {
            list.pop();
            setReviews(list);
            setData({ ...data, review: list });
        }
    }

    const handleChooseGerne = (event) => {
        event.preventDefault();
        event.currentTarget.classList.toggle('gerne-active');
        const temp = data.gerne;
        if (event.target.classList.contains('gerne-active')) {
            temp.push(event.target.textContent);
        }
        else temp.splice(temp.indexOf(event.target.textContent), 1);

        setData({ ...data, gerne: temp });
    }

    const handleChangeReview = (event, index) => {
        const { name, value } = event.target;
        const list = [...reviews];

        list[index][name] = value;
        setReviews(list);
        setData({ ...data, review: list });
    }

    useEffect(() => {
        return () => {
            poster && URL.revokeObjectURL(poster.preview);
        }
    }, [poster])

    const handleUpdateReview = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const values = Object.values(data);
        for (let i = 0; i < values.length; i++) {
            if ((typeof values[i] === 'string' && values[i] === '') || (typeof values[i] === 'object' && values[i].length === 0)) {
                setErrorMessage('Vui lòng kiểm tra và điền đầy đủ thông tin');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
                return;
            }
        }

        const fullData = data;
        fullData._id = movie._id;

        if (poster) {
            const fd = new FormData();
            fd.append('file', poster)
            fd.append('upload_preset', 'bspwbktq')
            axios.post('https://api.cloudinary.com/v1_1/ducka9boe/image/upload', fd)
                .then(res => {
                    fullData.poster = {
                        public_id: res.data.public_id,
                        secure_url: res.data.secure_url,
                    }
                })
                .then(() => {
                    axios({
                        url: `https://movielore-database.herokuapp.com/update/${movie._id}`,
                        method: 'POST',
                        data: fullData
                    })
                        .then(res => {
                            setIsLoading(false);
                            if (res.data.error === 0) {
                                dispatch(movieActions.updateReview(fullData));
                            } else {
                                setErrorMessage('Chỉnh sửa không thành công');
                                setTimeout(() => {
                                    setErrorMessage('');
                                }, 3000);
                            }
                        })
                        .then(history.push(`/detail/${movie._id}`))
                        .catch(error => {
                            setIsLoading(false);
                            console.log(error)
                        })
                })
                .catch(err => console.log(err))
        } else {
            axios({
                url: `https://movielore-database.herokuapp.com/update/${movie._id}`,
                method: 'POST',
                data
            })
                .then(res => {
                    setIsLoading(false);
                    if (res.data.error === 0) {
                        dispatch(movieActions.updateReview({ ...data, _id: movie._id }));
                    } else {
                        setErrorMessage('Chỉnh sửa không thành công');
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 3000);
                    }
                })
                .then(history.push(`/detail/${movie._id}`))
                .catch(error => {
                    setIsLoading(false);
                    console.log(error)
                })
        }
    }

    return (
        <div className="edit-post-container">
            <div className="create-container">
                <form onSubmit={e => handleUpdateReview(e)}>
                    <div className="header-title">
                        <MovieCreation className="header-title-icon" />
                        CHỈNH SỬA
                    </div>

                    <div className="first-block">
                        <div className="information">
                            <label htmlFor="first-movies-title" className="block-label">Tên phim:</label>
                            <input type="text" id="first-movies-title" className="block-input" placeholder="vd: Movie Lore" value={data.name} onChange={event => setData({ ...data, name: event.target.value })} required autoComplete="on" />

                            <label htmlFor="first-trailer" className="block-label">Trailer ID:</label>
                            <input type="text" id="first-trailer" className="block-input" placeholder="vd: dQw4w9WgXcQ" value={data.trailer} onChange={event => setData({ ...data, trailer: event.target.value })} required autoComplete="on" />

                            <label htmlFor="first-country" className="block-label">Quốc gia:</label>
                            <input type="text" id="first-country" className="block-input" placeholder="vd: Việt Nam, Mỹ, Nhật,..." value={data.country} onChange={event => setData({ ...data, country: event.target.value })} required autoComplete="on" />

                            <label htmlFor="first-release-day" className="block-label">Ngày công chiếu:</label>
                            <input type="date" id="first-release-day" className="block-input" placeholder="DD/MM/YYYY" value={data.releaseDate} onChange={event => setData({ ...data, releaseDate: event.target.value })} required autoComplete="on" />

                            <label htmlFor="first-time-long" className="block-label">Thời lượng phim:</label>
                            <input type="text" id="first-time-long" className="block-input" placeholder="vd: 180 phút" value={data.time} onChange={event => setData({ ...data, time: event.target.value })} required autoComplete="on" />

                            <div className="first-type">
                                Nhãn:
                                {types.map((type, index) => {
                                    return (
                                        <span key={index} className="first-type-tags">
                                            {data.type === type ? <input id={'first-type-' + index} type="radio" name="types" value={type} defaultChecked onChange={event => setData({ ...data, type: event.target.value })} />
                                                :
                                                <input id={'first-type-' + index} type="radio" name="types" value={type} onChange={event => setData({ ...data, type: event.target.value })} />}
                                            <label htmlFor={'first-type-' + index} className="first-type-label">{type}</label>
                                        </span>
                                    )
                                })}

                            </div>
                        </div>

                        {/* manipulate to send poster */}
                        <div className="poster-block">
                            <label htmlFor="poster-upload" className="poster-upload-btn">Chọn ảnh</label>
                            <input type="file" id="poster-upload" accept="image/*" onChange={handleChoosePoster} style={{ display: "none" }} autoComplete="on" />
                            {poster ? <img src={poster.preview} alt="poster" className="poster-upload-img" />
                                : <img src={data.poster.secure_url} alt="poster" className="poster-upload-img" />
                            }
                        </div>
                    </div>

                    <div className="second-block">
                        <label htmlFor="second-writters" className="block-label">Tác giả:</label>
                        <input type="text" id="second-writters" className="block-input" placeholder="vd: Robert Zemeckis, Robert Zemeckis, J.K. Rowling,..." value={data.author} onChange={event => setData({ ...data, author: event.target.value })} required autoComplete="on" />

                        <label htmlFor="second-director" className="block-label">Đạo diễn:</label>
                        <input type="text" id="second-director" className="block-input" placeholder="vd: Christopher Nolan, Robert Zemeckis, Robert Zemeckis,..." value={data.director} onChange={event => setData({ ...data, director: event.target.value })} required autoComplete="on" />

                        <label htmlFor="second-cast" className="block-label">Diễn viên:</label>
                        <input type="text" id="second-cast" className="block-input" placeholder="vd: Tom Hank, Emma Stone, Johnny Depp,..." value={data.cast} onChange={event => setData({ ...data, cast: event.target.value })} required autoComplete="on" />
                    </div>

                    <div className="gerne-block">
                        <label>Thể loại:</label>
                        <div>
                            {gernes.map((gerne, index) => {
                                return (
                                    <span key={index}>
                                        {data.gerne.includes(gerne) ? <span className="gerne-tag gerne-active" name={gerne} onClick={event => handleChooseGerne(event)}>{gerne}</span>
                                            :
                                            <span className="gerne-tag" name={gerne} onClick={event => handleChooseGerne(event)}>{gerne}</span>}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="plot-block">
                        <label htmlFor="plot-input" className="block-label">Nội dung:</label>
                        <textarea id="plot-input" className="block-input" placeholder="Nội dung chính của phim" value={data.plot} onChange={event => setData({ ...data, plot: event.target.value })} required autoComplete="on" />
                    </div>

                    <div className="review-block">
                        <div className="review-title">Nhận xét:</div>

                        {reviews.map((review, index) => {
                            return (
                                <div className="review-area" key={index}>
                                    <input className="review-btn" name="section" value={review.section} onChange={event => handleChangeReview(event, index)} placeholder="Tiêu đề" required autoComplete="on" />
                                    <textarea id="review-input" className="block-input" name="content" value={review.content} onChange={event => handleChangeReview(event, index)} placeholder="Viết nhận xét..." required autoComplete="on" />
                                </div>
                            )
                        })}

                        <div className="review-option">
                            <div className="review-remove-btn" onClick={handleRemoveReview}>Xóa</div>
                            <div className="review-add-btn" onClick={handleAddReview}>Thêm</div>
                        </div>
                    </div>

                    <div className="rate-block">
                        <span>Đánh giá:</span>
                        <input type="number" className="rate-input" value={data.rate} onChange={event => setData({ ...data, rate: event.target.value })} required autoComplete="on" />
                        <span>/10</span>
                        <span className="rate-icon"><Grade /></span>
                    </div>

                    <div className="submit-block">
                        <span className="summit-error">{errorMessage}</span>

                        {isLoading ? <div className="loader" ></div>
                            :
                            <div className='edit-btn-group'>
                                <button className="btn btn-cancle" onClick={() => history.push(`/detail/${movie._id}`)}>Hủy</button>
                                <button className="btn" type='submit'>Lưu</button>
                            </div>}
                    </div>


                </form>
            </div>
        </div>
    )
}

export default EditPost;