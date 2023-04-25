import {Component} from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {logout} from '../../../features/auth/auth-reducer';
import {Header} from './Header';

type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
}

type MapDispatchToPropsType = {
    logout: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchToPropsType

class HeaderContainer extends Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout}/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {logout})(HeaderContainer);