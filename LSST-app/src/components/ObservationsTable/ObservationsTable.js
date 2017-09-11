import React, { Component } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { filterColors } from "../Utils/Utils"

class ObservationsTable extends Component {

    constructor() {
        super();
        this.state = {
            data: [{
                count: 1,
                request_time: 322000,
                fieldDec: -10,
                fieldRA: 33,
                filterName: "u",
                fieldID: 54,
                scienceType: "Dark matter"
            },{
                count: 1,
                request_time: 322000,
                fieldDec: -10,
                fieldRA: 33,
                filterName: "g",
                fieldID: 54,
                scienceType: "Dark matter"
            }
            ,{
                count: 1,
                request_time: 322000,
                fieldDec: -10,
                fieldRA: 33,
                filterName: "r",
                fieldID: 54,
                scienceType: "Dark matter"
            }
            ,{
                count: 1,
                request_time: 322000,
                fieldDec: -10,
                fieldRA: 33,
                filterName: "i",
                fieldID: 54,
                scienceType: "Dark matter"
            }
            ,{
                count: 1,
                request_time: 322000,
                fieldDec: -10,
                fieldRA: 33,
                filterName: "z",
                fieldID: 54,
                scienceType: "Dark matter"
            }
            ,{
                count: 1,
                request_time: 322000,
                fieldDec: -10,
                fieldRA: 33,
                filterName: "y",
                fieldID: 54,
                scienceType: "Dark matter"
            },]
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
                    data={data}
                    columns={[
                        {
                            Header: "Timestamp",
                            id: "request_time",
                            accessor: d => d.request_time
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
                            accessor: "scienceType"
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