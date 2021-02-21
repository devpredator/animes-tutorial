import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/model/Anime';
import { AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  /**
   * Lista de animes a mostrar en la pantalla.
   */
  public animes: Anime[];
  /**
   * Pagina actual
   */
  page = 1;
  /**
   * Tamaño de la pagina.
   */
  pageSize = 4;
  /**
   * Cantidad total de registros.
   */
  collectionSize = 0;
  /**
   * Constructor default que inicializa el componente de animes.
   * @param animesService 
   */
  constructor(private animesService: AnimesService) { }

  ngOnInit(): void {
    this.consultarAnimes();
  }

  /**
   * Funcion para consultar los animes.
   */
  consultarAnimes() {
    console.log('Consultando animes...');

    this.animesService.consultarAnimes().subscribe(response => {
      console.log(response);
      this.animes = response;
      
      this.collectionSize = this.animes.length;

      this.animes = this.animes
            .map((anime, i) => ({counter: i + 1, ...anime}))
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      });
  }
}
