import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../User';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.css'
})
export class FormComponentComponent {
  @Output() submitSignUp:EventEmitter<User>= new EventEmitter() 
  @Output() submitSignIn:EventEmitter<{ email: string, password: string, useEmail: boolean, username: string }>= new EventEmitter() 

  handleSignUp(){
    if(this.signUp_name=='' || this.signUp_email=='' || this.signUp_username==''|| this.signUp_password==''){
      window.alert("Please fill in all the details");
      return;
    }
    else{
      const user= new User(this.signUp_name, this.signUp_email, this.signUp_username, this.signUp_password);
      this.submitSignUp.emit(user)
    }
    this.signUp_name=""
    this.signUp_email=""
    this.signUp_username=""
    this.signUp_password=""
  }

  handleSignIn(){
    if((this.signIn_useEmail &&  this.signIn_email=='') || (!this.signIn_useEmail && this.signIn_username=='') || this.signIn_password==''){
      window.alert("Please fill in all the details");
      return;
    }
    else{
      const user= {useEmail:this.signIn_useEmail, email:this.signIn_email, username:this.signIn_username, password:this.signIn_password};
      this.submitSignIn.emit(user)
    }
    this.signIn_useEmail=true
    this.signIn_email=""
    this.signIn_username=""
    this.signIn_password=""
  }

  changeSignUpPasswordType(){
    this.signUp_hidePassword=!this.signUp_hidePassword
  }
  changeSignInPasswordType(){
    this.signIn_hidePassword=!this.signIn_hidePassword
  }
  changeSignUpStatus(){
    this.signUp=!this.signUp;
  }

  
  signUp:boolean=true
  
  signUp_name:string=''
  signUp_email:string=''
  signUp_username:string=''
  signUp_password:string=''
  signUp_hidePassword:boolean=true

  signIn_useEmail:boolean=true
  signIn_email:string=''
  signIn_username:string=''
  signIn_password:string=''
  signIn_hidePassword:boolean=true
}
