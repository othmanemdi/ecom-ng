import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public API_URL = environment.API;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products/all`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/products/add`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/products/update`, product);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/products/delete/${productId}`);
  }

  uploadPhotoProduct(file: File, productId: number) {

    // let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    // let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.API_URL}/products/upload/${productId}`, formData)

    // .map(res => res.json())
    // .catch(error => Observable.throw(error))
    // .subscribe(
    //   data => console.log('success'),
    //   error => console.log(error)
    // )

  }
}


