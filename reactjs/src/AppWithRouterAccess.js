import React, { useState }  from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { useOktaAuth, Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import SignInSide from './User/SignInSide';
import SignUp from './User/SignUp';
import Main from './Main';
import Profile from './User/Profile';
import config from './User/app.config';
import Notfound from './Common/NotFound';


const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  return (
    <Security issuer={config.issuer}
              clientId={config.clientId}
              redirectUri={config.redirectUri}
              onAuthRequired={onAuthRequired}
              pkce={true} >
      <Switch>
        <Route path='/login' render={() => <SignInSide baseUrl={config.url} />} />
        <Route path='/signup' render={() => <SignUp baseUrl={config.url} />} />
        <Route path='/implicit/callback' component={LoginCallback} />
        <SecureRoute path='/scan' render={() => <Main url="scan" />} />
        <SecureRoute path='/receipt' render={() => <Main url="receipt" />} />
        <SecureRoute path='/' exact={true} render={() => <Main url="dashboard" />} />
        <Route component={Notfound} />
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
