import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Survey from '../Survey/Survey';
import Mirrors from '../Mirrors/Mirrors';
import Dome from '../Dome/Dome';
import Environment from '../Environment/Environment';
import FieldDetails from '../Survey/FieldDetails/FieldDetails';
import {Responsive, WidthProvider} from 'react-grid-layout';
import './Dashboard2.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard2 extends Component {
    
    static viewComponents = [Survey, Mirrors];

    constructor(props){
        super(props);
        this.state = {
            showFieldDetails: false,
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

    render() {
        let layout = [
            {i: 'a', x: 0, y: 0, w: 6, h: 5},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
          ];
        return (
            <div id="dashboard" ref={(dashboard) => {
                if(!this.state.dashboardNode){
                    this.setState({
                        dashboardNode: dashboard
                    })
                }
            }}>
                <div id="dashboard-content2">
                    <ResponsiveReactGridLayout className="layout" layout={layout} rowHeight={90} width={3840}
                        breakpoints={{lg: 3200, md: 996, sm: 768, xs: 480, xxs: 0}} draggableHandle={'.move-button'}
                        cols={{lg: 12, md: 6, sm: 6, xs: 6, xxs: 6}}>

                        <div key="a" data-grid={{x: 0, y: 0, w: 6, h: 10}}>
                            <Survey parentNode={this.state.dashboardNode} 
                                    setFieldDetailsVisibility={this.setFieldDetailsVisibility} 
                                    showFieldDetails={this.state.showFieldDetails}
                                    setSelectedFieldData={this.setSelectedFieldData}/>
                        </div>
                        <div key="b" data-grid={{x: 6, y: 0, w: 2, h: 12}}>
                            <Mirrors />
                        </div>
                        <div key="c" data-grid={{x: 8, y: 0, w: 4, h: 20}}>
                            <Dome />
                        </div>
                        <div key="d" data-grid={{x: 0, y: 10, w: 3, h: 5}}>
                            <Environment />
                        </div>
                    </ResponsiveReactGridLayout>
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
