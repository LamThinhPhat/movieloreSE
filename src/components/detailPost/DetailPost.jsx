import './detailPost.scss'
import CommentList from './commentList/CommentList'
import { useParams, useHistory } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { Context, movieActions, userActions } from '../../store'
import { Settings, Grade } from '@material-ui/icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

const formatDate = (movie) => {
    if (movie) {
        const date = new Date(movie.releaseDate);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        movie.formatReleaseDate = day + '/' + month + '/' + year;
    }
    return movie;
}

function DetailPost() {
    const { id } = useParams();
    const { state, dispatch } = useContext(Context.movieContext);
    const { userState, userDispatch } = useContext(Context.userContext);
    const history = useHistory();
    const movie = formatDate(state.movies.find(item => item._id === id));

    const [isShowOption, setIsShowOption] = useState(false);
    const [isShowTrailer, SetIsShowTrailer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoadingFav, setIsLoadingFav] = useState(false);
    const [comments, setComments] = useState([]);

    const handleShowOption = () => {
        setIsShowOption(!isShowOption);
    }

    const handleDeleteReview = () => {
        setIsLoadingBtn(true);
        axios.delete(`https://movielore-database.herokuapp.com/${movie._id}`)
            .then(res => {
                if (res.data.error === 0) {
                    dispatch(movieActions.deleteReview(movie._id));
                } else return;
            })
            .then(() => history.push('/'))
            .catch(err => console.log(err))
    }

    const handleShowTrailer = () => {
        SetIsShowTrailer(true);
    }

    const handleCloseTrailer = () => {
        SetIsShowTrailer(false);
    }

    const handleToLogin = () => {
        history.push('/login');
    }

    const handleAddFav = () => {
        setIsLoadingFav(true);
        axios.post(`https://movielore-database.herokuapp.com/user/favorite/${movie?._id}`, { user: userState.id })
            .then(res => {
                if (res.data.error === 0) {
                    setIsLoadingFav(false);
                    userDispatch(userActions.addToFavorite(movie._id));
                }
            })
            .catch(err => console.log(err))
    }

    const handleRemoveFav = () => {
        setIsLoadingFav(true);
        axios.post(`https://movielore-database.herokuapp.com/user/favorite/delete/${movie?._id}`, { user: userState.id })
            .then(res => {
                if (res.data.error === 0) {
                    setIsLoadingFav(false);
                    userDispatch(userActions.removeFromFavorite(movie._id));
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`https://movielore-database.herokuapp.com/comment/${movie?._id}`)
            .then(res => {
                setComments(res.data.reverse());
            })
            .catch(err => console.log(err))
    }, [movie?._id])

    return (
        <>
            {movie && <div className="detail-container">
                <div className="detail-first-block">
                    {userState.role && <div className="detail-option-icon" onClick={handleShowOption}><Settings /></div>}
                    {isShowOption && <div className="detail-option-dropdown">
                        <div className="option-item" onClick={() => history.push(`/edit/${movie._id}`)}>Ch???nh s???a</div>
                        <div className="option-item" onClick={() => setShowModal(true)}>X??a</div>
                    </div>}
                    <img src={movie.poster.secure_url} alt={movie.name} className="detail-background" />

                    <div className="detail-information">
                        <div className="detail-name">{movie.name}</div>
                        <div className="detail-writter">T??c gi???: {movie.author}</div>
                        <div className="detail-director">?????o di???n: {movie.director}</div>
                        <div className="detail-type">Nh??n: {movie.type}</div>
                        <div className="detail-time">Th???i l?????ng: {movie.time}</div>
                        <div className="detail-time">C??ng chi???u: {movie.formatReleaseDate}</div>
                        <div className="detail-gerne">Th??? lo???i: {movie.gerne.join(', ')}</div>
                        <div className="detail-cast">Di???n vi??n: {movie.cast}</div>

                    </div>

                    <img src={movie.poster.secure_url} alt={movie.name} className="detail-poster" />

                    <div className="detail-feature">
                        {userState.favorite.includes(movie._id) ? <div className="detail-remove-fav detail-button" onClick={isLoadingFav ? null : handleRemoveFav}>{isLoadingFav ? '??ang x??a...' : 'B??? y??u th??ch'}</div>
                            :
                            <div className="detail-add-fav detail-button" onClick={userState.name ? (isLoadingFav ? null : handleAddFav) : handleToLogin}>{isLoadingFav ? '??ang th??m...' : 'Y??u th??ch'}</div>}
                        <div className="detail-trailer detail-button" onClick={handleShowTrailer}>Xem trailer</div>
                    </div>
                </div>


                <div className="second-block">
                    <div className="detail-plot">
                        <h1 className="detail-plot-header">N???i dung</h1>
                        {movie.plot.split('\r\n').map((item, index) => <div className="detail-plot-content" key={index}>{item}</div>)}

                    </div>

                    <div className="detail-review">
                        <h1 className="detail-review-header">????nh gi??</h1>
                        {movie.review.map((item, index) => {
                            return (
                                <div key={index} className="review-section">
                                    <h2 className="review-title">{`${index + 1}) ${item.section}`}</h2>
                                    {item.content.split('\n').map((line, i) => <p className="review-content" key={i}>{line}</p>)}
                                </div>
                            )
                        })}
                    </div>

                    <h1 className="detail-rate">M???c ??i???m: {movie.rate}/10 <Grade className="detail-rate-icon" /></h1>
                </div>

            </div>}

            <div className="comment-section">
                <CommentList comments={comments} movie={movie} />
            </div>

            {isShowTrailer && <div className="trailer-screen" onClick={handleCloseTrailer}>
                <iframe className="trailer-video" src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`} title="youtube" frameBorder="0" allow='autoplay' onClick={event => event.stopPropagation()}></iframe>
            </div>}

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="md"
                // aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        X??c nh???n
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>B???n c?? ch???c ch???n mu???n x??a b??i vi???t?</h4>

                </Modal.Body>
                <Modal.Footer>
                    <Button className='delete-modal-comfirm'
                        variant="outline-secondary"
                        onClick={() => setShowModal(false)}
                    >H???y</Button>
                    <Button className='delete-modal-comfirm'
                        variant='danger'
                        disabled={isLoadingBtn}
                        onClick={isLoadingBtn ? null : handleDeleteReview}>
                        {isLoadingBtn ? '??ang x??a...' : 'X??a'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailPost;