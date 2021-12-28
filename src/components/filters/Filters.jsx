import './filters.scss'
import { FilterList } from '@material-ui/icons'
import { useState } from 'react'
import { useContext } from "react"
import { MovieContext } from "../../store"
import { actions } from '../../store'


function Filters(props) {
    const { state, dispatch } = useContext(MovieContext);
    const [isShow, setIsShow] = useState(false);

    const handleChooseYear = (event) => {
        dispatch(actions.setFilterYear(event.target.value))
    }

    const handleChooseType = (event) => {
        dispatch(actions.setFilterType(event.target.value))
    }

    const handleChooseCountry = (event) => {
        dispatch(actions.setFilterCountry(event.target.value))
    }

    const countrys = [
        {
            id: 'all',
            title: 'Tất cả'
        },
        {
            id: 'vietnam',
            title: 'Việt Nam'
        },
        {
            id: 'USA',
            title: 'Mỹ'
        },
        {
            id: 'china',
            title: 'Trung Quốc'
        },
        {
            id: 'japan',
            title: 'Nhật Bản'
        },
        {
            id: 'india',
            title: 'Ấn Độ'
        },
        {
            id: 'paris',
            title: 'Pháp'
        },
        {
            id: 'korea',
            title: 'Hàn Quốc'
        },
        {
            id: 'england',
            title: 'Anh'
        },
        {
            id: 'hongkong',
            title: 'Hồng Kông'
        }
    ]

    const types = [
        {
            id: 'all',
            title: 'Tất cả'
        },
        {
            id: 'every',
            title: 'Mọi lứa tuổi'
        },
        {
            id: 'C13',
            title: 'C13'
        },
        {
            id: 'C16',
            title: 'C16'
        },
        {
            id: 'C18',
            title: 'C18'
        },
        {
            id: 'R',
            title: 'R'
        }
    ]

    const years = [
        {
            id: 'all',
            title: 'Tất cả'
        },
        {
            id: '1990',
            title: '1990'
        },
        {
            id: '1991',
            title: '1991'
        },
        {
            id: '1992',
            title: '1992'
        },
        {
            id: '1993',
            title: '1993'
        },
        {
            id: '1994',
            title: '1994'
        },
        {
            id: '1995',
            title: '1995'
        },
        {
            id: '1996',
            title: '1996'
        },
        {
            id: '1997',
            title: '1997'
        },
        {
            id: '1998',
            title: '1998'
        },
        {
            id: '1999',
            title: '1999'
        },
        {
            id: '2000',
            title: '2000'
        },
        {
            id: '2001',
            title: '2001'
        },
        {
            id: '2002',
            title: '2002'
        },
        {
            id: '2003',
            title: '2003'
        },
        {
            id: '2004',
            title: '2004'
        },
        {
            id: '2005',
            title: '2005'
        },
        {
            id: '2006',
            title: '2006'
        },
        {
            id: '2007',
            title: '2007'
        },
        {
            id: '2008',
            title: '2008'
        },
        {
            id: '2009',
            title: '2009'
        },
        {
            id: '2010',
            title: '2010'
        },
        {
            id: '2011',
            title: '2011'
        },
        {
            id: '2012',
            title: '2012'
        },
        {
            id: '2013',
            title: '2013'
        },
        {
            id: '2014',
            title: '2014'
        },
        {
            id: '2015',
            title: '2015'
        },
        {
            id: '2016',
            title: '2016'
        },
        {
            id: '2017',
            title: '2017'
        },
        {
            id: '2018',
            title: '2018'
        },
        {
            id: '2019',
            title: '2019'
        },
        {
            id: '2020',
            title: '2020'
        },
        {
            id: '2021',
            title: '2021'
        }

    ]

    return (
        <>
            <button className={isShow ? "filter is-show" : "filter not-show"} onClick={() => setIsShow(!isShow)}>
                <FilterList className="filter-icon" />
                <span className="filter-text">Bộ lọc</span>
            </button>

            {isShow &&
                <div className="filter-list">
                    <div className="filter-title">
                        <span className="title-text">Năm phát hành:</span>
                        <select className="filter-dropbox" value={state.year} onChange={(event) => handleChooseYear(event)}>
                            {years.map(item => <option value={item.title} key={item.id}>{item.title}</option>)}
                        </select>
                    </div>
                    <div className="filter-title">
                        <span className="title-text">Phân loại:</span>
                        <select className="filter-dropbox" value={state.type} onChange={(event) => handleChooseType(event)}>
                            {types.map(item => <option value={item.title} key={item.id}>{item.title}</option>)}
                        </select>
                    </div>
                    <div className="filter-title">
                        <span className="title-text">Quốc gia:</span>
                        <select className="filter-dropbox" value={state.country} onChange={(event) => handleChooseCountry(event)}>
                            {countrys.map(item => <option value={item.title} key={item.id}>{item.title}</option>)}
                        </select>
                    </div>
                </div>
            }
        </>
    )
}

export default Filters;

