import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class Users {

    constructor(data) {
        this.data = data;
        this.todosArray = undefined;
    }
    async save(user) {
        if (user) {
            try {
                let serverResponse = await this.data.post(user, this.data.USER_SERVICE);
                return serverResponse;
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
    }
    async getPersonScreenName(name) {
        if (name) {
            try {
                let serverResponse = await this.data.get(this.data.USER_SERVICE + "/screenName/" + name);
                return serverResponse;
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
    }
    async followUser(userId, followId) {
        if (userId && followId) {
            var obj = { _id: followId };
            try {
                let serverResponse = await this.data.put(obj, this.data.USER_SERVICE + '/follow/' + id);
                return serverResponse;
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
    }
    setUser(user) {
        this.selectedUser = user;
    }

}