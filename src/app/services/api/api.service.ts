import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ObjectId } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  env = environment;

  constructor(
    private httpClient: HttpClient
  ) {}

  signUp(body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/auth/sign-up', body);
  }

  signIn(body: {
    email: string;
    password: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/auth/sign-in', body);
  }

  // refresh(body: {
  //   email: string;
  //   password: string;
  // }) {
  //   return this.httpClient.post(this.env.apiUrl + 'api/auth/refresh', body);
  // }

  getUserData() {
    return this.httpClient.get(this.env.apiUrl + 'api/user');
  }

  getToken() {
    return this.httpClient.get(this.env.apiUrl + 'api/token');
  }

  getBooks(params?: {
    id?: string | string[];
    genre?: string;
    title?: string;
  }) {
    return this.httpClient.get(this.env.apiUrl + 'api/books', { params });
  }

  deleteBook(params: {
    id:string
  }) {
    return this.httpClient.delete(this.env.apiUrl + 'api/books', { params });
  }

  updateBooks(body: {
    filter: {
      _id: ObjectId
    },
    update: {
      title?: string;
      author?: string;
      published?: string;
      genre?: string;
      description?: string;
      link?: string;
    }

  }) {
    return this.httpClient.patch(this.env.apiUrl + 'api/books', body);
  }
}
