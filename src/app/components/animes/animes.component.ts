import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Anime } from 'src/app/model/Anime';
import { AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  modalReference: NgbModalRef;
  /**
   * Lista de animes a mostrar en la pantalla.
   */
  public animes: Anime[];
  /**
   * Objeto de un anime a guardar o actualizar
   */
  public anime: Anime;
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
  constructor(private animesService: AnimesService, 
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.consultarAnimes();
    this.anime = new Anime();
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
  /**
   * Metodo que permite abrir una ventana modal a través del componente.
   */
  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Metodo que permite guardar un anime.
   * @param data informacion de los campos capturados en el formulario.
   */
  guardarAnime(data: any) {

    this.anime = new Anime();
    this.anime.nombre = data.nombre;
    this.anime.anio = data.anio;

    this.animesService.guardarAnime(this.anime).subscribe(response => {

      this.modalReference.close();
      this.consultarAnimes();
    });
  }
}
