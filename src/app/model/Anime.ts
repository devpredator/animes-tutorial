/**
 * Entidad que mappea la informacion obtenida del microservicio de anime.
 */
export class Anime {
    /**
     * Identificador del anime-
     */
    public id: number;
    /**
     * Nombre del anime.
     */
    public nombre: string;
    /**
     * Año del anime.
     */
    public anio: number;
    /**
     * Fecha de creacion del anime.
     */
    public fechaCreacion: Date;
}