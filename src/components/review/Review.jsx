import Post from "../post/Post";
import "./review.scss";
import Filters from '../filters/Filters'

function Review(props) {
    return (
        <div className="review-container">
            <Filters />
            <div className="post-list">
                {props.filter && props.filter.length > 0 && props.filter.map(item => {
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
        </div>

    )
}

export default Review;