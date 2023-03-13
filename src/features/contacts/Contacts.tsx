import React from 'react';
import {Layout} from "antd";

const {Content}=Layout;

export const Contacts = () => {
    return (
        <div>
            <Content style={{
                background: '#001529',
                borderRadius: 5,
                margin: '10px 16px',
                padding: 24,
            }}>
                <h1 style={{color: '#d7d7a7'}}>Users</h1>
            </Content>
        </div>
    );
};

