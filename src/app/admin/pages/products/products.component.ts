import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

declare var window: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  formAdd: FormGroup;
  formUpdate: FormGroup;

  id!: number;

  Modal_add: any;
  Modal_update: any;
  Modal_delete: any;

  public products!: Product[];
  public categories!: Category[];


  constructor(
    private categoryService: CategoryService,
    public productService: ProductService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.formAdd = this.fb.group({
      id: '',
      name: '',
      description: '',
      price: '',
      photo: '',
      category: null
    });

    this.formUpdate = this.fb.group({
      id: '',
      name: '',
      description: '',
      price: '',
      photo: '',
      category: null
    });
  }

  ngOnInit() {
    this.getProducts();

    this.Modal_add = new window.bootstrap.Modal(
      document.getElementById("add_product")
    );

    this.Modal_update = new window.bootstrap.Modal(
      document.getElementById("update_product")
    );

    this.Modal_delete = new window.bootstrap.Modal(
      document.getElementById("delete_product")
    );
  }


  open_modal_add() {
    this.getCategories();
    this.Modal_add.show();
  }

  open_modal_update(p: Product) {
    this.getCategories();
    this.Modal_update.show();
    // console.log(c)
    this.formUpdate = this.fb.group({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      photo: p.photo,
      category: p.category,
    });
    console.log(this.formUpdate.getRawValue());
  }

  open_modal_delete(p: Product) {
    this.Modal_delete.show();
    // console.log(id)
    this.id = p.id;
    document.getElementById('product_name')!.innerHTML = p.name;
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        // console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        // console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddProduct() {
    // console.log(this.form.getRawValue());
    const formData = this.formAdd.getRawValue();
    const data = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      photo: formData.photo,
      category: formData.category,
    };

    this.productService.addProduct(data).subscribe(
      (response: Product) => {
        this.formAdd = this.fb.group({
          name: '',
        });
        // console.log("Success");
        // console.log(response);
        this.toastrService.success('Message Success!', 'Title Success!');
        this.getProducts();
        // document.getElementById('add_product_close')?.click();
        this.Modal_add.hide();
        // this.router.navigate(['/admin/colors'])
      },
      error => {
        this.toastrService.error('Message Error!', error);
        // console.log("Error");
        // console.log(error);
        this.formAdd = this.fb.group({
          id: '',
          name: '',
          description: '',
          price: '',
          photo: '',
          category: null
        });
      }
    );
  }

  selectedFile: any;
  currentFileUploaded: any;

  onSelectedFile(event: any) {
    this.selectedFile = event.target.files;
  }

  onUpdateProduct() {
    const formData = this.formUpdate.getRawValue();
    const data = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      photo: formData.photo,
      category: formData.category
    };
    console.log(this.formUpdate.getRawValue());

    this.currentFileUploaded = this.selectedFile.item(0)
    this.productService.uploadPhotoProduct(this.currentFileUploaded, formData.id).subscribe(response => {
      console.log(response)
    }, err => {
      this.toastrService.error('Message Error!', "Problème de chargement");
    })

    this.selectedFile = undefined

    this.productService.updateProduct(data).subscribe(
      (response: Product) => {
        console.log("Success");
        this.toastrService.success('Message Success!', 'Bien modifier');
        // console.log(response);
        this.getProducts();
        // document.getElementById('add_product_close')?.click();
        this.Modal_update.hide();
        // this.router.navigate(['/admin/products'])
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error('Message Error!', error.message);
        // console.log("Error");
        // console.log(error);
      }
    );
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.id).subscribe(
      (response: void) => {
        console.log("Success");

        this.toastrService.success('Message Success!', 'Bien supprimer !');
        console.log(response);
        this.getProducts();
        // document.getElementById('add_product_close')?.click();
        this.Modal_delete.hide();
        // this.router.navigate(['/admin/products'])
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        this.toastrService.error('Message Error!', error.message);
        // console.log("Error");
        // console.log(error);
      }
    );
  }



}
