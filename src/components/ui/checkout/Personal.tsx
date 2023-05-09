import { Input, Space } from 'antd';
import React, { useState } from 'react';

const Personal = ({ setData }) => {

    const handleInput = (e, type: string) => {
        if (e.target) {

        }
        setData(prev => ({...prev, type: e.target.value}))
    }

    return (
        <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
            <p style={{fontSize: '16pt'}}>Your personal information:</p>
            <div style={{display: 'flex', gap: '10px'}}>
                <Input placeholder="First name..." allowClear onChange={handleInput} />
                <Input placeholder="Last name..." allowClear onChange={handleInput} />
            </div>
            <Input placeholder="Phone number..." allowClear onChange={handleInput} />
        </div>
    );
};

export default Personal;