import React,{ lazy,Suspense } from 'react';
import { GlobalStyle} from './global.styles';
import { Switch,Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const Checkout = lazy(() => import('./pages/checkout/checkout.component'));


class App extends React.Component{
  componentDidMount() {
    const { checkUserSession} = this.props;
     checkUserSession();
  }
  render(){
  return (
    <div>
    <GlobalStyle />
    <Header />
    <Switch>
    <ErrorBoundary>
    {/*it is a component Supense allows us to wrap any part of application that might be render asynchronously */}
    <Suspense fallback={<Spinner />}>
    <Route exact path='/' component={HomePage}/>
    <Route path='/shop' component={ShopPage} />
    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) 
    : (<SignInAndSignUpPage />)}/>
    <Route exact path='/checkout' component={Checkout} />
    </Suspense>
    </ErrorBoundary>
    </Switch>
    </div>
  );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
});

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);