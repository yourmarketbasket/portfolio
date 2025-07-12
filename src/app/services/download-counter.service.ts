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
    }
    return this.downloadCounts.get(fileId)!.asObservable();
  }

  incrementDownloadCount(fileId: string) {
    if (this.downloadCounts.has(fileId)) {
      const currentCount = this.downloadCounts.get(fileId)!.getValue();
      this.downloadCounts.get(fileId)!.next(currentCount + 1);
    }
  }
}
