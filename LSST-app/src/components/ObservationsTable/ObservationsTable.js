import React, { PureComponent } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './ObservationsTable.css';
import { lstToscienceProposal } from "../Utils/Utils";
import { Scrollbars } from "react-custom-scrollbars";
import {lsstToJs} from '../Utils/Utils'
import FilterIndicator from '../Utils/FilterIndicator/FilterIndicator';

class ObservationsTable extends PureComponent {

    constructor() {
        super();
        this.state = {
            clickedData: [{}]
        };
    }

    render() {
        let timestampColWidth = 250;
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
                                accessor: (d) => {
                                    let date2 = new Date(lsstToJs(d.expDate));
                                    return date2.toDateString() + ' ' + date2.toLocaleTimeString();
                                },
                                maxWidth: timestampColWidth
                            },
                            {
                                Header: "Filter",
                                accessor: "filterName",
                                Cell: row => (
                                        <FilterIndicator style={{width: '80%', textAlign: "center"}} filterName={row.value}/>
                                ),
                                maxWidth: filterColWidth
                            },
                            {
                                Header: "Science proposals",
                                id: "lst",
                                accessor: d => d.lst ? lstToscienceProposal(d.lst) : ''
                            }
                        ]}
                        defaultPageSize={11}
                        pageSize={this.props.clickedField === null || this.props.clickedField.length < 10 ? 10 : 10}
                        /* pageSize={this.props.clickedField === null || this.props.clickedField.length < 11 ? 11 : this.props.clickedField.length} */
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