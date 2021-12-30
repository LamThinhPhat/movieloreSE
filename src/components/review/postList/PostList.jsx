import './postList.scss'
import Post from "./post/Post"
import { useContext } from 'react'
import { Context } from '../../../store'

function PostList() {
    const { state } = useContext(Context.movieContext);
    let movies = state.isFinalFilter ? state.finalFilter : state.filter;

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
                                    poster={item.poster}
                                    rate={item.rate}
                                    releaseDate={item.releaseDate}
                                    review={item.review}
                                    time={item.time}
                                />
                            )
                        })}
                    </div>
                    : <div className="post-list-annouce">Chưa có phim bạn đang tìm :(</div>
            }
        </>
    )
}

export default PostList;