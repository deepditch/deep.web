import React from 'react';
import ReactDOM from 'react-dom';
import { RadioGroup, RadioGroupOption } from '../../components/Form/radio-group';

describe('RadioGroup', () => {
  it('should render without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<RadioGroup/>, div);
  });

  describe('RadioGroupOption', () => {
    it('should render without crashing', () =>{
      const div = document.createElement('div');
      ReactDOM.render(<RadioGroupOption/>, div);
    });
  });
})
