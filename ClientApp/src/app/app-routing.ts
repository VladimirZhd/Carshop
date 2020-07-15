import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CarListComponent } from "./cars/car-list/car-list.component";
import { CarEditComponent } from "./cars/car-edit/car-edit.component";
import { CarDetailComponent } from "./cars/car-detail/car-detail.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'cars', component: CarListComponent, children: [
            { path: 'new', component: CarEditComponent },
            { path: ':id', component: CarDetailComponent },
            { path: ':id/edit', component: CarEditComponent }
        ]
    },
    { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}