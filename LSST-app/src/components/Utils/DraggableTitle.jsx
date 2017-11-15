import React, { PureComponent } from 'react'
import './DraggableTitle.css';
import ArrowMove from 'react-icons/lib/ti/arrow-move';
import FaClose from 'react-icons/lib/fa/close';

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
                {
                    this.props.showClose ?
                    <div className='close-button'>
                        <div onClick={(this.props.onCloseClick)}>
                            <FaClose size={30}/>
                        </div>
                    </div> :
                    ''
                }
            </div>
        )
    }
}

export default DraggableTitle;