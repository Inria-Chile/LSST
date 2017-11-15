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
        this.hasPdu = [true, true,true,false,true,true,false,false,true,true,true,true,true,true,true,true]
        this.rackItems = [
            //Rack 01
            [{name:'Patch Panel', size:1, position: 3, indicators:[]},
            {name:'DWDM', size:5, position: 4, indicators:[]} ],
            //Rack 02
            [{name:'Spine 201', size:2, position: 0, indicators:['UPS']},
            {name:'Patch Panel', size:0.5, position: 2,indicators:[]},
            {name:'Spine 202', size:2, position: 3.5,indicators:['UPS']},
            {name:'Patch Panel', size:0.5, position: 5.5, indicators:[]},
            {name:'APICS', size:2, position: 6, indicators:['UPS']}],
            //Rack 03
            [{name:'Firewall', size:0.7, position:0, indicators:['CPU','Disk','UPS']},
            {name:'Router', size:0.7, position: 0.7, indicators:['CPU','Disk','UPS']},
            {name:'WLAN', size:1, position: 1.4,indicators:['UPS']},
            {name:'voip', size:2, position: 2.4, indicators:['CPU','Disk','UPS']}],
            //Rack 04
            [{name:'Patch Panels', size:4.5, position: 0, indicators:[]}],
            //Rack 05
            [{name:'Leaf 101', size:0.5, position: 0, indicators:['UPS']},
            {name:'Leaf 102', size:0.5, position: 0.5,indicators:['UPS']},
            {name:'MMCS', size:2, position: 1, indicators:['CPU','Disk','UPS']}],
            //Rack 06
            [{name:'IPMI', size:2.5, position: 0, indicators:['CPU','Disk','UPS']},
            {name:'AUX Calibration', size:0.5, position: 2.5, indicators:['CPU','Disk','UPS']},
            {name:'AUX Scheduler', size:0.5, position: 3, indicators:['CPU','Disk','UPS']},
            {name:'AUX Spectograph', size:0.5, position: 3.5, indicators:['CPU','Disk','UPS']},
            {name:'AUX Mount/Dome', size:0.5, position:4, indicators:['CPU','Disk','UPS']},
            {name:'AUX DAO Manage', size:0.5, position: 4.5, indicators:['CPU','Disk','UPS']},
            {name:'AUX Diagnostic', size:0.5, position: 5, indicators:['CPU','Disk','UPS']},
            {name:'AUX Bridgs', size:0.5, position: 5.5, indicators:['CPU','Disk','UPS']},
            {name:'Sw to AUX', size:0.5, position: 6, indicators:['CPU','Disk','UPS']}],
            //Rack 07
            [{name:'DQ', size:1, position: 0, indicators:['CPU','Disk','UPS']},
            {name:'DQ', size:1, position: 1, indicators:['CPU','Disk','UPS']}],
            //Rack 08 is empty
            [
                // {name:'', size:9, position:0}
            ],
            //Rack 09
            [{name:'Camera Electronics', size:5, position: 4, indicators:['CPU','Disk','UPS']}],
            //Rack 10
            [{name:'Leaf 103', size:0.5, position: 0, indicators:['UPS']},
            {name:'Leaf 104', size:0.5, position: 0.5, indicators:['UPS']},
            {name:'IPMI', size:0.5, position: 1, indicators:['CPU','Disk','UPS']},
            {name:'Camera DB', size:0.5, position: 1.5,  indicators:['CPU','Disk','UPS']},
            {name:'Master Control', size:0.5, position: 2, indicators:['CPU','Disk','UPS']},
            {name:'Lock Manager', size:0.5, position: 2.5, indicators:['CPU','Disk','UPS']},
            {name:'Raft HCU', size:0.5, position: 3, indicators:['CPU','Disk','UPS']},
            {name:'CCS-OCS Bridge', size:0.5, position: 3.5, indicators:['CPU','Disk','UPS']},
            {name:'Image Store', size:0.5, position: 4, indicators:['CPU','Disk','UPS']},
            {name:'DAQ Manager', size:1, position: 4.5, indicators:['CPU','Disk','UPS']},
            {name:'Visualization Server', size:1, position: 5.5, indicators:['CPU','Disk','UPS']}],
            //Rack 11
            [{name:'Diagnostic Cluster', size:5, position: 0, indicators:['CPU','Disk','UPS']}],
            //Rack 12
            [
                // {name:'', size:6, position: 2}
            ],
            //Rack 13
            [{name:'Leaf 105 Sum/13-2', size:0.5, position: 0, indicators:['UPS']},
            {name:'Leaf 106 Sum/13-4', size:0.5, position: 0.5,indicators:['UPS']},
            {name:'IPMI', size:1, position: 1, indicators:['CPU','Disk','UPS']}
            // ,
            // {name:'', size:17.5, position: 1.5}
            ],
            // Rack 14
            [{name:'Visualization', size:1.4, position: 2, indicators:['CPU','Disk','UPS']},
            {name:'Visualization', size:1.4, position: 3.4, indicators:['CPU','Disk','UPS']},
            {name:'Visualization', size:1.4, position: 4.8, indicators:['CPU','Disk','UPS']},
            {name:'Visualization', size:1.4, position: 6.2, indicators:['CPU','Disk','UPS']},
            {name:'Visualization', size:1.4, position: 7.6, indicators:['CPU','Disk','UPS']}],
            //Rack 15
            [{name:'TCS M1/M3', size:0.7, position: 0, indicators:['CPU','Disk','UPS']},
            {name:'ECS Basbon', size:0.7, position: 0.7, indicators:['CPU','Disk','UPS']},
            {name:'Guider Image Pro', size:0.7, position: 1.4, indicators:['CPU','Disk','UPS']},
            {name:'Calibration', size:0.7, position: 2.1, indicators:['CPU','Disk','UPS']},
            {name:'TCS Tel Align', size:0.7, position: 2.8, indicators:['CPU','Disk','UPS']},
            {name:'TCS ECS', size:0.7, position: 3.5, indicators:['CPU','Disk','UPS']},
            {name:'M2 Warns', size:0.7, position: 4.2, indicators:['CPU','Disk','UPS']},
            {name:'Rot/Hex Moog', size:0.7, position: 4.9, indicators:['CPU','Disk','UPS']},
            {name:'TCS Optics', size:0.7, position: 5.6, indicators:['CPU','Disk','UPS']},
            {name:'Dome E/E', size:0.7, position: 6.3, indicators:['CPU','Disk','UPS']},
            {name:'Mount EA', size:0.7, position: 7, indicators:['CPU','Disk','UPS']},
            {name:'TCS Kernel', size:0.7, position: 7.7, indicators:['CPU','Disk','UPS']},
            {name:'TCS Application', size:0.6, position: 8.4, indicators:['CPU','Disk','UPS']}],
            //Rack 16
            [{name:'Leaf 107', size:0.5, position: 0, indicators:['UPS']},
            {name:'Leaf 108', size:0.5, position: 0.5,indicators:['UPS']},
            {name:'IPMI', size:1, position: 1, indicators:['CPU','Disk','UPS']},
            {name:'OCS Maint', size:1.17, position: 2, indicators:['CPU','Disk','UPS']},
            {name:'OCS Scheduler', size:1.17, position: 3.17, indicators:['CPU','Disk','UPS']},
            {name:'OCS Telemetry', size:1.17, position: 4.34, indicators:['CPU','Disk','UPS']},
            {name:'OCS Telemetry', size:1.17, position: 5.51, indicators:['CPU','Disk','UPS']},
            {name:'OCS Application', size:1.17, position: 6.68, indicators:['CPU','Disk','UPS']},
            {name:'TCS Wavefront Sensing', size:1.17, position:7.85, indicators:['CPU','Disk','UPS']}
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