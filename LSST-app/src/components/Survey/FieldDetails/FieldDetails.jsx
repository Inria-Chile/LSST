import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom';
import './FieldDetails.css';
import { BarChart } from 'react-d3-components'
import GenericHistogram from './GenericHistogram/GenericHistogram'
import Rnd from 'react-rnd';
import DraggableTitle from '../../Utils/DraggableTitle';

class FieldDetails extends PureComponent {
    
    // - total number of visits
    // - date/time of last visit
    // DONE - histograms with number of visits in each filter
    // DONE - histogram of rotation angle of observations
    // DONE - airmass histogram 
    //   (highlight most recent/current observation with a vertical line)
    // DONE - histogram of seeing values 
    //   (highlight most recent/current observation with a vertical line)
    // DONE - sky brightness histogram 
    // DONE - histogram of time baselines (i.e., time between visits)
    // - histogram of number of alerts issued for this field (moving, variable, outburst, new , vanished)

    // Which sky brightness: VskyBright, perry_skybrightness, skybrightness_modified
    // Which rotation angle: rotSkyPos, rotTelPos
    // Which seeing: seeing, maxSeeing, cldSeeing
    // Baseline histogram: Confirm meaning, find solution to

    constructor(props){
        super(props);
        this.alarmsData = [{
            label: 'somethingA',
            values: [{x: 'Moving', y: 10}, {x: 'Variable', y: 4}, {x: 'Outburst', y: 1}, {x: 'New', y: 5}, {x: 'Vanished', y: 9}]
        }];
        this.rotationData = [
            30,20,50,60,80,50,40,50,60,50,20,10,80,90,350
        ];
        this.visitsData = [
            'g','g','g','g','g','g','u','u','u','z','z','z','z','z','z','z','z','z','z','z','z','z','z','z','z','z','i','i','i','i','i','i',
        ];
    }

    getBaseLines(data) {
        let baselines = [];
        for(let i=1;i<data.length;++i){
            if(data[i-1].expDate === data[i].expDate)
                continue;
            baselines.push(data[i-1].expDate - data[i].expDate)
        }
        return baselines;
    }

    render() {
        let width = 350;
        let height = 190;
        let fieldData = this.props.fieldData && this.props.fieldData.length > 0 ? this.props.fieldData : [{fieldID: 0}];
        let filtersCount = {'u':0, 'g':0, 'r':0, 'i':0, 'z':0, 'y':0};
        fieldData.map( x => {
            if(x['filterName'] !== undefined)
                filtersCount[x['filterName']]++;
            return 0;
        });
        let rotationData = fieldData.map( x => Math.round(x['rotSkyPos']*180/Math.PI));
        let airmassData = fieldData.map( x => x['airmass']);
        let seeingData = fieldData.map( x => x['seeing']);
        let skyBrightnessData = fieldData.map( x => x['skybrightness_modified']);
        let baselinesData = this.getBaseLines(fieldData);

        let filtersData = [{
            label: 'dsaad',
            values: Object.keys(filtersCount).map( f => {return {x: f, y: filtersCount[f]}})
        }];

        if(this.props.targetNode && this.props.showFieldDetails){
            return createPortal(
                <Rnd default={{
                    x: 800,
                    y: 100,
                    width: 800,
                    height: 1000,
                    }}
                    dragGrid={ [20,20]}
                    resizeGrid={ [20,20]}
                    disableDragging={false}
                    enableResizing={true}
                    className={'field-details-popup'}
                    dragHandleClassName={'.move-button'}
                >
                    <div className="field-details">
                        <DraggableTitle title={'Field ID: ' + fieldData[0].fieldID} customClass='field-details-title' showClose={true} onCloseClick={() => this.props.setFieldDetailsVisibility(false)}/>
                        <div className='field-details-content'>
                            <div className='histogram'>
                                <h5>Details</h5>
                                <p>DADSADSAs</p>
                            </div>
                            <div className='histogram barchart'>
                                <h5>Filters</h5>
                                <BarChart data={filtersData} width={width} height={height} margin={{top: 20, bottom: 30, left: 30, right: 20}} yAxis={{tickArguments:[5]}}/>
                            </div>
                            <div className='histogram barchart'>
                                <h5>Alerts</h5>
                                <BarChart data={this.alarmsData} width={width} height={height} margin={{top: 20, bottom: 30, left: 30, right: 20}} yAxis={{tickArguments:[5]}}/>
                            </div>
                            <div className=''>
                                <h5>Rotation angle</h5>
                                <GenericHistogram id='adssa' data={rotationData} width={width-40} height={height-40} margin={40} domain={[0, 360]} nBins={36}  nTicks={5}/>
                            </div>
                            <div className=''>
                                <h5>Airmass</h5>
                                <GenericHistogram id='adssa2' data={airmassData} width={width-40} height={height-40} margin={40} domain={[0, 3]} nBins={36}  nTicks={5}/>
                            </div>
                            <div className=''>
                                <h5>Seeing</h5>
                                <GenericHistogram id='adssa3' data={seeingData} width={width-40} height={height-40} margin={40} domain={[0, 2]} nBins={36} nTicks={5}/>
                            </div>
                            <div className=''>
                                <h5>Sky brightness</h5>
                                <GenericHistogram id='adssa4' data={skyBrightnessData} width={width-40} height={height-40} margin={40} nBins={36} nTicks={5}/>
                            </div>
                            <div className=''>
                                <h5>Time baselines</h5>
                                <GenericHistogram id='adssa5' data={baselinesData} width={width-40} height={height-40} margin={40} nBins={36} nTicks={5} logScale={true}/>
                            </div>
                        </div>
                    </div>
                </Rnd>,
                this.props.targetNode,
              );
        }
        else{
            return (
                <div></div>
            );
        }
    }
}

export default FieldDetails;