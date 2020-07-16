import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from './car.model';
import { Subject } from 'rxjs';
import { Z_NEED_DICT } from 'zlib';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carChangeEvent = new Subject<Car[]>();
  cars: Car[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCars(): Car[] {
    this.http.get<{ cars: Car[] }>(`${this.baseUrl}api/cars`).subscribe(
      (res => {
        this.cars = res.cars;
        this.cars.sort((a, b) => (a.make > b.make) ? 1 : ((b.make > a.make) ? -1 : 0));
        this.carChangeEvent.next(this.cars.slice());
      })
    )

    return this.cars.slice();
  }

  getCar(id: string) {
    let car: Car;
    this.http.get<{ car: Car }>(`${this.baseUrl}api/cars/${id}`).subscribe(
      (res) => {
        car = res.car;
      }
    )
    return car;
  }

  addCar(newCar: Car) {
    if (!newCar) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ car: Car }>(`${this.baseUrl}api/cars`, newCar, { headers: headers }).subscribe(
      (response) => {
        this.cars.push(response.car);
        this.cars.sort((a, b) => (a.make > b.make) ? 1 : ((b.make > a.make) ? -1 : 0));
        this.carChangeEvent.next(this.cars.slice());
      }
    )
  }
}
