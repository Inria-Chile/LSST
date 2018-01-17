import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './FloorThumbnails.css';

class FloorThumbnails extends Component {

    static floorPlanThumbnails = {
        floor1: '/img/floor_plans/floor1_thumbnail.png',
        floor2: '/img/floor_plans/floor2_thumbnail.png',
        floor3: '/img/floor_plans/floor3_thumbnail.png',
        floor4: '/img/floor_plans/floor4_thumbnail.png',
        floor5: '/img/floor_plans/floor5_thumbnail.png',
        floor6: '/img/floor_plans/floor6_thumbnail.png',
        floor7: '/img/floor_plans/floor7_thumbnail.png',
        floor8: '/img/floor_plans/floor8_thumbnail.png',
    }

    // constructor(props) {
    //     super(props);
    // }

    render() {
        let imgSrc = FloorThumbnails[this.props.FloorThumbnails];
        if(!imgSrc)
            imgSrc = "";
        return (
            <div className="floor-plan-thumbnails-container">
                {
                    Object.keys(FloorThumbnails.floorPlanThumbnails).map(key => {
                        return (
                            <div className={["floor-thumbnail-wrapper", 
                                            this.props.selectedFloor === key ? 'selected':'',
                                            this.props.floorAlarms.indexOf(key) > -1 ? 'alarm':''].join(' ')} 
                                key={key} onClick={() => this.props.setSelectedFloor(key)}>
                                <img src={FloorThumbnails.floorPlanThumbnails[key]} 
                                    className={"floor-plan-thumbnail"} 
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
