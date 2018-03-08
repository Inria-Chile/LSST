import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Survey from '../Survey/Survey';
import Toolbar from './Toolbar/Toolbar';
import Mirrors from '../Mirrors/Mirrors';
import Dome from '../Dome/Dome';
import Rnd from 'react-rnd';
import './Dashboard.css';

class Dashboard extends Component {

    static viewComponents = [Survey, Mirrors, Dome];
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
        Object.keys(Dashboard.viewConfigs).forEach((key) =>{
            if(Dashboard.viewConfigs[key] && Dashboard.viewConfigs[key].visible)
                componentVisibility[key] = Dashboard.viewConfigs[key].visible;
        });
        this.dashboardNode = null;
        this.state = {
            draggable: false,
            componentVisibility: componentVisibility
        }
    }

    toggleComponentVisibility = (comp) => {
        console.log(comp);
        let componentVisibility = this.state.componentVisibility;
        componentVisibility[comp] = !componentVisibility[comp];
        this.setState({
            componentVisibility: componentVisibility
        });
    }

    toggleDraggable = () => {
        console.log(this.state.draggable)
        this.setState({
            draggable: !this.state.draggable
        });
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
                <div id="dashboard-toolbar">
                    <Toolbar draggableActive={this.state.draggable} 
                            availableComponents={Dashboard.viewComponents} 
                            componentVisibility={this.state.componentVisibility} 
                            toggleDraggable={this.toggleDraggable}
                            toggleComponentVisibility={this.toggleComponentVisibility}/>
                </div>
                <div id="dashboard-content">
                    {
                        this.state.componentVisibility['survey'] ? 
                        (<Rnd default={{
                            x: 0,
                            y: 0,
                            width: 1920,
                            height: 1080,
                            }}
                            dragGrid={ [20,20]}
                            resizeGrid={ [20,20]}
                            disableDragging={!this.state.draggable}
                            enableResizing={this.state.draggable ? undefined : false}
                            className={this.state.draggable ? 'draggable' : ''}
                        >
                            <Survey parentNode={this.state.dashboardNode} />
                        </Rnd>) :
                        <div></div>
                    }
                    {
                        this.state.componentVisibility['mirrors'] ? 
                        (
                        <Rnd default={{
                            x: 1920,
                            y: 100,
                            width: 600,
                            height: 1080,
                            }}
                            dragGrid={ [20,20]}
                            resizeGrid={ [20,20]}
                            disableDragging={!this.state.draggable}
                            enableResizing={this.state.draggable ? undefined : false}
                            className={this.state.draggable ? 'draggable' : ''}
                        >
                            <Mirrors/>
                        </Rnd>) :
                        <div></div>
                    }
                    {
                        this.state.componentVisibility['dome'] ? 
                        (
                        <Rnd default={{
                            x: 1920+600,
                            y: 100,
                            width: 1100,
                            height: 1330,
                            }}
                            dragGrid={ [20,20]}
                            resizeGrid={ [20,20]}
                            disableDragging={!this.state.draggable}
                            enableResizing={this.state.draggable ? undefined : false}
                            className={this.state.draggable ? 'draggable' : ''}
                        >
                            <Dome/>
                        </Rnd>) 
                        : 
                        <div></div>
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;
