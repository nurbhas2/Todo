import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Todos} from "../../resources/data/todos";
import {User} from "../../resources/data/users";
import {AuthService} from "aurelia-auth";

@inject(Router, Todos, User, AuthService)
export class Todo{
    constructor(router, todos, users, auth){
        this.router = router;
        this.todos = todos;
        this.users =users;
        this.auth =auth;
        this.todoSelected = false;
        this.showList = true;
        this.hideCompleted = false;
    }
     async activate(){
        this.user = JSON.parse(sessionStorage.getItem('user'));
        await this.todos.getUsersTodos(this.user._id);
    }

    refreshTodos(){
        this.todos.getUsersTodos(this.user._id);
    
    }

    toggleHideCompleted(){
        
    }


     newTodo(){
         this.todos.selectTodo();
         this.showList = false;
     }

     async save(){
         if(this.todos.selectedTodo._id){
             await this.todos.saveTodo()
         } else {
             this.todos.selectedTodo.todoAuthor = this.user._id;
             await this.todos.createTodo();
         }
         this.showList = false;
         }

         async toggleDone(index){
             this.todos.todoArray[index].completed =!this.todos.todoArray[index].completed;
             this.todos.selectTodo(index);
             await this.save();
         }

         edit(index){
             this.todos.selectTodo(index);
             this.showList = true;
         }

         cancel(){
             this.showList = false;
         }

         toggleHideComleted(){
             this.hideCompleted = !this.hideCompleted;
         }

         deleteTodo(index){
             this.todos.deleteTodo(index);

         }
    
        
         }