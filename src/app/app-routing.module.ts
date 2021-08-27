import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeEditComponent } from './components/cake-edit/cake-edit.component';
import { CakeListComponent } from './components/cake-list/cake-list.component';

const routes: Routes = [
  { path: 'edit/:id', component: CakeEditComponent },
  { path: 'edit', component: CakeEditComponent },
  { path: '', component: CakeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
