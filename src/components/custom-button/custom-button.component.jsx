import React from 'react';
import {CustomButtonContainer} from './custom-button.styles';

const CustomButton = ({children,...props}) => (
  <CustomButtonContainer {...props} className='custom-button'>
   {children}
  </CustomButtonContainer>
)

export default CustomButton;