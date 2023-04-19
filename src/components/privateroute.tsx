import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isLogin } from '../utils';
import { LOGIN } from '../utils/routes';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any,
}
const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to={LOGIN} />
        )} />
    );
};

export default PrivateRoute;
