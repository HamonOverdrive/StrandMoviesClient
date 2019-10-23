import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StrandFormComponent } from './strand-form/strand-form.component';
import { StrandListComponent } from './strand-list/strand-list.component';
import { StrandDetailsComponent } from './strand-details/strand-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'strandform', component: StrandFormComponent, canActivate: [AuthGuard] },
  { path: 'strands', component: StrandListComponent, canActivate: [AuthGuard] },
  { path: 'strands/:id', component: StrandDetailsComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchResultsComponent, canActivate: [AuthGuard] },
  { path: 'moviedetail/:imdbID', component: MovieDetailComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
