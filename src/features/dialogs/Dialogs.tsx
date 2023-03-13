import React from 'react';
import {Layout} from "antd";

const {Content} = Layout;

export const Dialogs = () => {
    return (
        <div>
            <Content style={{
                background: '#001529',
                borderRadius: 5,
                margin: '10px 16px',
                padding: 24,
            }}>
                <h1 style={{color: '#d7d7a7'}}>Dialogs</h1>
            </Content>
        </div>
    );
};

