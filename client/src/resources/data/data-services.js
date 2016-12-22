import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class DataServices {
	BASE_URL = "http://localhost:5000/api";
    	USER_SERVICE = '/users';
	 CHIRP_SERVICE = '/chirps';

    constructor(http) {
        this.http = http;
        this.http.configure(x => {
	x.withBaseUrl(this.BASE_URL);
        });
    }
     get(url){
	return this.http.createRequest(url)
		.asGet()
		.withHeader('Authorization','JWT '+  localStorage.getItem('aurelia_token'))
		.send()
		.then(response => {
			if (!response.isSuccess) {
		                     return response;
		                 } else {
		                     return JSON.parse(response.response);
		                 }
	             }).catch(e => {
			console.log(e);
		                 return  {error: true, code: e.statusCode, message: e.statusText};
	             });
}
put(content, url) {
	return this.http.createRequest(url)
		 .asPut()
		 .withHeader('Authorization','JWT '+  localStorage.getItem('aurelia_token'))
		 .withContent(content)
		 .send()
		.then(response => {
			if (!response.isSuccess) {
		                     return response;
		                 } else {
		                     return JSON.parse(response.response);
		                 }
		}).catch(e => {
			console.log(e);
		                 return  {error: true, code: e.statusCode, message: e.statusText};
	                 });
					 }
post(content, url) {
	return this.http.createRequest(url)
		 .asPost()
		 .withHeader('Authorization','JWT '+  localStorage.getItem('aurelia_token'))
		 .withContent(content)
		 .send()
		.then(response => {
			if (!response.isSuccess) {
		                     return response;
		                 } else {
		                     return JSON.parse(response.response);
		                 }
		}).catch(e => {
			console.log(e);
		                 return  {error: true, code: e.statusCode, message: e.statusText};
	                 });
}
delete(url) {
	return this.http.createRequest(url)
		.asDelete()
		.withHeader('Authorization', 'JWT '+ clocalStorage.getItem('aurelia_token'))
		.send()
		.then(response => {
			if (!response.isSuccess) {
				return response;
			} else {
				return JSON.parse(response.response);	
			}
		}).catch(e => {
			console.log(e);
			return { error: true, code: e.statusCode, message: e.statusText };
		});
}
}
