import { Component, HostListener } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AfterViewInit } from '@angular/core';
import * as feather from 'feather-icons';
import { DownloadItemComponent } from '../../components/download-item/download-item.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgbCarouselModule, DownloadItemComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {

  currentYear: number = new Date().getFullYear();

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.reveal();
  }

  ngAfterViewInit() {
    feather.replace();
    this.reveal();
  }

  reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      } else {
        reveals[i].classList.remove('active');
      }
    }
  }
}
