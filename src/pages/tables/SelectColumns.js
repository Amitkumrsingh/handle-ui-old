import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, TextField, MenuItem, Checkbox, ListItemText, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 350,
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function SelectColumns({
    tableColumns,
    setSelectedColumns
}) {
    const classes = useStyles();
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        setSelectedColumns(columns);
    }, [columns]);


    const handleChange = (event) => {
        setColumns(event.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                multiple
                input={<TextField />}
                onChange={handleChange}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                value={columns}
                label="Select Columns"
            >
                {tableColumns.filter(column => column.title !== "Actions").map((column) => (
                    <MenuItem key={column.title} value={column.title}>
                        <Checkbox checked={columns.indexOf(column.title) > -1} />
                        <ListItemText primary={column.title} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default SelectColumns; 