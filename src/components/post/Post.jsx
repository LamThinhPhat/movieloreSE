import "./post.scss"

function Post() {
    return (
        <div className="post-container">
            <div className="single-post">
                <img src="https://upload.wikimedia.org/wikipedia/vi/1/1d/Forrest_gump.jpg" className="post-poster" alt="poster" />
                <div className="post-title">Tên phim</div>
                <p className="post-description">Đây là một bộ phim rất hay</p>
            </div>
        </div>
    )
}

export default Post;