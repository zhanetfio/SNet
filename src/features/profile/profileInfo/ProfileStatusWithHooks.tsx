import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Input} from 'antd';
import styles from './ProfileStatusWithHooks.module.css'

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div className={styles.status_title}>
                    <span>Status:</span> <span onDoubleClick={activateEditMode}> {props.status || '-----'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <Input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={status}/>
                </div>
            }
        </div>
    );
}
