import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { HomeComponent } from './components/home';
import { OrderAffectedCustomersComponent } from './components/order-affected-customers';

export const RouterComponent = () => (
    <Router>
        <Switch>
            <Route path="/order-affected-customers/:orderId" component={OrderAffectedCustomersComponent} />
            <Route path="/" component={HomeComponent} />
        </Switch>
    </Router>
);
