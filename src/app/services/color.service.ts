import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../interfaces/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private API_URL = environment.API;

  constructor(private http: HttpClient) { }

  public getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.API_URL}/colors/all`);
  }

  public addColor(color: Color): Observable<Color> {
    return this.http.post<Color>(`${this.API_URL}/colors/add`, color);
  }

  public updateColor(color: Color): Observable<Color> {
    return this.http.put<Color>(`${this.API_URL}/colors/update`, color);
  }

  public deleteColor(colorId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/colors/delete/${colorId}`);
  }
}
