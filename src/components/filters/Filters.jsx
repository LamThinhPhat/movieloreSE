import './filters.scss'
import { FilterList } from '@material-ui/icons'
import { useState } from 'react'

function Filters() {
    const [isShow, setIsShow] = useState(false);

    const handleShowFilters = () => {
        setIsShow(!isShow);
    }

    const country = [
        {
            id: 'all',
            title: 'All'
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
            id: 'italy',
            title: 'Ý'
        },
        {
            id: 'hongkong',
            title: 'Hồng Kông'
        }
    ]

    const type = [
        {
            id: 'all',
            title: 'All'
        },
        {
            id: '15+',
            title: '15+'
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
            id: 'NC16',
            title: 'NC16'
        },
        {
            id: 'P',
            title: 'P'
        },
        {
            id: 'PG',
            title: 'PG'
        },
        {
            id: 'PG-13',
            title: 'PG-13'
        },
        {
            id: 'R',
            title: 'R'
        }
    ]

    const year = [
        {
            id: 'all',
            title: 'All'
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
            <button className={isShow ? "filter is-show" : "filter not-show"} onClick={() => handleShowFilters()}>
                <FilterList className="filter-icon" />
                <span className="filter-text">Bộ lọc</span>
            </button>

            {isShow &&
                <div className="filter-list">
                    <div className="filter-title">
                        <span className="title-text">Năm phát hành:</span>
                        <select className="filter-dropbox">
                            {year.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}
                        </select>
                    </div>
                    <div className="filter-title">
                        <span className="title-text">Phân loại:</span>
                        <select className="filter-dropbox">
                            {type.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}
                        </select>
                    </div>
                    <div className="filter-title">
                        <span className="title-text">Quốc gia:</span>
                        <select className="filter-dropbox">
                            {country.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}
                        </select>
                    </div>



                </div>
            }
        </>
    )
}

export default Filters;