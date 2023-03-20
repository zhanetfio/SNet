import React, {useState} from 'react';
import style from './Nav.module.css'
import { Layout, Menu } from "antd";

import {
    ContactsOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, MessageOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Profile} from "../../../features/profile/Profile";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dialogs} from "../../../features/dialogs/Dialogs";
import {Contacts} from "../../../features/contacts/Contacts";
import {Login} from '../../../features/auth/Login';


const {Header, Sider} = Layout;

export const Nav = () => {
    const navigate=useNavigate()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined/>,
                                label: 'Profile',
                                onClick: (() => {navigate('/profile')})

                            },
                            {
                                key: '2',
                                icon: <MessageOutlined/>,
                                label: 'Dialogs',
                                onClick: (() => {navigate('/dialogs')})
                            },
                            {
                                key: '3',
                                icon: <ContactsOutlined/>,
                                label: 'Contacts',
                                onClick: (() => {navigate('/contacts')})
                            },
                        ]}
                    />
                </Sider>
                <Layout className={style.trigger}>
                    <Header style={{padding: 0, width: 20, background: '#f5f5f5'}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Routes>
                        <Route path={'/login'} element={<Login/>} />
                        <Route path={'/profile'} element={<Profile/>}/>
                        <Route path={'/dialogs'} element={<Dialogs/>}/>
                        <Route path={'/contacts'} element={<Contacts/>}/>

                    </Routes>

                    {/*<Content
                        style={{
                            display: 'flex',
                            margin: '10px 16px',
                            padding: 14,
                            minHeight: 200,
                            background: '#f5f5f5',
                        }}
                    >
                        <Row gutter={12} style={{flexFlow: 'nowrap'}}>
                            <Col span={12}>
                                <Avatar src="https://joesch.moe/api/v1/random?key=1" style={{marginRight: 20}}
                                        shape="square" size={150} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={12}>
                                <div className={style.about}>
                                    <Paragraph style={{fontSize: 20}}
                                               editable={{onChange: setEditableStr}}>{editableStr}</Paragraph>
                                    <span>Looking for a a job:</span>
                                    <TextArea value={'Description what looking for..'} bordered={false}/>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>You can find me:</div>
                                <Paragraph>LINKS</Paragraph>
                            </Col>
                        </Row>
                    </Content>*/}
                   {/* <ProfileInfo/>*/}
                    {/*<Content
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
                           <div className="space-align-container">
                            <div className="space-align-block">
                                <Space align="center">
                                    <Avatar size={32} icon={<UserOutlined/>}/>
                                    <Card title={"Name"} bordered={false} style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                        <span style={{display:'flex',alignItems:'flex-start'}}>It is first post</span>
                                    </Card>
                                    <LikeOutlined/><p>{5}</p>
                                </Space>

                            </div>
                        </div>
                        <div className="space-align-container">
                            <div className="space-align-block">
                                <Space align="center">
                                    <Avatar size={32} icon={<UserOutlined/>}/>
                                    <Card title={"Name"} bordered={false} style={{}}>
                                        <span>It is second post.I like react! I fong of frontend developering</span>
                                    </Card>
                                    <LikeOutlined/>
                                </Space>

                            </div>
                        </div>
                        <div className="space-align-container">
                            <div className="space-align-block">
                                <Space align="center">
                                    <Avatar size={32} icon={<UserOutlined/>}/>
                                    <Card title={"Name"} bordered={false} style={{}}>
                                        <span>It is last post  for testing posts</span>
                                    </Card>
                                    <LikeOutlined/>
                                </Space>

                            </div>
                        </div>
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
                    </Content>*/}
                    {/*<Posts/>*/}
                </Layout>
            </Layout>
        </div>
    );
};



