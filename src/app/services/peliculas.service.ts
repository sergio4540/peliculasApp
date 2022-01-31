import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

private baseUrl:string = 'https://api.themoviedb.org/3';
private carteleraPage = 1;
public cargando: boolean = false;

  constructor(private http:HttpClient) { }

  get params() {
    return {
      api_key: '5d0f93141bd351815775bef6abb4b853',
      language: 'es-ES',
      page: this.carteleraPage
    }
  }

  resetCarteleraPage() {
    this.carteleraPage =1;
  }

  getCartelera():Observable<CarteleraResponse> {
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      tap(()=>{
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto}
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map(resp => resp.results)
    )
  }

  getPeliculaDetalle(id:string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    });
  }
}
