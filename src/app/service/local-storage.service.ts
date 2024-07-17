import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  public getItem(key : string): any {
    return localStorage.getItem(key);
  }

  // Clear all items from local storage
  public clearAll(): void {
    localStorage.clear();
  }
}
