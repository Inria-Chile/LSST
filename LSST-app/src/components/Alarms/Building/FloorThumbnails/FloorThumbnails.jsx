import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './FloorThumbnails.css';

class FloorThumbnails extends Component {

    static floorPlanThumbnails = {
        floor1: '/img/floor_plans/floor_01/1-blueprint-thumbnail.svg',
        floor2: '/img/floor_plans/floor_02/2-blueprint-thumbnail.svg',
        floor3: '/img/floor_plans/floor_03/3-blueprint-thumbnail.svg',
        floor4: '/img/floor_plans/floor_04/4-blueprint-thumbnail.svg',
        floor5: '/img/floor_plans/floor_05/5-blueprint-thumbnail.svg',
        floor6: '/img/floor_plans/floor_01/1-blueprint-thumbnail.svg',
        floor7: '/img/floor_plans/floor_01/1-blueprint-thumbnail.svg',
        floor8: '/img/floor_plans/floor_01/1-blueprint-thumbnail.svg',
    }

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="floor-plan-thumbnails-container">
                {
                    Object.keys(FloorThumbnails.floorPlanThumbnails).map((key, index) => {
                        let imgSrc = FloorThumbnails.floorPlanThumbnails[key];
                        let isAlarm = this.props.floorAlarms.indexOf(key) > -1;
                        // if(isAlarm)
                        //     imgSrc = imgSrc.replace('thumbnail', 'thumbnail_alarm');
                        return (
                            <div className={["floor-thumbnail-wrapper", 
                                            this.props.selectedFloor === key ? 'selected':'',
                                            isAlarm ? 'alarm':''].join(' ')} 
                                key={key} onClick={() => this.props.setSelectedFloor(key)}>

                                <p> {'FLOOR '+(index+1)}
                                </p>
                                <img src={imgSrc} 
                                    alt="floor thumbnail"/>
                            </div>
                            )
                    })
                }
            </div>
        );
    }
}

export default FloorThumbnails;
