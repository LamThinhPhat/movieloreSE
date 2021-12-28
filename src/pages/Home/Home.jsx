import Topbar from "../../components/topbar/Topbar";
import "./home.scss"
import Menubar from "../../components/menubar/Menubar"


function Home() {
    return (
        <div className="home-background">
            <Topbar />
            <div className="home-container">
                <Menubar />
            </div>
        </div>
    )
}

export default Home;