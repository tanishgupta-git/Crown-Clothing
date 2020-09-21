import React from 'react';
import './App.css';
import { Switch,Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Checkout from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentuser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
class App extends React.Component{
 unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentuser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=>{
     if(userAuth){
       const useRef = await createUserProfileDocument(userAuth);

       useRef.onSnapshot(snapShot => {
         setCurrentuser({
           currentUser:{
             id:snapShot.id,
             ...snapShot.data()
           }
         });
      
       })
  
     }
     setCurrentuser(userAuth);
    })
  }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
   
  }

  
  render(){
  return (
    <div>
    <Header />
    <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route path='/shop' component={ShopPage} />
    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) 
    : (<SignInAndSignUpPage />)}/>
    <Route exact path='/checkout' component={Checkout} />
    </Switch>
    </div>
  );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentuser: user => dispatch(setCurrentuser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);