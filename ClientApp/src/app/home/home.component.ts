import { Component, OnInit } from '@angular/core';
import { CarService } from '../cars/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit() {
  }

}
