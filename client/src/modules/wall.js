import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Todos } from '../resources/data/todos';
import { Users } from '../resources/data/users';

@inject(Router, AuthService, Todos, Users)
export class Wall {
  constructor(router, auth, todos, users) {
    this.router = router;
    this.auth = auth;
    this.todos = todos;
    this.users = users;
    this.message = 'ToDo List';
    this.newTodo;
    this.saveStatus = "";
  }

  async activate() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users.setUser(this.user);
    let serverResponse = await this.todos.getUsersTodos(this.user._id);
    if (serverResponse.error) {
      this.wallMessage = "Error retrieving todos";
    }
  }

  async findUser() {
    let serverResponse = await this.users.getPersonScreenName(this.searchScreenName);
    this.notMe = true;
    if (serverResponse && !serverResponse.error) {
      let response = await this.todos.getUsersTodos(serverResponse._id);
      if (response.error) {
        this.wallMessage = "Error retrieving todos";
      }
    }
  }



  async todo() {
    if (this.newTodo) {
      var todo = {
        todo: this.newTodo,
        user: this.user._id,
        todoAuthor: this.user._id
      }
      let serverResponse = await this.todos.saveTodo(todo);
      if (serverResponse && !serverResponse.error) {
        this.newTodo = "";
        this.saveStatus = "";
        this.todos.todoArray[0].todoAuthor = new Object();
        this.todos.todoArray[0].todoAuthor.email = this.user.email;
      } else {
        this.saveStatus = "Error saving todo";
      }
    }
  }


  async home() {
    this.notMe = false;
    await this.todos.getUsersTodos(this.user._id);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
  }
}