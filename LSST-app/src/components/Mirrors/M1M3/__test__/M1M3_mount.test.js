import React from 'react';
import M1M3 from '../M1M3';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as d3 from 'd3';
import {mount} from "enzyme"; 
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

describe('Update state test',function(){
    let mountedM1M3,spy;
    let mirrorSize = 250;
    let mirrorMargin = 30;
    let colormap1 = d3.scaleSequential((t) => d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "");
    let colormap2 = d3.scaleSequential((t) => d3.hsl(270, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
    let colormap3 = d3.scaleSequential((t) => d3.hsl(140, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
    const M1M3Component = ()=>{
      if(!mountedM1M3){
        mountedM1M3 = mount(
          <M1M3 width={mirrorSize} height={mirrorSize} id="m3" margin={mirrorMargin} colormap={colormap1}/>
        );
      }
      return mountedM1M3;
    };

    beforeEach(()=>{
      mountedM1M3 = undefined;

    
        fetch.resetMocks();
        const data = {
        results : []
        }
    
        const primero = {
        position : [3,4]
        }
    
        const segundo = {
        position : [5,6]
        }
    
        data.results.push(primero);
        data.results.push(segundo);
        fetch.mockResponse(JSON.stringify(data));  
    });

    afterEach(()=>{
      spy.restore();
    });

    it('should call component did update when setProps',()=>{
      spy = sinon.spy(M1M3.prototype,'componentDidUpdate');
      const tree = M1M3Component();
      expect(spy.calledOnce).toEqual(false);
      tree.setState({xRadius : 2});
      expect(spy.calledOnce).toEqual(true);
    });

    it('should create the right snapshot',()=>{
      spy = sinon.spy(M1M3.prototype,'componentDidUpdate');
      let tree = M1M3Component();
      expect(spy.calledOnce).toEqual(false);
      tree.setState({xRadius : 5});
      tree = M1M3Component();
      expect(toJson(tree)).toMatchSnapshot();
    });

  });  