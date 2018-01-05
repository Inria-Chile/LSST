import React from 'react';
import ModeSelection from './ModeSelection';
import renderer from 'react-test-renderer';
import Survey from '../../Survey/Survey';

describe('ModeSelection_Test',function(){


//ASK: Se importo el suvey, esta bien asi? o habria que hacer algun mockup?.

    it('renders correctly without shallowRender', () => {
        const tree = renderer
          .create(<ModeSelection selectedMode={'playback'} 
            setPlaybackMode={Survey.setPlaybackMode} 
            setLiveMode={Survey.setLiveMode}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });


    it('renders correctly without shallowRender', () => {
        const tree = renderer
          .create(<ModeSelection selectedMode={'live'} 
            setPlaybackMode={Survey.setPlaybackMode} 
            setLiveMode={Survey.setLiveMode}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
})
