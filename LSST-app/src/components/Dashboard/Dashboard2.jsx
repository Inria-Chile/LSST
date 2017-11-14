import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Survey from '../Survey/Survey';
import Mirrors from '../Mirrors/Mirrors';
import Dome from '../Dome/Dome';
import {Responsive, WidthProvider} from 'react-grid-layout';
import './Dashboard2.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard2 extends Component {
    
    static viewComponents = [Survey, Mirrors];
    static viewConfigs = {
        survey: {
            x: 0, y: 0,
            width: 1920, height: 1080,
            visible: true,
        },
        mirrors: {
            x: 0, y: 0,
            width: 500, height: 1080,
            visible: true,
        },
        dome: {
            x: 0, y: 0,
            width: 500, height: 1080,
            visible: true,
        },
    }

    constructor(props){
        super(props);
        let componentVisibility = {};
        Object.keys(Dashboard2.viewConfigs).forEach((key) =>{
            if(Dashboard2.viewConfigs[key] && Dashboard2.viewConfigs[key].visible)
                componentVisibility[key] = Dashboard2.viewConfigs[key].visible;
        });
        this.dashboardNode = null;
        this.state = {
            draggable: false,
            componentVisibility: componentVisibility,
            parentNode: null
        }
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
                            <Survey parentNode={this.state.dashboardNode} />
                        </div>
                        <div key="b" data-grid={{x: 6, y: 0, w: 2, h: 12}}>
                            <Mirrors />
                        </div>
                        <div key="c" data-grid={{x: 8, y: 0, w: 4, h: 19}}>
                            <Dome />
                        </div>
                    </ResponsiveReactGridLayout>
                </div>
            </div>
        );
    }
}

export default Dashboard2;
