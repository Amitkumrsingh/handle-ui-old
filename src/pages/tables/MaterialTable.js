import React, { PureComponent } from 'react';
import { Card } from "@material-ui/core";
import MaterialTable from 'material-table';
import tableIcons from "./tableIcons";


class Table extends PureComponent {
  state = {
    selectedRow: null
  }
  render() {
    const { columns, tableDataItems, header } = this.props;
    const data = tableDataItems ? tableDataItems.map(o => ({ ...o })) : [];
    return (
      <React.Fragment>
        <Card style={{ width: '100%' }}>
          <MaterialTable
            icons={tableIcons}
            title={header}
            columns={columns}
            data={data}
            actions={[
              {
                icon: tableIcons.Delete,
                tooltip: 'Delete User',
                onClick: (event, rowData) => console.log(rowData)
              }
            ]}
            onRowClick={((evt, selectedRow) => this.setState({ selectedRow: selectedRow.tableData.id }))}
            options={{
              actionsColumnIndex: -1,
              //filtering: true,
              exportButton: true,
              exportAllData: true,
              selection: true,
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF',
                padding: '14px',
              },
              cellStyle: {
                padding: '8px',
              },
              rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                padding: '8px',
              })
            }}
          />
        </Card>
      </React.Fragment>
    );
  }
}

export default Table;