import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  cars: Car[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCars(): Car[] {
    this.http.get(`${this.baseUrl}api/cars`).subscribe(
      (cars => {
        console.log(cars);
      })
    )

    return this.cars.slice();
  }
}
