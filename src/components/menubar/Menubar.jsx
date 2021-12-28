import "./menubar.scss"
import { actions } from "../../store";
import { useContext } from 'react';
import { Context } from "../../store";

function Menubar() {
    const { state, dispatch } = useContext(Context.movieContext);

    const gernes = ['Anime', 'Âm nhạc', 'Bí ẩn', 'Chiến tranh', 'Chính kịch', 'Drama',
        'Hoạt hình', 'Gia đình', 'Giật Gân', 'Hài', 'Hành động', 'Viễn tưởng', 'Kinh dị',
        'Lãng mạn', 'Phiêu lưu', 'Tài liệu', 'Tâm lí'];

    const handleChosenGerne = (event) => {
        event.currentTarget.classList.toggle('active-section');
        let gerneFilter = [];

        let list = document.querySelector('.menu-list');

        for (let i = 0; i < list.children.length; i++) {
            if (list.children[i].className.includes('active-section')) {
                gerneFilter.push(list.children[i].childNodes[0].data)
            }
        }

        dispatch(actions.setFilterGerne(gerneFilter));
    }

    return (
        <>
            <div className="menubar-container">
                <div className="menu-list">
                    {gernes.map((item, index) => {
                        return (
                            <p className={state.gerne.includes(item) ? "menu-items active-section" : "menu-items"}
                                onClick={(event) => handleChosenGerne(event)}
                                key={index}>
                                {item}
                            </p>
                        )
                    })}
                </div>
            </div >
        </>
    )
}

export default Menubar;