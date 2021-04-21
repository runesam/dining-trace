import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { HomeComponent } from './components/home';

export const RouterComponent = () => (
    <Router>
        <Switch>
            <Route path="order-affected-customers">
                {() => 'customers affected page goes here'}
            </Route>
            <Route path="/">
                <HomeComponent />
            </Route>
        </Switch>
    </Router>
);
