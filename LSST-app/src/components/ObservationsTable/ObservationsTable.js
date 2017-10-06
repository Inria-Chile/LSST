import React, { Component } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './ObservationsTable.css';
import { filterColors, lstToTypeOfScience } from "../Utils/Utils";
import { Scrollbars } from "react-custom-scrollbars";

class ObservationsTable extends Component {

    constructor() {
        super();
        this.state = {
            data: [{}],
            clickedData: [{}]
        };
    }

    setData = (data) => {
        this.setState({
            data: [...data, ...data],
        })
        console.log('setData', this.state.data);
    }

    render() {
        let timestampColWidth = 150;
        let filterColWidth = 150;
        return (
            <div className="observations-table-wrapper">
                <div style={{height: '30px'}}>
                <ReactTable
                        sortable={false}
                        data={[]}
                        columns={[
                            {
                                Header: "Timestamp",
                                id: "expDate",
                                maxWidth: timestampColWidth
                            },
                            {
                                Header: "Filter",
                                maxWidth: filterColWidth
                            },
                            {
                                Header: "Science proposals",
                            }
                        ]}
                        defaultPageSize={0}
                        pageSize={0}
                        className="-striped -highlight"
                        showPaginationBottom={false}
                        noDataText=""
                    />
                </div>
                <div style={{height: 'calc(100% - 30px)'}}>
                <Scrollbars
                    style={{ height: '100%' }}>
                    <ReactTable
                        sortable={false}
                        data={this.props.clickedField === null ? [] : [...this.props.clickedField,...this.props.clickedField, ...this.props.clickedField,  ...this.props.clickedField]}
                        columns={[
                            {
                                Header: "Timestamp",
                                id: "expDate",
                                accessor: d => d.expDate,
                                maxWidth: timestampColWidth
                            },
                            {
                                Header: "Filter",
                                accessor: "filterName",
                                Cell: row => (
                                        <div style={{
                                            width: '80%',
                                            backgroundColor: filterColors[row.value ] ? filterColors[row.value ]
                                                : "#000000",
                                            textAlign: "center",
                                            borderRadius: '2px',
                                            margin: '0px 10px'
                                        }}>
                                        {
                                            row.value 
                                        }
                                        </div> 
                                ),
                                maxWidth: filterColWidth
                            },
                            {
                                Header: "Science proposals",
                                id: "lst",
                                accessor: d => d.lst ? lstToTypeOfScience(d.lst) + ' ' + d.lst : ''
                            }
                        ]}
                        defaultPageSize={9}
                        pageSize={this.props.clickedField === null || 3*this.props.clickedField.length < 9 ? 9 : 3*this.props.clickedField.length}
                        className="-striped -highlight -no-header"
                        showPaginationBottom={false}
                        noDataText=""
                        
                    />
                </Scrollbars>
                </div>
            </div>
        );
    }
}

export default ObservationsTable;