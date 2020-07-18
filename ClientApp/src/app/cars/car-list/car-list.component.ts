import { Component, OnInit, OnDestroy } from '@angular/core';

import { CarService } from '../car.service';
import { Car } from '../car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  private subscription: Subscription;

  constructor(private carService: CarService) {
    this.cars = carService.getCars();
  }

  ngOnInit() {
    this.subscription = this.carService.carChangeEvent.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
