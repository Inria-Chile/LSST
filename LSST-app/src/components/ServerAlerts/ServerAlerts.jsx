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
        this.rackNames = ['WAN','LAN','LAN','Wiring','General','AUX Telescope','DQ','CAMERA','CAMERA',
        'CAMERA','CAMERA','EFD','EFD','TCS/OCS','TCS/OCS','TCS/OCS'];
        this.hasPdu = [true, false,true,false,true,true,false,false,true,true,true,true,true,true,true,true]
        this.rackItems = [
            //Rack 01
            [{name:'Patch Panel', size:1, position: 3},
            {name:'DWDM', size:5, position: 4} ],
            //Rack 02
            [{name:'Spine 201', size:2, position: 0},
            {name:'Patch Panel', size:0.5, position: 2},
            {name:'Spine 202', size:2, position: 3.5},
            {name:'Patch Panel', size:0.5, position: 5.5},
            {name:'APICS', size:2, position: 6}],
            //Rack 03
            [{name:'Firewall', size:0.7, position:0},
            {name:'Router', size:0.7, position: 0.7},
            {name:'WLAN', size:1, position: 1.4},
            {name:'voip', size:2, position: 2.4}],
            //Rack 04
            [{name:'Patch Panels', size:4.5, position: 0}],
            //Rack 05
            [{name:'Leaf 101', size:0.5, position: 0},
            {name:'Leaf 102', size:0.5, position: 0.5},
            {name:'MMCS', size:2, position: 1}],
            //Rack 06
            [{name:'IPMI', size:2.5, position: 0},
            {name:'AUX Calibration', size:0.5, position: 2.5},
            {name:'AUX Scheduler', size:0.5, position: 3},
            {name:'AUX Spectograph', size:0.5, position: 3.5},
            {name:'AUX Mount/Dome', size:0.5, position:4},
            {name:'AUX DAO Manage', size:0.5, position: 4.5},
            {name:'AUX Diagnostic', size:0.5, position: 5},
            {name:'AUX Bridgs', size:0.5, position: 5.5},
            {name:'Sw to AUX', size:0.5, position: 6}],
            //Rack 07
            [{name:'DQ', size:1, position: 0},
            {name:'DQ', size:1, position: 1}],
            //Rack 08 is empty
            [
                // {name:'', size:9, position:0}
            ],
            //Rack 09
            [{name:'Camera Electronics', size:5, position: 4}],
            //Rack 10
            [{name:'Leaf 103', size:0.5, position: 0},
            {name:'Leaf 104', size:0.5, position: 0.5},
            {name:'IPMI', size:0.5, position: 1},
            {name:'Camera DB', size:0.5, position: 1.5},
            {name:'Master Control', size:0.5, position: 2},
            {name:'Lock Manager', size:0.5, position: 2.5},
            {name:'Raft HCU', size:0.5, position: 3},
            {name:'CCS-OCS Bridge', size:0.5, position: 3.5},
            {name:'Image Store', size:0.5, position: 4},
            {name:'DAQ Manager', size:1, position: 4.5},
            {name:'Visualization Server', size:1, position: 5.5}],
            //Rack 11
            [{name:'Diagnostic Cluster', size:5, position: 0}],
            //Rack 12
            [
                // {name:'', size:6, position: 2}
            ],
            //Rack 13
            [{name:'Leaf 105 Sum/13-2', size:0.5, position: 0},
            {name:'Leaf 106 Sum/13-4', size:0.5, position: 0.5},
            {name:'IPMI', size:1, position: 1}
            // ,
            // {name:'', size:17.5, position: 1.5}
            ],
            // Rack 14
            [{name:'Visualization', size:1.4, position: 2},
            {name:'Visualization', size:1.4, position: 3.4},
            {name:'Visualization', size:1.4, position: 4.8},
            {name:'Visualization', size:1.4, position: 6.2},
            {name:'Visualization', size:1.4, position: 7.6}],
            //Rack 15
            [{name:'TCS M1/M3', size:0.7, position: 0},
            {name:'ECS Basbon', size:0.7, position: 0.7},
            {name:'Guider Image Pro', size:0.7, position: 1.4},
            {name:'Calibration', size:0.7, position: 2.1},
            {name:'TCS Tel Align', size:0.7, position: 2.8},
            {name:'TCS ECS', size:0.7, position: 3.5},
            {name:'M2 Warns', size:0.7, position: 4.2},
            {name:'Rot/Hex Moog', size:0.7, position: 4.9},
            {name:'TCS Optics', size:0.7, position: 5.6},
            {name:'Dome E/E', size:0.7, position: 6.3},
            {name:'Mount EA', size:0.7, position: 7},
            {name:'TCS Kernel', size:0.7, position: 7.7},
            {name:'TCS Application', size:0.6, position: 8.4}],
            //Rack 16
            [{name:'Leaf 107', size:0.5, position: 0},
            {name:'Leaf 108', size:0.5, position: 0.5},
            {name:'IPMI', size:1, position: 1},
            {name:'OCS Maint', size:1.17, position: 2},
            {name:'OCS Scheduler', size:1.17, position: 3.17},
            {name:'OCS Telemetry', size:1.17, position: 4.34},
            {name:'OCS Telemetry', size:1.17, position: 5.51},
            {name:'OCS Application', size:1.17, position: 6.68},
            {name:'TCS Wavefront Sensing', size:1.17, position:7.85}
            ]
        ]
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

        let rackDetails = [];
        for(let i = 0; i<this.nrows; i++){
            for(let j = 0; j<this.ncols; j++){
                let item = {
                    x: x[j],
                    y: y[i],
                }
                rackDetails.push(item);
            }
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
                                rackDetails.map((pos,index)=>{
                                    return(
                                        <Rack
                                            x={pos.x}
                                            y={pos.y}
                                            width={rackWidth}
                                            height={rackHeight}
                                            structureWidth={this.structureWidth}
                                            index = {index}    
                                            key = {index}
                                            name = {this.rackNames[index]}
                                            slot = {this.rackItems[index]}
                                            hasPdu = {this.hasPdu[index]}    
                                            />
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