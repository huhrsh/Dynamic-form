import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../User';
import { FormComponentComponent } from "./components/form-component/form-component.component";
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  user: User | null
  constructor() {
    if (localStorage && localStorage.getItem('active-user')) {
      this.user = JSON.parse(localStorage.getItem('active-user') || 'null');
    }
    else {
      this.user = null
    }
  }

  loginUser(user: { email: string, password: string, useEmail: boolean, username: string }) {
    let userList = JSON.parse(localStorage.getItem('user-list') || '[]');
    let foundUser: User | undefined;
    if (user.useEmail) {
      foundUser = userList.find((existingUser: User) => existingUser.email === user.email);
    } else {
      foundUser = userList.find((existingUser: User) => existingUser.username === user.username);
    }
    if (!foundUser) {
      alert('User not found.');
      return;
    }
    const passwordMatch = bcrypt.compareSync(user.password, foundUser.password); // Assuming password is hashed

    if (passwordMatch) {
      this.user = foundUser;
      localStorage.setItem('active-user', JSON.stringify(this.user));
      alert('Signed in successfully.');
    } else {
      alert('Password does not match.');
    }
  }

  addNewUser(user: User) {
    let userList = JSON.parse(localStorage.getItem('user-list') || '[]');
    const usernameTaken = userList.some((existingUser:User) => existingUser.username === user.username);
    const emailTaken = userList.some((existingUser:User) => existingUser.email === user.email);

    if (usernameTaken) {
      alert('Username is already taken.');
      return; 
    }

    if (emailTaken) {
      alert('Email is already taken.');
      return; 
    }

    userList.push(user);
    localStorage.setItem('user-list', JSON.stringify(userList));
    alert('User added successfully.');
  }

  signOut(){
    this.user=null;
    localStorage.setItem('active-user',JSON.stringify(null));
  }

  title = 'dynamic-forms';
}
