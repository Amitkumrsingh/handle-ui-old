import React from 'react';
import { CreateForm } from '../../utils'
import { Modal } from '@material-ui/core';

export default function CasteForm({
    open,
    closeModal,
    initialValues = {},
    schema,
    onSubmit,
    formTitle,
    fieldGroups,
    classes
}) {
    let CasteForm = CreateForm({
        initialValues,
        onSubmit,
        schema,
        formTitle,
        fieldGroups,
    })
    return (
        <Modal
            open={open}
            className={classes.modal}
        >
            <div style={{ position: 'relative', padding: 20, margin: 20, outline: "none" }}>
                <div style={{
                    position: 'absolute',
                    top: 40,
                    right: 40,
                    cursor: 'pointer'
                }} onClick={closeModal}>X</div>
                <CasteForm />
            </div>

        </Modal>
    )
}