import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadCounterService } from '../../services/download-counter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-download-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.scss']
})
export class DownloadItemComponent implements OnInit {
  @Input() fileId!: string;
  @Input() fileName!: string;
  @Input() filePath!: string;
  @Input() isPremium: boolean = false;

  downloadCount$!: Observable<number>;

  constructor(private downloadCounterService: DownloadCounterService) { }

  ngOnInit(): void {
    this.downloadCount$ = this.downloadCounterService.getDownloadCount(this.fileId);
  }

  handleDownload() {
    if (!this.isPremium) {
      this.downloadCounterService.incrementDownloadCount(this.fileId);
      // Actual download logic would go here
      window.open(this.filePath, '_blank');
    } else {
      // Trigger modal for premium items
      const modal = document.getElementById('contactDeveloperModal');
      if (modal) {
        (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
      }
    }
  }
}
