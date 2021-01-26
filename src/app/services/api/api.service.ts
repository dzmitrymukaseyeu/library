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

  getUserData() {
    return this.httpClient.get(this.env.apiUrl + 'api/user');
  }

  getToken() {
    return this.httpClient.get(this.env.apiUrl + 'api/token');
  }

  addBook(body: {
    title: string;
    author: string;
    published: string;
    genre: string;
    description: string;
    img: string;
    link: string;
    created: Date;
    modified: Date;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/books', body);
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
    id: string,
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

  toogleFavorite(body: {
    id: string;
    state: boolean;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/favorites', body)
  }
}
