import { Component, OnInit } from '@angular/core';

import { MovieList, User } from '@app/_models';
import { AlertService, UserService, AuthenticationService, MovieListService } from '../_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-strand-list',
  templateUrl: './strand-list.component.html',
  styleUrls: ['./strand-list.component.css']
})
export class StrandListComponent implements OnInit {
  strands: MovieList[];
  loading = false;
  currentUser: User;

  constructor(private movieListService: MovieListService, private alertService: AlertService ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.movieListService.getAllByUserId(this.currentUser.id).pipe(first()).subscribe(strands => {
        this.loading = false;
        this.strands = strands;
    });
  }

}
