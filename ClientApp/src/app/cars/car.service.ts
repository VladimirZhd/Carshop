import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from './car.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carChangeEvent = new Subject<Car[]>();
  cars: Car[] = [];
  car: Car;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCars(): Car[] {
    this.http.get<Car[]>(`${this.baseUrl}api/cars`).subscribe(
      (cars => {
        this.cars = cars;
        this.cars.sort((a, b) => (a.Make > b.Make) ? 1 : ((b.Make > a.Make) ? -1 : 0));
        this.carChangeEvent.next(this.cars.slice());
      })
    )

    return this.cars.slice();
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}api/cars/${id}`);
  }



  addCar(newCar: Car) {
    if (!newCar) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ car: Car }>(`${this.baseUrl}api/cars`, newCar, { headers: headers }).subscribe(
      (response) => {
        this.cars.push(response.car);
        this.cars.sort((a, b) => (a.Make > b.Make) ? 1 : ((b.Make > a.Make) ? -1 : 0));
        this.carChangeEvent.next(this.cars.slice());
      }
    )
  }

  updateCar(originalCar: Car, newCar: Car) {
    if (!originalCar || !newCar) {
      return;
    }

    let pos = this.cars.findIndex(c => c.Id === originalCar.Id);

    if (pos < 0) {
      return;
    }

    newCar.Id = originalCar.Id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put<Car>(`${this.baseUrl}api/cars/${newCar.Id}`, newCar, { headers: headers }).subscribe(
      () => {
        this.cars[pos] = newCar;
        this.cars.sort((a, b) => (a.Make > b.Make) ? 1 : ((b.Make > a.Make) ? -1 : 0));
        this.carChangeEvent.next(this.cars.slice());
      }
    )
  }

  deleteCar(car: Car) {
    if (!car) {
      return;
    }

    const pos = this.cars.findIndex(c => c.Id === car.Id);
    if (pos < 0) {
      return;
    }

    this.http.delete(`${this.baseUrl}api/cars/${car.Id}`).subscribe(
      () => {
        this.cars.splice(pos, 1);
        this.cars.sort((a, b) => (a.Make > b.Make) ? 1 : ((b.Make > a.Make) ? -1 : 0));
        this.carChangeEvent.next(this.cars.slice());
      }
    )
  }
}
