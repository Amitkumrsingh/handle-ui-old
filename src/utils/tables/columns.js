export const filterColumns = (totalColumns, selectedColumns) => {
    let returnValue = [];
    selectedColumns.forEach((selected) => {
        totalColumns.forEach((column) => {
            if (column.title === selected) {
                returnValue.push(column);
            }
        })
    })
    return returnValue.length ? returnValue : totalColumns
}