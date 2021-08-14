import ListPage from './components/ListPage';
import DetailsPage from './components/DetailsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function App() {
  return (
    <div >
      <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route  exact path="/">
            <ListPage />
          </Route>
          <Route path="/detailspage/:movie_id">
            <DetailsPage />
          </Route>
          <Route path="/listpage">
            <ListPage />
          </Route>
          
        </Switch>
      </div>
    </Router>
      
      
    </div>
  );
}

export default App;
