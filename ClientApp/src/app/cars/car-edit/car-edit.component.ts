import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CurrencyPipe } from "@angular/common";

import { CarService } from '../car.service';
import { Car } from '../car.model';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) form: NgForm;

  car: Car;
  originalCar: Car;
  editMode: boolean = false;
  currency: CurrencyPipe;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.editMode = false;
    }

    if (id) {
      this.carService.getCar(id).subscribe(
        (car: Car) => {
          console.log(car);
          this.originalCar = car;
          if (!this.originalCar) {
            return;
          }
          this.editMode = true;
          this.car = JSON.parse(JSON.stringify(this.originalCar));
        }
      )
    }
  }

  onSave() {
    const values = this.form.value;

    const newCar = new Car(
      '',
      values.make,
      values.model,
      values.price,
      values.description,
      values.title,
      values.mileage,
      values.year,
      values.imgUrl
    );
    console.log(newCar);

    if (this.editMode == true) {
      this.carService.updateCar(this.originalCar, newCar);
    }
    else {
      this.carService.addCar(newCar);
    }
    this.router.navigate(['/cars'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.form.reset();
    this.editMode = false;
  }

}
