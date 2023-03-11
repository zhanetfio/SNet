import React, {useState} from 'react';
import style from './Nav.module.css'
import {Avatar, Button, Card, Col, Input, Layout, Menu, Row, Space, Typography} from "antd";

import {
    ContactsOutlined, LikeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, MessageOutlined,
    UserOutlined,
} from "@ant-design/icons";


const {Header, Sider, Content} = Layout;
const {TextArea} = Input;
const {Paragraph} = Typography;

export const Nav = () => {
    const [collapsed, setCollapsed] = useState(false)


    const [editableStr, setEditableStr] = useState('Full Name');


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
                            },
                            {
                                key: '2',
                                icon: <MessageOutlined/>,
                                label: 'Dialogs',
                            },
                            {
                                key: '3',
                                icon: <ContactsOutlined/>,
                                label: 'Contacts',
                            },
                        ]}
                    />
                </Sider>
                <Layout className={style.trigger}>
                    <Header style={{padding: 0, width: 20, background: ' #fff '}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content
                        style={{
                            display: 'flex',
                            margin: '10px 16px',
                            padding: 14,
                            minHeight: 200,
                            background: '#fff',
                        }}
                    >
                        <Row gutter={12}>
                            <Col span={12}>
                                <Avatar style={{marginRight: 20}} shape="square" size={150} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={12}>
                                <div className={style.about}>

                                    <Paragraph style={{fontSize: 20}}
                                               editable={{onChange: setEditableStr}}>{editableStr}</Paragraph>
                                    <span>Looking for a a job:</span>
                                    <TextArea value={'Description what looking for..'}/>


                                </div>
                            </Col>
                            <Col span={12}>
                                <div>You can find me:</div>
                                <Paragraph>LINKS</Paragraph>

                            </Col>
                        </Row>
                    </Content>
                    <Content
                        style={{
                            margin: '10px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: 'darkgreen',
                        }}
                    >
                        <div>My Posts</div>
                        <hr/>
                        <TextArea value={'Write something '}/>
                        <Button>Add Post</Button>
                        <div className="space-align-container">
                            <div className="space-align-block">
                                <Space align="center">
                                    <Avatar size={32} icon={<UserOutlined/>} />
                                    <Card title={"Name"} bordered={false} style={{width:300}}>
                                        <span>It is first post</span>
                                    </Card>
                                    <LikeOutlined  />
                                </Space>
                            </div>
                        </div>

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};



