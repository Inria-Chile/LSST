import React, { Component } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { filterColors } from "../Utils/Utils"

class ObservationsTable extends Component {

    constructor() {
        super();
        this.state = {
            data: [{}]
        };
        console.log('ObservationsTable', filterColors);
    }

    setData = (data) => {
        this.setState({
            data: data,
        })
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <ReactTable
                    sortable={false}
                    data={this.props.selectedField === null ? [] : [this.props.selectedField]}
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
                                        transition: 'all .3s ease'
                                    }}>
                                    {
                                        row.value 
                                    }
                                    </div> 
                            )
                        },
                        {
                            Header: "Science type",
                            accessor: "lst"
                        }
                    ]}
                    defaultPageSize={data.length}
                    style={{
                        height: "130px" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight"
                    showPaginationBottom={false}
                />
            </div>
        );
    }
}

export default ObservationsTable;