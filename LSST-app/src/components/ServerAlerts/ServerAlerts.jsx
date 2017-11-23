import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rack from './Rack/Rack';
import './SeverAlerts.css';
import SlotDetails from './SlotDetails/SlotDetails'
import openSocket from 'socket.io-client';

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
        ];
        this.state = {
            showRackDetails: false,
            rackDetails : null,
            detailsPosition : null,
            rackIndex: null,
            alerts:[-1]
        }
        this.racks = [];
        this.socket = openSocket(window.location.origin+'')
        console.log('SCOKERT', this.socket.on('server_alerts', timestamp => this.receiveMsg(timestamp)))
    
        // console.log('SCOKERT', this.socket.on('DomeShutter', msg => console.log('DomeShutter', msg)));
        // console.log('SCOKERT', this.socket.on('ServerAlerts', msg => console.log('ServerAlerts', msg)));
        
    }

    receiveMsg(msg){
        // console.log(msg)
        this.setState({
            alerts:[msg]
        })

    }

    displayRackDetails=(details,pos,hOf1,rackIndex)=>{
        let show = this.state.showRackDetails;
        if(this.state.rackIndex==null){
            this.hiddeOtherRacks(rackIndex);
            this.setState({
                rackDetails: details,
                detailsPosition: pos,
                rackIndex: rackIndex,
                showRackDetails: !show,
                heightOf1Slot: hOf1,
                clickOverRack: true
            });
        }
        else if(this.state.rackIndex === rackIndex &&
        this.state.rackDetails === details){
            if(show){
                this.showAllRacks();
                this.setState({
                    showRackDetails: false,
                    rackDetails : null,
                    detailsPosition : null,
                    rackIndex: null
                })
            }
        }
        else if(this.state.rackIndex === rackIndex){
            this.hiddeOtherRacks(rackIndex);
            this.setState({
                rackDetails: details,
                detailsPosition: pos
            });
        }
        else{
            this.showAllRacks();
            this.setState({
                showRackDetails: false,
                rackDetails : null,
                detailsPosition : null,
                rackIndex: null
            })
        
        }
    }

    hiddeOtherRacks=(index)=>{
        let activeRack = this.racks[index];
        let rackClass = ReactDOM.findDOMNode(activeRack).getAttribute("class")
        if(rackClass==="rack-inactive"){
            let rackDom = ReactDOM.findDOMNode(activeRack);
            rackDom.setAttribute("class","rack-active");
        }
        this.racks.forEach((rack)=>{
            if(rack!==activeRack){
                let rackDom = ReactDOM.findDOMNode(rack);
                rackDom.setAttribute("class","rack-inactive");
            }
        });
    }

    showAllRacks=()=>{
        this.racks.forEach((rack)=>{
            let rackDom = ReactDOM.findDOMNode(rack);
            rackDom.setAttribute("class","rack-active");
        });
    }

    handleClick=(e)=>{
        let targetClass = e.target.getAttribute("class")
        if(!(targetClass==="slot"||targetClass==="slot-alert"||
    targetClass==="slot-text")){
            this.showAllRacks();
            this.setState({
                showRackDetails: false,
                rackDetails : null,
                detailsPosition : null,
                rackIndex: null
            })
        }
    }
    getRacksCoord(start,measureOfRack,offset,n){
        let coord = [];
        for(let i = 0; i<n;i++){
            coord[i] = start;
            start = start+measureOfRack+offset;
        }
        return coord;

    }

    getRacksCoords(rackWidth, rackHeight){
        let x = this.getRacksCoord(this.margin.left, rackWidth, this.verticalSplit, this.ncols);
        let y = this.getRacksCoord(this.margin.top+this.horizontalSplit, rackHeight, 
            this.horizontalSplit, this.nrows);
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
        return rackDetails;
    }
    
    render() {
        let totalWidth = window.innerWidth-this.margin.left-this.margin.right-this.offset;
        let totalHeight = window.innerHeight-this.margin.top - this.margin.bottom-this.offset;
        let rackWidth = (totalWidth-(this.ncols)*this.verticalSplit)/(this.ncols);
        let rackHeight = (totalHeight-(this.nrows)*this.horizontalSplit)/this.nrows;
        let rackDetails = this.getRacksCoords(rackWidth, rackHeight);
        let alerts = this.state.alerts[this.state.alerts.length-1];
        let rackAlert = alerts.rack;
        // console.log(rackAlert)

        return (
            <div className="server-alerts-container" ref="container">
                <div className ="row">
                    <div className ="col-md-12">
                        <svg 
                        className="svg-container"
                        height = {window.innerHeight}
                        width = {window.innerWidth}
                        x = {this.margin.left}
                        y = {this.margin.bottom}
                        onClick = {(e)=>this.handleClick(e)}
                        >
                       
                            {
                                rackDetails.map((pos,index)=>{
                                    // console.log("rackalert==index? ",rackAlert===index)
                                    return(
                                        <Rack
                                            ref={(rack) =>{this.racks[index]=rack}}
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
                                            displayPopUp = {this.displayRackDetails}
                                            alert = {(rackAlert===index && alerts.isItWorking > 0.5)?alerts.slot:null}
                                            />
                                    )
                                })  
                            }

                            <g className="pop-up-container">
                                {this.state.showRackDetails && 
                                <SlotDetails 
                                position = {this.state.detailsPosition} 
                                details={this.state.rackDetails}
                                hOf1={this.state.heightOf1Slot}
                                alerts={(this.state.rackIndex === rackAlert && alerts.isItWorking > 0.5)?true:false}/>}
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}
export default ServerAlerts;