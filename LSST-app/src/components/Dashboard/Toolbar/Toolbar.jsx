import React, { Component } from 'react';
import ArrowMove from 'react-icons/lib/ti/arrow-move';
import './Toolbar.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'; 

class Toolbar extends Component {

    render() {
        return (
            <div id="toolbar">
                <div className={'toolbar-icon-wrapper' + (!this.props.draggableActive ? ' selected' : '')}>
                    <ArrowMove className={'toolbar-icon' + (!this.props.draggableActive ? ' selected' : '')} onClick={this.props.toggleDraggable}/>
                </div>
                {
                    this.props.availableComponents.map((comp) => {
                        console.log(this.props.componentVisibility)
                        return (
                            <div key={comp.viewName+'Div'} 
                                className={'toolbar-icon-wrapper' + (!this.props.componentVisibility[comp.viewName] ? ' selected' : '')}
                                onClick={this.props.toggleComponentVisibility}>
                                <span>{this.props.componentVisibility[comp.viewName] ? comp.viewName : 'hidden'}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Toolbar;
