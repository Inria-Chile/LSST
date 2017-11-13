import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom';
import './FieldDetails.css';
import { BarChart } from 'react-d3-components'
import GenericHistogram from './GenericHistogram/GenericHistogram'
import Rnd from 'react-rnd';

class FieldDetails extends PureComponent {
    
    // - total number of visits
    // - date/time of last visit
    // - histograms with number of visits in each filter
    // - airmass histogram (highlight most recent/current observation with a vertical line)
    // - histogram of seeing values (highlight most recent/current observation with a vertical line)
    // - histogram of rotation angle of observations
    // - histogram of number of alerts issued for this field (moving, variable, outburst, new , vanished)
    // - sky brightness histogram 
    // - histogram of time baselines (i.e., time between visits)

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

    render() {
        let width = 400;
        let height = 200;
        if(this.props.targetNode){
            return createPortal(
                <Rnd default={{
                    x: 100,
                    y: 100,
                    width: 500,
                    height: 600,
                    }}
                    dragGrid={ [20,20]}
                    resizeGrid={ [20,20]}
                    disableDragging={false}
                    enableResizing={true}
                    className={'draggable'}
                >
                    <div className="field-details">
                        <div className='histogram'>
                            <BarChart data={this.alarmsData} width={width} height={height} margin={{top: 20, bottom: 30, left: 30, right: 20}}/>
                        </div>
                        <GenericHistogram id='adssa' data={this.rotationData} width={width} height={height} domain={[0, 360]} nBins={36}/>
                        <GenericHistogram id='adssa2' data={this.rotationData} width={width} height={height} domain={[0, 360]} nBins={36}/>
                    </div>
                </Rnd>,
                this.props.targetNode,
              );
        }
        else{
            return (
                <div className="field-details">
                    <div className='histogram'>
                        <BarChart data={this.alarmsData} width={width} height={height} margin={{top: 20, bottom: 30, left: 30, right: 20}}/>
                    </div>
                    <GenericHistogram id='adssa' data={this.rotationData} width={width} height={height} domain={[0, 360]} nBins={36}/>
                    <GenericHistogram id='adssa2' data={this.rotationData} width={width} height={height} domain={[0, 360]} nBins={36}/>
                </div>
            );
        }
    }
}

export default FieldDetails;