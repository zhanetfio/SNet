import React, {useState} from 'react';
import styles from './Post.module.css';
import {useAppSelector} from '../../../../common/hooks/hooks';
import {Avatar, Badge, Card} from 'antd';
import {LikeOutlined, UserOutlined} from '@ant-design/icons';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
const {Meta} = Card;

export const Post = (props: PostsType) => {
    const [likes, setLikes] = useState<number | null>(props.likesCount)

    const photo = useAppSelector(state => state.profilePage.profile.photos?.small)

    const addLikesCount = () => {
        setLikes(props.likesCount + 1)
    }
    console.log('likes: ' + likes)
    return (
        <div className={styles.item}>
            {photo
                ? <img src={photo} alt={'ava'}/>
                : <Avatar icon={<UserOutlined/>}/>
            }

            <Card style={{width: 300, marginTop: 0, padding: 0, textAlign: 'start'}}
                  actions={[
                      <Badge count={likes} offset={[10, 10]}
                             style={{backgroundColor: 'inherit', color: '#000'}}>
                          <LikeOutlined onClick={addLikesCount} key="likes"/>
                      </Badge>,
                  ]}
            >
                <Meta style={{color: '#000'}}
                      description={props.message}
                />
            </Card>
        </div>
    );
}
