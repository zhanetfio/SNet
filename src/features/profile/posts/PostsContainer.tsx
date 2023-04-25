import {connect} from 'react-redux';
import {addPost} from '../profile-reducer';
import {AppDispatch, AppRootStateType} from '../../../app/store';
import {Posts} from './Posts';
import {PostsType} from './post/Post';

type mapStateToPropsType = {
    posts: Array<PostsType>
    messageForNewPost: string
}

type mapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}


let mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        messageForNewPost: state.profilePage.messageForNewPost
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): mapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPost(newPostText))
        },
    }
}

const PostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;