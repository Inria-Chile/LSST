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
            data: data,
        })
    }

    render() {
        return (
            <div className="observations-table-wrapper">
                <Scrollbars
                    style={{ height: 130 }}>
                    <ReactTable
                        sortable={false}
                        data={this.props.clickedField === null ? [] : this.props.clickedField}
                        columns={[
                            {
                                Header: "Timestamp",
                                id: "expDate",
                                accessor: d => d.expDate
                            },
                            {
                                Header: "Filter",
                                accessor: "filterName",
                                Cell: row => (
                                        <div style={{
                                            width: '100%',
                                            backgroundColor: filterColors[row.value ] ? filterColors[row.value ]
                                                : "#000000",
                                            textAlign: "center",
                                            borderRadius: '2px',
                                        }}>
                                        {
                                            row.value 
                                        }
                                        </div> 
                                )
                            },
                            {
                                Header: "Science type",
                                id: "lst",
                                accessor: d => d.lst ? lstToTypeOfScience(d.lst) + ' ' + d.lst : ''
                            }
                        ]}
                        defaultPageSize={0}
                        pageSize={this.props.clickedField === null ? 0 : this.props.clickedField.length}
                        className="-striped -highlight"
                        showPaginationBottom={false}
                        noDataText=""
                        
                    />
                </Scrollbars>
            </div>
        );
    }
}

export default ObservationsTable;