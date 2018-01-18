//TODO: testear componentDidUpdate actualizando el estado. 
//ver que se llame a setDataByDate, probar con varias condiciones para el if. 

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import DateSelection  from "../DateSelection";
import sinon from 'sinon';
Enzyme.configure({ adapter: new Adapter() });

describe('DateSelection mount test',function(){
    let mountedDateSelection;
    let spy;
    let setDataByDate =jest.fn();
    let setDate = sinon.spy();

    
    const dateSelectionComponent = ()=>{
        if(!mountedDateSelection){
          mountedDateSelection = mount(
            <DateSelection setDataByDate={setDataByDate} setDate = {setDate} />
          );
        }
        return mountedDateSelection;
      };

    describe('When the component state is updated with right dates',()=>{
        beforeEach(()=>{
            mountedDateSelection = undefined;
        });
    
        it('calls componentDidUpdate when a new state is setted',()=>{
            spy = sinon.spy(DateSelection.prototype,'componentDidUpdate');
            const wrapper = dateSelectionComponent();
            expect(spy.calledOnce).toEqual(false);
            wrapper.setState({startDate : "2018-02-04T19:44:10.611Z" , endDate :"2018-05-04T19:44:10.611Z" });
            expect(spy.calledOnce).toEqual(true);
            spy.restore();
        });
    
        it('calls setDate when a new state is setted',()=>{
            let spy1 = sinon.spy(dateSelectionComponent().instance(),'setDate')
            const wrapper = dateSelectionComponent();
            expect(spy1.calledOnce).toEqual(false);
            wrapper.setState({startDate : "2018-02-04T19:44:10.611Z" , endDate :"2018-05-04T19:44:10.611Z" });
            expect(spy1.calledOnce).toEqual(true);
        });
    
    });
    
    describe('When the component state is updated whith wrong dates',function(){
        beforeEach(()=>{
            mountedDateSelection = undefined;
        });    

        it('shouldnt call setDate when the new state has a wrong state',()=>{
            let spy1 = sinon.spy(dateSelectionComponent().instance(),'setDate')
            const wrapper = dateSelectionComponent();
            expect(spy1.calledOnce).toEqual(false);
            wrapper.setState({startDate : "2018-02-04T19:44:10.611Z" , endDate :"2018-01-04T19:44:10.611Z" });
            expect(spy1.calledOnce).toEqual(false);
        });

        it('should call componentDidUpdate',()=>{
            let spy2 = sinon.spy(DateSelection.prototype,'componentDidUpdate');
            const wrapper = dateSelectionComponent();
            expect(spy2.calledOnce).toEqual(false);
            wrapper.setState({startDate : "2018-07-04T19:44:10.611Z" , endDate :"2018-05-04T19:44:10.611Z" });
            expect(spy2.calledOnce).toEqual(true);
            spy2.restore();
        });

    
    });
    
    
});