import React from 'react';
import './App.css';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {Footer} from '../common/components/footer/Footer';
import HeaderContainer from '../common/components/header/HeaderContainer';
import {Preloader} from '../common/preloader/Preloader';
import store, {AppRootStateType} from './store';
import { HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import { notification} from 'antd';
import {withSuspense} from '../hocs/withSuspense';
import {LoginForm} from '../features/auth/Login';
import {Error404} from '../common/error/Error404';
import {Nav} from '../common/components/nav/Nav';
import {initializeApp} from './app-reducer';


const DialogsContainer = React.lazy(() => import('../features/dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('../features/profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('../features/users/UsersContainer'));

class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (promiseRejectionEvent:PromiseRejectionEvent) => {
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
     openNotificationWithIcon = (type: 'error') => {
         notification[type]({
             message: this.props.globalError
         });
     };

     componentDidUpdate() {
         if (this.props.globalError) {
             this.openNotificationWithIcon('error')
         }
     }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <div
                    className={'content-block'}>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to={'/login'}/>}/>
                        <Route path="/login" render={withSuspense(LoginForm)}/>
                        <Route path="/profile/:userId?"
                               render={withSuspense(ProfileContainer)}/>
                        <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                        <Route path="/users" render={withSuspense(UsersContainer)}/>
                        <Route path={'/*'} render={() => <div><Error404/></div>}/>
                    </Switch>
                </div>
                <Footer/>
            </div>

        );
    }
}

type MapStatePropsType = {
    initialized: boolean,
    globalError: string | null
}

type MapDispatchToPropsType = {
    initializeApp: () => void
}
export type AppPropsType = MapStatePropsType & MapDispatchToPropsType
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({

    initialized: state.app.initialized,
    globalError: state.app.globalError
})

let AppContainer = compose
    < React.ComponentType > (withRouter, connect<MapStatePropsType, MapDispatchToPropsType, {},
        AppRootStateType>(mapStateToProps, {initializeApp}))(App);

export const GeneralApp = () => {
    return <HashRouter >
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}