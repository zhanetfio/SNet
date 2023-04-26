import React from 'react';
import styles from './Posts.module.css';
import {Post, PostsType} from './post/Post';
import {AddNewPostFormRedux} from './addNewPostForm/AddNewPostFormRedux';
import {Layout} from 'antd';


type PropsType = {
    posts: Array<PostsType>
    messageForNewPost: string
    addPost: (postMessage: string) => void
}
const {Content} = Layout;

export const Posts = React.memo((props: PropsType) => {

    const postsElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} id={p.id} message={p.message}
                        likesCount={p.likesCount}/>)

    const onAddPost = (values: { newPostText: string }) => {
        props.addPost(values.newPostText)
        values.newPostText = ''
    }

    return (
        <div className={styles.postsBlock}>
            <Content
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '10px 16px',
                    padding: 24,
                    borderRadius: 5,
                    background: '#001529',
                }}
            >
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={styles.posts}>
                    {postsElements}
                </div>
            </Content>
        </div>

    );
})
