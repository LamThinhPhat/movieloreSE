import './favorite.scss'
import PostList from '../../review/postList/PostList';

function Favorite(props) {
    return (
        <div className="favorite-container">
            <PostList otherInfo={props.otherInfo} />
        </div>
    )
}

export default Favorite;