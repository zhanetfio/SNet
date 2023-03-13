import React, {useState} from 'react';
import {Avatar, Card, Col, Input, Layout, Row, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import style from "../../../common/components/nav/Nav.module.css";


const { Content} = Layout;
const {TextArea} = Input;
const {Paragraph} = Typography;


export const ProfileInfo = () => {
    const [editableStr, setEditableStr] = useState('Full Name');
    return (
        <div>
            <Content
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
            </Content>
        </div>
    );
};
