import styled from 'styled-components';
import { Link } from 'react-router-dom';
// for not to duplicate the code we may use css from this library , it will let us write a css block 

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media screen and (max-width:800px) {
      height:60px;
      padding:10px;
      margin-bottom:20px;
    }
`;

// Here we are wrapping it so it gives us as a Link container which we want
export const LogoContainer = styled(Link)`
      height: 100%;
      width: 70px;
      padding: 25px;
      @media screen and (max-width:800px) {
        padding:0;
        width:50px;
    }
`
export const OptionsContainer = styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @media screen and (max-width:800px) {
        width:80%;
    } 
`
export const OptionLink = styled(Link)`
        padding: 10px 15px;
        cursor: pointer;
        `;

