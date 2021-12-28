import "./menubar.scss"
import Review from "../../components/review/Review";
import axios from 'axios';
import { useEffect, useState } from 'react';

function Menubar() {
    const gerne = ['Anime', 'Âm nhạc', 'Bí ẩn', 'Chiến tranh', 'Chính kịch', 'Drama',
        'Hoạt hình', 'Gia đình', 'Giật Gân', 'Hài', 'Hành động', 'Viễn tưởng', 'Kinh dị',
        'Lãng mạn', 'Phiêu lưu', 'Tài liệu', 'Tâm lí'];

    const [filter, setFilter] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [filterGerne, setFilterGerne] = useState([]);
    const chosen = (filter, movie) => filter.every(r => movie.includes(r))

    useEffect(() => {
        axios.get('http://localhost:4000/movies')
            .then(function (res) {
                let data = res && res.data ? res.data : [];
                setMovies(data);
            })
    }, [])

    const handleChosenGerne = (event) => {
        event.currentTarget.classList.toggle('active-section');
        let temp = filterGerne;

        if (event.currentTarget.className.includes('active-section')) {
            temp.push(event.target.childNodes[0].data)
        }
        else {
            temp = temp.filter(item => item !== event.target.childNodes[0].data);
        }
        setFilterGerne(temp);

        setFilter(movies.filter(movie => chosen(temp, movie.gerne)));

        if (temp.length > 0) {
            setIsFilter(true);
        }
        else {
            setIsFilter(false);
        }


    }

    return (
        <>
            <div className="menubar-container">
                <div className="menu-list">

                    {gerne.map((item, index) => {
                        return (
                            <p className="menu-items"
                                onClick={(event) => handleChosenGerne(event)}
                                key={index}>
                                {item}
                            </p>
                        )
                    })}
                </div>
            </div >
            <Review filter={isFilter ? filter : movies} />
        </>
    )
}

export default Menubar;