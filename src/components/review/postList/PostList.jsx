import './postList.scss'
import Post from "./post/Post"
import { useContext } from 'react'
import { Context } from '../../../store'

function PostList(props) {

    const { state } = useContext(Context.movieContext);
    const { userState } = useContext(Context.userContext);
    let movies = [];
    if (props.favorite) {
        for (let i = 0; i < userState.favorite.length; i++) {
            const movie = state.movies.find(item => item._id === userState.favorite[i])
            movies.push(movie);
        }
    } else movies = state.filter;

    return (
        <>
            {state.isLoading ? <div className="post-list-loader-container"><div className="loader"></div></div>
                :
                (movies && movies.length > 0) ?
                    <div className="post-list">
                        {movies.map(item => {
                            return (
                                <Post key={item._id}
                                    id={item._id}
                                    athor={item.athor}
                                    cast={item.cast}
                                    director={item.director}
                                    gerne={item.gerne.join(', ')}
                                    name={item.name}
                                    plot={item.plot}
                                    poster={item.poster.secure_url}
                                    rate={item.rate}
                                    releaseDate={item.releaseDate}
                                    review={item.review}
                                    time={item.time}
                                />
                            )
                        })}
                    </div>
                    : <div className="post-list-annouce">{props.favorite ? 'Danh sách đang trống :(' : 'Chưa có phim bạn đang tìm :('}</div>
            }
        </>
    )
}

export default PostList;