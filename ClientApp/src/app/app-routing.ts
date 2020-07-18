import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CarEditComponent } from "./cars/car-edit/car-edit.component";
import { CarDetailComponent } from "./cars/car-detail/car-detail.component";
import { HomeComponent } from "./home/home.component";
import { CarListComponent } from "./cars/car-list/car-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cars', component: CarListComponent },
    { path: 'cars/new', component: CarEditComponent },
    { path: 'cars/:id', component: CarDetailComponent },
    { path: 'cars/:id/edit', component: CarEditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}