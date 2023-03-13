import React from 'react';
import {Col, Layout, List, Row} from "antd";

const {Content} = Layout;

const fakeData = [
    'Anna',
    'Lena',
    'Sveta',
    'Dima',
    'Sergey'

];

export const Dialogs = () => {
    return (
        <div>
            <Row gutter={8}>
                <Col flex={4}>
                    <Content style={{
                        background: '#001529',
                        borderRadius: 5,
                        margin: '10px 16px',
                        padding: 24,
                    }}>
                        <h1 style={{color: '#d7d7a7'}}>Dialogs</h1>
                    </Content>
                </Col>
                <Col flex={1}>
                    <Content style={{
                        background: '#f5f5f5',
                        borderRadius: 5,
                        margin: '10px 16px',

                    }}>

                        <List
                            size="small"
                            header={<h1 style={{color: '#001529'}}>Users</h1>}
                            bordered
                            dataSource={fakeData}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />

                    </Content>
                </Col>
            </Row>
        </div>
    );
};

