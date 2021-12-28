import './favorite.scss'
import PostList from '../../review/postList/PostList';

function Favorite() {
    return (
        <div className="favorite-container">
            <PostList favorite={true} />
        </div>
    )
}

export default Favorite;