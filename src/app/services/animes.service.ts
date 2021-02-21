import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
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
}
