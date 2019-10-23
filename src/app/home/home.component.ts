import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, MovieService, AlertService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];

    constructor(private userService: UserService, private movieService: MovieService, private alertService: AlertService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    testMovie() {
      this.movieService.getByTitle()
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
  }
}
