import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AlertService, OMDBService, MovieListService, MovieService } from '@app/_services';
import { MovieList, User, Movie } from '@app/_models';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieAddForm: FormGroup;
  movieLists: MovieList[];
  movie : Movie;
  currentUser: User;
  loading = false;
  submitted = false;

  constructor(
      private omdbService: OMDBService,
      private route: ActivatedRoute,
      private router: Router,
      private movieListService: MovieListService,
      private movieService: MovieService,
      private formBuilder: FormBuilder,
      private alertService: AlertService,
      private location: Location,) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getByImdb();
    this.movieListService.getAllByUserId(this.currentUser.id).pipe(first()).subscribe(movieLists => {

      this.movieLists = movieLists;
    });

    this.movieAddForm = this.formBuilder.group({
      wishlist: [""],
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.movieAddForm.controls; }

  getByImdb(): void {
    const imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.omdbService.getByImdb(imdbID)
      .subscribe(movie =>{
        this.movie = movie
      });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.movieAddForm.invalid) {
        return;
    }
    this.loading = true;
    this.movieAddForm.value.userId = this.currentUser.id
    let listId = this.movieAddForm.controls["wishlist"].value

    this.movieService.create(this.movie, listId)
    .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Movie Created', true);
              this.router.navigate([`/strands/` + listId]);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
  }

  goBack(): void {
    this.location.back();
  }

}
