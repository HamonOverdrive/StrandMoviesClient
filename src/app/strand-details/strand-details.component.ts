import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService, AuthenticationService, MovieListService, MovieService } from '../_services';
import { MovieList, User, Movie } from '@app/_models';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-strand-details',
  templateUrl: './strand-details.component.html',
  styleUrls: ['./strand-details.component.css']
})
export class StrandDetailsComponent implements OnInit {
  strand : MovieList;
  movies : Movie[];
  constructor(
    private route: ActivatedRoute,
    private movieListService: MovieListService,
    private movieService: MovieService,
    private alertService: AlertService,
    private location: Location,
    config: NgbRatingConfig
    ) {  config.max = 5;
     }

  ngOnInit() {
    this.getById()
  }
  deleteMovie(id: number) {
    this.movieService.delete(id).pipe(first()).subscribe(() => {
        this.getById()
    });
}

  getById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieListService.getById(id)
      .subscribe(strand =>{

        this.strand = strand
      });
  }

  // send rating number and movie the api update for rating
  onRateChange(rating :number, movie: Movie) {

    movie.currentRate = rating;
    this.movieService.updateCurrentRate(movie).pipe(first()).subscribe(() => {
      this.getById()
  });
  }


  goBack(): void {
    this.location.back();
  }

}
