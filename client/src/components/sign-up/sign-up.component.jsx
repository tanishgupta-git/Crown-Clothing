import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import "./sign-up.styles.scss";
import { signUpStart} from '../../redux/user/user.actions';

class SignUp extends React.Component {
 constructor(props) {
     super(props);

     this.state = {
         displayName:"",
         email:"",
         password:"",
         confirmPassword:""
     }
 }
  handleSubmit  = event  => {
      event.preventDefault();
      const { signUpStart} = this.props;
      const { displayName, email, password, confirmPassword } = this.state;
      console.log("inside the sign up");
      if (password !== confirmPassword){
          alert("password not match");
          return;
      }
     signUpStart({email,password,displayName});
  }

  handleChange = event => {
      const {name,value} = event.target;
      this.setState({
          [name]:value
      })
  }

 render(){
    const {displayName,email,password,confirmPassword} = this.state;
   return (
       <div className="signup">
         <h2 className="title">I do not have a account</h2>
         <span>Sign Up With Your Email And Password</span>

         <form onSubmit={this.handleSubmit}>
           <FormInput  type='text' name='displayName' value={displayName} onChange = {this.handleChange} label='Dispaly Name' required />
           <FormInput  type='email' name='email' value={email} onChange = {this.handleChange} label='Email' required />
           <FormInput  type='password' name='password' value={password} onChange = {this.handleChange} label='Password' required />
           <FormInput  type='password' name='confirmPassword' value={confirmPassword} onChange = {this.handleChange} label='ConfirmPassword' required />

           <CustomButton type='submit'>Sign Up</CustomButton>
         </form>

       </div>
   )

 }

}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})
export default connect(null,mapDispatchToProps)(SignUp);