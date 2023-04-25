import React, {Component,ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../app/store';
import {Redirect} from 'react-router-dom';

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {

    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T extends Component>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}
