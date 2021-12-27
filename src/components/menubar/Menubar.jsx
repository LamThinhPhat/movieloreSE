import "./menubar.scss"

function Menubar() {
    let gerne = ['Anime', 'Âm nhạc', 'Bí ẩn', 'Chiến tranh', 'Drama', 'Hoạt hình', 'Gia đình', 'Giả tưởng', 'Hài',
        'Hành động', 'Kinh dị', 'Lãng mạn', 'Phiêu lưu', 'Tài liệu', 'Tâm lí'];

    return (
        <div className="menubar-container">
            <div className="menu-list">
                {gerne.map((item, index) => <p className="menu-items" key={index}>{item}</p>)}
            </div>

        </div>
    )
}

export default Menubar;