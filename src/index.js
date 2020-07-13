import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Camera from './component/camera/index';
import NotFound from './component/error/notFound';

import './styles/app.scss';

const App = () => (
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact component={Camera} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));