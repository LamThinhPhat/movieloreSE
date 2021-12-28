import "./post.scss"
import { Grade } from '@material-ui/icons'
import { Link } from 'react-router-dom'

function Post(props) {

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }

    return (
        <Link to={`/detail/${props.id}`} className="single-post">
            <img src={props.poster} className="post-poster" alt={props.name} />
            <div className="post-rate">
                <span className="post-rate-number">{props.rate}/10</span>
                <Grade className="post-rate-start" />
            </div>
            <div className="post-title">
                {props.name.length > 30 ? props.name.substring(0, 30) + '...' : props.name}
            </div>
            <p className="post-description">
                {props.gerne.length > 40 ? props.gerne.substring(0, getPosition(props.gerne, ',', 3)) + '...' : props.gerne}
            </p>
        </Link>
    )
}

export default Post;