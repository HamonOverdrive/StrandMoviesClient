import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService, AlertService, OMDBService } from '@app/_services';
import { FormControl } from '@angular/forms';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loading = false;
  submitted = false;
  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;

  constructor(
    private authenticationService: AuthenticationService,
    private omdbService: OMDBService,
    private router: Router,
    private alertService: AlertService,
    ) { }

  ngOnInit() {
      this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap(value =>{
          if(value.length >= 3){
            return this.omdbService.movieSearchQuery(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
          )}
          else{
            this.isLoading = false
            return []
          }
        }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          // this.errorMsg = data['Error'];
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.filteredMovies = data;
        }

        console.log(this.filteredMovies);
      });
  }

  onSubmit() {
    this.submitted = true;
    let value = this.searchMoviesCtrl.value
    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;
    let convertedParam = value.toLowerCase().split(' ').join('+');
    let navigationExtras: NavigationExtras = {
      queryParams: { 'input': convertedParam}
    }
    this.router.navigate(['/search'], navigationExtras);

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
