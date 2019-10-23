import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { MovieList, Movie, MovieDto } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class OMDBService {
    constructor(private http: HttpClient) { }

    movieSearchQuery(para: string){
      const params = new HttpParams()
      .set('input', para)

      return this.http.get<MovieDto[]>(`${environment.apiUrl}/search`, { params });
    }

    getByImdb(imdbID: string) {
      return this.http.get<Movie>(`${environment.apiUrl}/omdb/findimdb/`+ imdbID);
    }

}
