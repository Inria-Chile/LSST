import React, { PureComponent } from 'react'
import './DraggableTitle.css';
import ArrowMove from 'react-icons/lib/ti/arrow-move';

class DraggableTitle extends PureComponent {

    render() {
        let additionalClassName=this.props.customClass ? this.props.customClass : '';
        return (
            <div className={['draggable-title', additionalClassName].join(' ')}>
                <h2>
                    {this.props.title}
                </h2>
                <div className='move-button'>
                    <ArrowMove size={30}/>
                </div>
            </div>
        )
    }
}

export default DraggableTitle;