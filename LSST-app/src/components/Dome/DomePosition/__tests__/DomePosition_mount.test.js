import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow,render} from "enzyme"; 
import DomePosition from '../DomePosition';
import Dome from '../../Dome';
import sinon from 'sinon';
Enzyme.configure({ adapter: new Adapter() });

describe('mounted DomePostion test',function(){
    let props,mountedDomePosition,infoDiv,spans;;
    

    describe('domePosition props are set',function(){
      const domePositionComponent = ()=>{
        if(!mountedDomePosition){
          mountedDomePosition = mount(
            <DomePosition width={330}
            height={300}
            id="dome-top" 
            scale={1.4} xOffset={-0.05} yOffset={0.15}
            shuttersAperture={50.0} 
            domeAzimuth={50.0}
            telescopeElevation={50.0} 
            mountAzimuth={50.0}
            updateDomePos={Dome.updateDomePos}/>
          );
        }
        return mountedDomePosition;
      };

      beforeEach(()=>{
        mountedDomePosition = undefined;  
      });

      it('have the right props when mounted',()=>{
        let props = {
          width : 330,
          height : 300,
          id : "dome-top", 
          scale : 1.4,
          xOffset : -0.05,
          yOffset : 0.15,
          shuttersAperture : 50.0, 
          domeAzimuth : 50.0,
          telescopeElevation : 50.0, 
          mountAzimuth : 50.0,
          updateDomePos : domePositionComponent().instance().updateDomePos,
        }
        expect(domePositionComponent().props()).toEqual(props);
      })

    });


    describe('domePosition info when props are not passed',function(){
    
      const domePositionComponent = ()=>{
        if(!mountedDomePosition){
          mountedDomePosition = mount(
            <DomePosition width={330}
            height={300}
            id="dome-top" 
            scale={1.4} xOffset={-0.05} yOffset={0.15}
            telescopeElevation={0} 
            updateDomePos={Dome.updateDomePos}/>
          );
        }
        return mountedDomePosition;
      }
    
      beforeEach(()=>{
        mountedDomePosition = undefined;   
        infoDiv = domePositionComponent().find('.dome-position-info').first();
        spans = infoDiv.find('span');
      });

      it('should have the right info in dome azimuth',()=>{
        expect(spans.at(1).text()).toBe('None');
      });

      it('should have the right info in Mount azimuth',()=>{
        expect(spans.at(3).text()).toBe('None');
      });

      it('should have the right info in Camera FOV',()=>{
        expect(spans.at(5).text()).toBe('None');
      });
    });


    describe('domePosition info when props are passed',function(){
      const domePositionComponent = (shuttersAperture,domeAzimuth,telescopeElevation,mountAzimuth)=>{
        if(!mountedDomePosition){
          mountedDomePosition = mount(
            <DomePosition width={330}
            height={300}
            id="dome-top" 
            scale={1.4} xOffset={-0.05} yOffset={0.15}
            shuttersAperture={shuttersAperture} 
            domeAzimuth={domeAzimuth}
            telescopeElevation={telescopeElevation} 
            mountAzimuth={mountAzimuth}
            updateDomePos={Dome.updateDomePos}/>
          );
        }
        return mountedDomePosition;
      };

          
      beforeEach(()=>{
        mountedDomePosition = undefined;   

      });

      it('should have the right info in Dome Azimuth, props.domeAzimuth = 50',()=>{
        infoDiv = domePositionComponent(50,50,50,50).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(1).text()).toBe('50.0º');
      });


      it('should have the right info in Dome Azimuth, props.domeAzimuth = 0',()=>{
        infoDiv = domePositionComponent(50,0,50,50).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(1).text()).toBe('0.0º');
      });

      it('should have the right info in Dome Azimuth',()=>{
        infoDiv = domePositionComponent(50,-50,50,50).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(1).text()).toBe('-50.0º');
      });

      it('should have the right info in Mount azimuth, props.mountAzimuth = 50',()=>{
        infoDiv = domePositionComponent(50,50,50,50).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(3).text()).toBe('50.0º');
      });

      it('should have the right info in Mount azimuth, props.mountAzimuth = 0',()=>{
        infoDiv = domePositionComponent(50,50,50,0).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(3).text()).toBe('0.0º');
      });

      it('should have the right info in Mount azimuth,props.mountAzimuth = -50.6',()=>{
        infoDiv = domePositionComponent(50,50,50,-50.6).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(3).text()).toBe('-50.6º');
      });

      it('should have the right info in Camera FOV, props.shuttersAperture = 50.6',()=>{
        infoDiv = domePositionComponent(50.0,50,50,50.0).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(5).text()).toBe('50.6º');  
      });

      it('should have the right info in Camera FOV, props.shuttersAperture = 0',()=>{
        infoDiv = domePositionComponent(0,50,50,50.0).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(5).text()).toBe('0.0º');  
      });
    
      it('should have the right info in Camera FOV, props.shuttersAperture = -50',()=>{
        infoDiv = domePositionComponent(-50,50,50,50.0).find('.dome-position-info').first();
        spans = infoDiv.find('span');
        expect(spans.at(5).text()).toBe('-50.0º');  
      });
    
    
    });


    describe('should update the state when the component is updated',function(){
      const domePositionComponent = ()=>{
        if(!mountedDomePosition){
          mountedDomePosition = mount(
            <DomePosition width={330}
            height={300}
            id="dome-top" 
            scale={1.4} xOffset={-0.05} yOffset={0.15}
            shuttersAperture={50.0} 
            domeAzimuth={50.0}
            telescopeElevation={50.0} 
            mountAzimuth={50.0}
            updateDomePos={Dome.updateDomePos}/>
          );
        }
        return mountedDomePosition;
      };
      it('calls componentDidUpdate',()=>{
        const spy = sinon.spy(DomePosition.prototype,'componentDidUpdate');
        const wrapper = domePositionComponent();
        expect(spy.calledOnce).toEqual(false);
        wrapper.setState({data : []});
        expect(spy.calledOnce).toEqual(true);
      });      
    });
});