import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getToken() {
    const baseURL = 'https://accounts.spotify.com/api/token';
    const body = '';
    const headers = {
      Authorization:
        'Basic NTk0ZDdhMzUwZWRlNDZlYTg0NWE5MzJlMzhkY2ZjMWQ6YTZlYjcyOTQ4YjQ4NDc3N2E4NTRmZjNmMjljOGUwZDc',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.http.post(baseURL, body, { headers: headers, params: {grant_type: 'client_credentials'} });
  }
}
