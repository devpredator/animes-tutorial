import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonaDTO } from 'src/app/dto/PersonaDTO';
import { Anime } from 'src/app/model/Anime';
import { AnimesService } from 'src/app/services/animes.service';
import Swal from 'sweetalert2';

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
   * persona con la informacion en la sesion.
   */
  personaDTO: PersonaDTO;
  /**
   * Constructor default que inicializa el componente de animes.
   * @param animesService 
   */
  constructor(private animesService: AnimesService, 
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.personaDTO = JSON.parse(localStorage.getItem('personaSession'));
    console.log(this.personaDTO);
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
   * Metodo que permite precargar el objeto de anime a mostrarse en la ventana
   * modal para actualizarse.
   * @param animeSeleccionado anime seleccionado por el usuario. 
   */
  cargarAnime(animeSeleccionado: Anime, content: any) {
    this.anime = new Anime();
    this.anime.id = animeSeleccionado.id;
    this.anime.nombre = animeSeleccionado.nombre;
    this.anime.anio = animeSeleccionado.anio;
    this.anime.fechaCreacion = animeSeleccionado.fechaCreacion;

    this.open(content);
  }

  /**
   * Metodo que permite guardar un anime.
   * @param data informacion de los campos capturados en el formulario.
   */
  guardarAnime(data: any) {

    if (!this.anime.id) {
      this.anime = new Anime();
      this.anime.nombre = data.nombre;
      this.anime.anio = data.anio;
  
      this.animesService.guardarAnime(this.anime).subscribe(response => {
  
        this.modalReference.close();
        this.consultarAnimes();
      }); 
    } else {
      this.animesService.actualizarAnime(this.anime).subscribe(response => {
        this.modalReference.close();
        
        this.consultarAnimes();
        this.anime = new Anime();
      });
    }
  }
  /**
   * Metodo que permite mostrar la ventana de confirmacion para eliminar un registro de anime.
   * @param anime 
   */
  mostrarVentanaEliminar(anime: Anime) {
    Swal.fire({
      title: "Confirmación",
      text: `¿Estás seguro de eliminar el anime ${anime.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.animesService.eliminarAnime(anime.id).subscribe(response => {
          this.consultarAnimes();

          Swal.fire(
            'Ok!',
            `El anime ${anime.nombre} fué eliminado exitósamente`,
            'success'
          )
        });
      }
    })    
  }
}
