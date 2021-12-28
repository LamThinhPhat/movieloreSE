import './postList.scss'
import Post from "./post/Post"
import { useContext } from 'react'
import { MovieContext } from '../../../store'

function PostList() {
    const { state } = useContext(MovieContext);
    let movies = state.isFinalFilter ? state.finalFilter : state.filter;

    return (
        <div className="post-list">
            {movies && movies.length > 0 && movies.map(item => {
                return (
                    <Post key={item.id}
                        id={item.id}
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
    )
}

export default PostList;