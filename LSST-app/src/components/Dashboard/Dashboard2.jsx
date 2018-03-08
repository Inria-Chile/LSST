import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Survey from '../Survey/Survey';
import Mirrors from '../Mirrors/Mirrors';
import Dome from '../Dome/Dome';
import Environment from '../Environment/Environment';
import FieldDetails from '../Survey/FieldDetails/FieldDetails';
import {Responsive, WidthProvider} from 'react-grid-layout';
import './Dashboard2.css';
const ReactGridLayout = WidthProvider(Responsive);

class Dashboard2 extends Component {
    
    static viewComponents = [Survey, Mirrors];
    static layout = {
        'survey': {i: 'survey', x: 0, y: 0, w: 6, h: 10},
        'mirrors': {i: 'mirrors', x: 6, y: 0, w: 2, h: 12},
        'dome': {i: 'dome', x: 8, y: 0, w: 4, h: 20},
        'environment': {i: 'environment', x: 0, y: 10, w: 3, h: 3}
    };
    constructor(props){
        super(props);
        this.state = {
            showFieldDetails: false,
            environmentOpenRows: 0,
            layout: Object.values(Dashboard2.layout),
        }
    }

    setFieldDetailsVisibility = (visibility) => {
        this.setState({
            showFieldDetails: visibility,
        });
    }

    setSelectedFieldData = (data) => {
        this.setState({
            selectedFieldData: data
        });
    }

    setComponentHeight = (component, height) => {
        let newLayout = JSON.parse(JSON.stringify(this.state.layout));
        newLayout.map((l, i) => {
            if(l.i === component)
                newLayout[i] = {...newLayout[i], h:height};
            return l;
        });
        this.setState({
            layout: newLayout
        });
    }

    setEnvironmentOpenRows = (rows) => {
        this.setComponentHeight('environment', 3+rows);
    }

    onLayoutChange = (layout) => {
        this.setState({layout: layout});
    }

    render() {
        return (
            <div id="dashboard" ref={(dashboard) => {
                if(!this.state.dashboardNode){
                    this.setState({
                        dashboardNode: dashboard
                    })
                }
            }}>
                <div id="dashboard-content2">
                    <ReactGridLayout className="layout" layouts={{lg: this.state.layout}} rowHeight={90} width={3840}
                        breakpoints={{lg: 3200, md: 996, sm: 768, xs: 480, xxs: 0}} draggableHandle={'.move-button'}
                        cols={{lg: 12, md: 6, sm: 6, xs: 6, xxs: 6}} onLayoutChange={this.onLayoutChange}>

                        <div key="survey">
                            <Survey parentNode={this.state.dashboardNode} 
                                    setFieldDetailsVisibility={this.setFieldDetailsVisibility} 
                                    showFieldDetails={this.state.showFieldDetails}
                                    setSelectedFieldData={this.setSelectedFieldData}/>
                        </div>
                        <div key="mirrors">
                            <Mirrors />
                        </div>
                        <div key="dome">
                            <Dome />
                        </div>
                        <div key="environment">
                            <Environment setOpenRows={this.setEnvironmentOpenRows}/>
                        </div>
                    </ReactGridLayout>
                </div>
                    {
                        this.state.showFieldDetails ? 
                        <FieldDetails fieldData={this.state.selectedFieldData}
                                        setFieldDetailsVisibility={this.setFieldDetailsVisibility}
                                        showFieldDetails={this.state.showFieldDetails}/>
                        :
                        ''
                    }
            </div>
        );
    }
}

export default Dashboard2;
