import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadCounterService {
  private downloadCounts = new Map<string, BehaviorSubject<number>>();

  constructor() { }

  getDownloadCount(fileId: string): Observable<number> {
    if (!this.downloadCounts.has(fileId)) {
      this.downloadCounts.set(fileId, new BehaviorSubject<number>(0));
      // Simulate real-time updates
      setInterval(() => {
        const currentCount = this.downloadCounts.get(fileId)?.getValue() || 0;
        this.downloadCounts.get(fileId)?.next(currentCount + Math.floor(Math.random() * 5));
      }, 2000);
    }
    return this.downloadCounts.get(fileId)!.asObservable();
  }

  incrementDownloadCount(fileId: string) {
    const currentCount = this.downloadCounts.get(fileId)?.getValue() || 0;
    this.downloadCounts.get(fileId)?.next(currentCount + 1);
  }
}
