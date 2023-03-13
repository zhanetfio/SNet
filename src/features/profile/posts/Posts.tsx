import React from 'react';
import {Avatar, Badge, Button, Card, Input, Layout} from "antd";
import {DeleteOutlined, EditOutlined, LikeOutlined} from "@ant-design/icons";


const { Content} = Layout;
const {TextArea} = Input;
const {Meta} = Card;


export const Posts = () => {
    return (
        <div>
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
                <div style={{fontSize: 22,fontWeight:600,color:'#d7d7a7'}}>My Posts</div>
                <TextArea value={'Write something '}/>
                <Button  style={{margin: 5,backgroundColor:'#d7d7a7'}}>Add Post</Button>
                <>
                    <Card style={{width: 300, marginTop: 10, padding: 0, textAlign: 'start'}}
                          actions={[
                              <DeleteOutlined key="delete"/>,
                              <EditOutlined key="edit"/>,
                              <Badge count={5} offset={[10, 10]}
                                     style={{backgroundColor: 'inherit', color: '#000'}}>
                                  <LikeOutlined key="likes"/>
                              </Badge>,
                          ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1"/>}
                            title="Card title"
                            description="This is  last my post! I like React."
                        />
                    </Card>

                    <Card style={{width: 300, marginTop: 10, padding: 0, textAlign: 'start'}}
                          actions={[
                              <DeleteOutlined key="delete"/>,
                              <EditOutlined key="edit"/>,
                              <Badge count={7} offset={[10, 10]}
                                     style={{backgroundColor: 'inherit', color: '#000'}}>
                                  <LikeOutlined key="likes"/>
                              </Badge>,
                          ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1"/>}
                            title="Card title"
                            description="This is first my post"
                        />
                    </Card>
                </>
            </Content>
        </div>
    );
};
