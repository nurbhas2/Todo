import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
import moment from 'moment';

@inject(DataServices)
export class Todos {
    todoArray = new Array();
    constructor(data) {
        this.data = data;
    }
    async getUsersTodos(id) {
        var url = this.data.DATA_SERVICE + '/userTodos/' + id + '?order dueDate';
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.todoArray = serverResponse;
            }
            return serverResponse;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async createTodo() {
        try {
            let serverResponse = await this.data.post(this.selectedTodo, this.data.TODO_SERVICE);
            if (!serverResponse.error) {
                this.todoArray.unshift(serverResponse);
            }
            return serverResponse;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async saveTodo() {
        try {
            let serverResponse = await this.dataput(this.selectedTodo, this.data.TODO_SERVICE);
            if (!serverResponse.error) {
                this.todoArray[this.selectedIndex] = serverResponse;
            }
            return serverResponse;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    deleteTodo(index) {
        this.data.delete(this.data.TODO_SERVICE + '/' + this.todoArray[index]._d);
        this.todoArray.splice(index, 1);
    }

    selectTodo(index) {
        if (!index && index != 0) {
            this.selectedTodo = {
                todo: "",
                priority: "",
                dueDate: moment(new Date()).format("YYYY-MM-DD"),
                dateEntered: moment(new Date()).format("YYYY-MM-DD")
            }
        } else {
            this.selectedIndex = index;
            this.selectedTodo = {
                _id: this.todoArray[index]._id,
                task: this.todoArray[index].task,
                dueDate: moment(this.todoArray[index].duedate).format("yyyy-MM-DD"),
                dueEntered: moment(this.todoArray[index].dateEntered).format("YYYY-MM-DD"),
                priority: this.todoArray[index].priority,
                completed: this.todoArray[index].completed
            }
        }
    }
}