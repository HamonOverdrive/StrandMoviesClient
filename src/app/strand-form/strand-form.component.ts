import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService, AuthenticationService, MovieListService } from '../_services';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';

@Component({
  selector: 'app-strand-form',
  templateUrl: './strand-form.component.html',
  styleUrls: ['./strand-form.component.css']
})

export class StrandFormComponent implements OnInit {
  strandForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private movieListService: MovieListService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.strandForm = this.formBuilder.group({
      listName: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.strandForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.strandForm.invalid) {
        return;
    }

    this.loading = true;
    this.strandForm.value.userId = this.currentUser.id

    this.movieListService.create(this.strandForm.value)
    .pipe(first())
    .subscribe(
        data => {
          console.log(this.strandForm.value)
            this.alertService.success('Strand Created', true);
            this.router.navigate(['/strands']);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }

}
