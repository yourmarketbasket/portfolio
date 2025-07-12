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
      // Generate a consistent random number between 3000 and 10000 for each fileId
      const seed = this.hashString(fileId);
      const randomCount = 3000 + Math.floor(this.seededRandom(seed) * 7001);
      this.downloadCounts.set(fileId, new BehaviorSubject<number>(randomCount));
    }
    return this.downloadCounts.get(fileId)!.asObservable();
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return hash;
  }

  private seededRandom(seed: number): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  incrementDownloadCount(fileId: string) {
    if (this.downloadCounts.has(fileId)) {
      const currentCount = this.downloadCounts.get(fileId)!.getValue();
      this.downloadCounts.get(fileId)!.next(currentCount + 1);
    }
  }
}
