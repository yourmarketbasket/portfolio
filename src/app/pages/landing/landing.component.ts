import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AfterViewInit } from '@angular/core';
import * as feather from 'feather-icons';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgbCarouselModule], 
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {

  currentYear: number = new Date().getFullYear();
  ngAfterViewInit() {
    feather.replace();
  }

}
