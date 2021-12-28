import Topbar from "../../components/topbar/Topbar"
import "./home.scss"
import Menubar from "../../components/menubar/Menubar"
import Review from '../../components/review/Review'

function Home() {
    return (
        <div className="home-background">
            <Topbar />
            <div className="home-container">
                <Menubar />
                <Review />
            </div>
        </div>
    )
}

export default Home;