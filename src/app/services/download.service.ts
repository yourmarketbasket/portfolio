import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloadCounts = new Map<string, BehaviorSubject<number>>();

  constructor() {
    // Initialize download counts from local storage or a backend
    this.initializeDownloads();
  }

  private initializeDownloads() {
    // For simplicity, we'll just initialize with some default values.
    // In a real application, you might fetch these from a database.
    this.downloadCounts.set('chatter.apk', new BehaviorSubject<number>(123));
    this.downloadCounts.set('mask', new BehaviorSubject<number>(456));
    this.downloadCounts.set('nisoko', new BehaviorSubject<number>(789));
    this.downloadCounts.set('maestro', new BehaviorSubject<number>(101));
  }

  getDownloadCount(fileId: string) {
    if (!this.downloadCounts.has(fileId)) {
      this.downloadCounts.set(fileId, new BehaviorSubject<number>(0));
    }
    return this.downloadCounts.get(fileId)!.asObservable();
  }

  incrementDownloadCount(fileId: string) {
    if (this.downloadCounts.has(fileId)) {
      const subject = this.downloadCounts.get(fileId)!;
      subject.next(subject.value + 1);
    }
  }
}
