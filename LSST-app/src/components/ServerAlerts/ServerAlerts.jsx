import React, { Component } from 'react';
import Rack from './Rack/Rack';
import './SeverAlerts.css';

class ServerAlerts extends Component {
    constructor(props){
        super(props);
        this.ncols = 8;
        this.nrows = 2;
        this.margin = { top: 20, right: 10, bottom: 20, left: 20 }
        this.structureWidth = 5;
        this.verticalSplit = 30;
        this.horizontalSplit = 150;
        this.offset=20;
    }
    
    render() {
        let totalWidth = window.innerWidth-this.margin.left-this.margin.right-this.offset;
        let totalHeight = window.innerHeight-this.margin.top - this.margin.bottom-this.offset;
        let rackWidth = (totalWidth-(this.ncols)*this.verticalSplit)/(this.ncols);
        let rackHeight = (totalHeight-(this.nrows)*this.horizontalSplit)/this.nrows;

        let x = [];
        let xstart = this.margin.left;
        for(let i = 0; i<this.ncols; i++){
            x[i]=xstart;
            xstart=xstart+rackWidth+this.verticalSplit;
        }
        let y=[];
        let ystart = this.margin.top+this.horizontalSplit;
        for(let i=0; i<this.nrows;i++){
            y[i]=ystart;
            ystart = ystart+rackHeight+this.horizontalSplit;
        }

        return (
            <div className="server-alerts-container" ref="container">
                <div className ="row">
                    <div className ="col-md-12">
                        <svg 
                        className="svg-container"
                        height = {window.innerHeight}
                        width = {window.innerWidth}
                        x = {this.margin.left}
                        y = {this.margin.bottom}>
                       
                            {
                                x.map((xpos, indexX)=>{
                                   return(
                                       y.map((ypos, indexY)=>{
                                           return(
                                            <Rack
                                           x={xpos}
                                           y={ypos}
                                           width={rackWidth}
                                           height={rackHeight}
                                           structureWidth={this.structureWidth}
                                           indexX = {indexX+1}
                                           indexY = {indexY}
                                           />
                                           )
                                    
                                       })
                                   )
                                })
                            }
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}
export default ServerAlerts;