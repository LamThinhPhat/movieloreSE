import "./review.scss";
import Filters from '../review/filters/Filters'
import PostList from '../review/postList/PostList'

function Review() {
    return (
        <div className="review-container">
            <Filters />
            <PostList />
        </div>
    )
}

export default Review;