import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Graph } from './models/graph.model';
import { Files } from './models/files.model';
import { Observable } from 'rxjs';
import { Result } from './models/result.model';

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
    constructor(private http: HttpClient) {}

    url = "http://127.0.0.1:5000/";

    getFileList():Observable<Files> {
      return this.http.get<Files>(this.url+"files");
    }

    uploadFile(form: FormData): Observable<any> {
      return this.http.post<any>(this.url+"upload", form);
    }


    generate(query: string,file:string): Observable<Result>{
      return this.http.post<Result>(this.url+"visualize", {"query": query, "file":file })
    }

  }
