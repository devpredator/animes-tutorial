import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { Anime } from '../model/Anime';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  /**
   * URL base del microservicio de animes de springboot.
   */
  private baseUrl = 'http://localhost:8080/animes';

  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  /**
   * Constructor que inicializa el servicio.
   */
  constructor(private httpClient: HttpClient) { 

  }

  /**
   * Funcion que permite consumir el servicio para consultar animes.
   */
  consultarAnimes() : Observable<Anime[]> {
    return this.httpClient.get<Anime[]>(`${this.baseUrl}/consultarAnimes`);
  }

  /**
   * Funcion que permite consumir el servicio para guardar animes.
   * @param anime anime a guardar.
   */
  guardarAnime(anime: Anime) : Observable<Anime> {
    return this.httpClient.post<Anime>(`${this.baseUrl}/guardarAnime`, anime, {headers: this.headers});
  }
}
