import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DownloadService } from '../../services/download.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgbCarouselModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  @ViewChildren('animatedSection') sections: QueryList<ElementRef>;

  currentYear: number = new Date().getFullYear();

  private observer: IntersectionObserver;

  constructor(private downloadService: DownloadService) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }

  ngAfterViewInit() {
    feather.replace();
    this.sections.forEach(section => {
      this.observer.observe(section.nativeElement);
    });
  }

  getDownloadCount(fileId: string): Observable<number> {
    return this.downloadService.getDownloadCount(fileId);
  }

  downloadFile(fileId: string) {
    this.downloadService.incrementDownloadCount(fileId);
  }
}
