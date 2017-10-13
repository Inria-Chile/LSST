import React, { PureComponent } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './ObservationsTable.css';
import { filterColors, lstToscienceProposal, decreaseBrightness } from "../Utils/Utils";
import { Scrollbars } from "react-custom-scrollbars";

class ObservationsTable extends PureComponent {

    constructor() {
        super();
        this.state = {
            clickedData: [{}]
        };
    }

    render() {
        let timestampColWidth = 150;
        let filterColWidth = 120;
        return (
            <div className="observations-table-wrapper">
                <div style={{height: '35px'}}>
                <ReactTable
                        sortable={false}
                        data={[]}
                        columns={[
                            {
                                Header: "Timestamp",
                                id: "expDate",
                                maxWidth: timestampColWidth,
                                headerStyle: {textAlign: 'left'}
                            },
                            {
                                Header: "Filter",
                                maxWidth: filterColWidth,
                                headerStyle: {textAlign: 'left'}
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
                <div style={{height: 'calc(100% - 35px)'}}>
                <Scrollbars className='scrollbar'
                    style={{ height: '100%' }}>
                    <ReactTable
                        sortable={false}
                        data={this.props.clickedField === null ? [] : [...this.props.clickedField]}
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
                                            border: decreaseBrightness(filterColors[row.value], 1.3) + ' solid 2px'
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
                                accessor: d => d.lst ? lstToscienceProposal(d.lst) : ''
                            }
                        ]}
                        defaultPageSize={9}
                        pageSize={this.props.clickedField === null || this.props.clickedField.length < 9 ? 9 : this.props.clickedField.length}
                        className="-highlight -no-header"
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