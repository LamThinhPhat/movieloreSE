import Topbar from "../../components/topbar/Topbar"
import "./home.scss"
import Menubar from "../../components/menubar/Menubar"
import Review from '../../components/review/Review'
import AddPost from "../../components/addPost/AddPost"
import DetailPost from "../../components/detailPost/DetailPost"
import Login from "../../components/login/Login"
import Register from "../../components/register/Register"
import Profile from "../../components/profile/Profile"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

function Home() {

    return (
        <Router>

            <Switch>
                <Route path="/" exact>
                    <div className="home-background">
                        <Topbar />
                        <div className="home-container">
                            <Menubar />
                            <Review />
                        </div>
                    </div>
                </Route>

                <Route path="/add">
                    <div className="home-background">
                        <Topbar />
                        <div className="home-container">
                            <AddPost />
                        </div>
                    </div>
                </Route>

                <Route path="/detail/:id">
                    <div className="home-background">
                        <Topbar />
                        <div className="home-container">
                            <DetailPost />
                        </div>
                    </div>
                </Route>

                <Route path="/profile">
                    <div className="home-background">
                        <Topbar />
                        <Profile />
                    </div>
                </Route>

                <Route path="/login">
                    <div className="home-background" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Login />
                    </div>
                </Route>

                <Route path="/register">
                    <div className="home-background" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Register />
                    </div>
                </Route>

            </Switch>

        </Router>
    )
}

export default Home;