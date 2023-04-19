import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import ReactDOM from 'react-dom';

import { LOGIN, DASHBOARD, NOTFOUND } from './utils/routes';

import { LoginScreen } from './screens/login';
import { DashboardScreen } from './screens/dashboard';
import { NotFoundScreen } from './screens/notFound';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { launchBannerFlagKey, profileSectionFlagKey, detailsCtaFlagKey } from './feature-flag-config';
import PrivateRoute from './components/privateroute';
import PublicRoute from './components/publicroute';

import './index.css';

const renderApp = async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID || '',
    context: {
      "kind": "user",
      "key": "user",
      "name": "Jigar Surati",
      "email": "jigar.m.surati@doyenhub.com"
    },
    options: {
      bootstrap: "localStorage"
    },
    reactOptions: {
      useCamelCaseFlagKeys: false
    },
    deferInitialization: false,
    flags: {
      [launchBannerFlagKey]: false,
      [profileSectionFlagKey]: 0,
      [detailsCtaFlagKey]: ''
    }
  });

  ReactDOM.render(
    <React.StrictMode>
      <LDProvider>
        <Router>
          <Switch>
            <PublicRoute exact path={LOGIN} component={LoginScreen} />
            <PrivateRoute exact path={DASHBOARD} component={DashboardScreen} />
            <Route exact path={NOTFOUND} component={NotFoundScreen} />
            <Route component={() => <Redirect to={LOGIN} />} />
          </Switch>
        </Router>
      </LDProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

renderApp();
