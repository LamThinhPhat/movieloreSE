import Topbar from "../../components/topbar/Topbar"
import "./home.scss"
import Menubar from "../../components/menubar/Menubar"
import Review from '../../components/review/Review'
import AddPost from "../../components/addPost/AddPost"
import DetailPost from "../../components/detailPost/DetailPost"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

function Home() {
    return (
        <Router>
            <div className="home-background">
                <Topbar />
                <div className="home-container">
                    <Switch>
                        <Route path="/" exact>
                            <Menubar />
                            <Review />
                        </Route>

                        <Route path="/add">
                            <AddPost />
                        </Route>

                        <Route path="/detail/:id">
                            <DetailPost />
                        </Route>

                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default Home;