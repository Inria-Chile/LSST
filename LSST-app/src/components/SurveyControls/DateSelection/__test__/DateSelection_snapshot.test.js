import React from 'react';
import DateSelection from '../DateSelection';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow,mount} from "enzyme"; 
import toJson from 'enzyme-to-json';
import SocketMock from 'socket.io-mock';
import moment from 'moment';
Enzyme.configure({ adapter: new Adapter() });



/*---- Snapshot testing ----*/
describe('DateSelection_Test',function(){

  //we mock date  
    const mockedDate = new Date("2018-01-04T19:44:10.611Z");
    const originalDate = Date;
    global.Date = jest.fn(() => mockedDate);
    global.Date.UTC = originalDate.UTC;
    global.Date.now = originalDate.now;

    it('renders correctly without shallowRender', () => {
        const setDataByDate = jest.fn();
        const tree = shallow(<DateSelection setDataByDate={setDataByDate} /> )
        expect(toJson(tree)).toMatchSnapshot();
      });

    it('renders correctly when the end date is picked',()=>{
      const setDataByDate =jest.fn();
      const tree = mount(<DateSelection setDataByDate={setDataByDate} />)
      let datePicker =tree.find('div').at(7);
      datePicker.children().at(0).find('input').simulate('change',{target : {value : moment("1994-03-01")}});
      expect(toJson(tree)).toMatchSnapshot();          
    });
})

