import "./review.scss";
import Filters from '../filters/Filters'
import PostList from '../postList/PostList'

function Review() {
    return (
        <div className="review-container">
            <Filters />
            <PostList />
        </div>
    )
}

export default Review;