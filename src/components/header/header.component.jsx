import React from 'react';
import { HeaderContainer , LogoContainer, OptionsContainer,OptionLink } from './header.styles';
import {connect} from 'react-redux'
import { ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

const Header = ({ currentUser,hidden,signOutStart }) => (
    
    <HeaderContainer>

      <LogoContainer to='/'>
        <Logo className='logo'/>
        </LogoContainer>

      <OptionsContainer>
          <OptionLink to='/shop' >
          Shop
          </OptionLink>
          <OptionLink to='/contact' >
          Contact
          </OptionLink>
          {
            currentUser ? 
            <OptionLink as='div' onClick={signOutStart}>Sign Out</OptionLink>
            :
            <OptionLink to='/signin' >
            Sign In
            </OptionLink>
          }
         <CartIcon /> 
         </OptionsContainer>
     { hidden? null : <CartDropdown /> }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
 currentUser : selectCurrentUser,
 hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart : () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);