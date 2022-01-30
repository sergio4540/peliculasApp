import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[]=[];
  public moviesSlideshow: Movie[]=[];

@HostListener('window:scroll', ['$event'])
onScroll() {
  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
  const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

  if (pos>max) {
    // llamar el servicio
    if (this.peliculasServices.cargando) {
      return;
    }
    
    this.peliculasServices.getCartelera().subscribe(resp=>{
      this.movies.push(...resp.results);
      
    });
  }
}

  constructor(private peliculasServices: PeliculasService){
  }
  
  ngOnInit(): void {
    this.peliculasServices.getCartelera().subscribe(resp => {
      // console.log(resp);
      this.movies = resp.results;
      this.moviesSlideshow = resp.results;
    })
  }

}
