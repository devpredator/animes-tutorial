import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  /**
   * URL base del microservicio de animes de springboot.
   */
  private baseUrl = 'http://localhost:8080/animes';
  /**
   * Encabezados que seran enviados al microservicio.
   */
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  /**
   * 
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }
  /**
   * Funcion que permite consultar una persona.
   */
  consultarPersona(personaDTO: any): Observable<Persona> {
    return this.httpClient.post<Persona>(`${this.baseUrl}/consultarPersona`, personaDTO, {headers: this.headers})
  }
}
