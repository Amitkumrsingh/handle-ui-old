import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

export const getColumns = (handleEdit, handleDelete) => {
    return [
        { title: 'Id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Created At', field: 'created_at' },
        {
            title: 'Actions',
            field: 'actions',
            filtering: false,
            export: false,
            render: rowData => {
                return (
                    <div style={{ display: "flex" }}>
                        <Tooltip title="Edit" onClick={(e) => handleEdit(rowData)} >
                            <IconButton aria-label="edit">
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" onClick={(e) => handleDelete(rowData)} >
                            <IconButton aria-label="delete">
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
};