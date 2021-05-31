import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * 
   */
  usuario: String;
  /**
   * 
   */
  password: String;
  /**
   * 
   * @param personaService 
   */
  constructor(private personaService: PersonaService, private router: Router) { }
  /**
   * 
   */
  ngOnInit(): void {
  
  }
  /**
   * 
   */
  entrar() {
    console.log('Entrar a la pantalla de animes...');
    console.log(this.usuario);
    console.log(this.password);
    
    let personaDTO = {
      usuario: this.usuario,
      password: this.password
    };

    localStorage.setItem('personaSession', JSON.stringify(personaDTO));

    this.router.navigateByUrl('animes');
  }

}
