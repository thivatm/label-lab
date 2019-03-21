import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LabService {
    uri = 'http://localhost:4000';

    constructor(private http: HttpClient, private router: Router) {}

    uploadImg(formData: any){
        return this.http.post(`${this.uri}/upload`, formData);
    }
}