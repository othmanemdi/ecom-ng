import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formAdd: FormGroup;
  formUpdate: FormGroup;

  id!: number;

  Modal_add: any;
  Modal_update: any;
  Modal_delete: any;

  public categories!: Category[];

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.formAdd = this.fb.group({
      name: '',
    });

    this.formUpdate = this.fb.group({
      id: '',
      name: '',
    });
  }

  ngOnInit() {
    this.getCategories();

    this.Modal_add = new window.bootstrap.Modal(
      document.getElementById("add_category")
    );

    this.Modal_update = new window.bootstrap.Modal(
      document.getElementById("update_category")
    );

    this.Modal_delete = new window.bootstrap.Modal(
      document.getElementById("delete_category")
    );
  }


  open_modal_add() {
    this.Modal_add.show();
  }

  open_modal_update(c: Category) {
    this.Modal_update.show();
    // console.log(c)
    this.formUpdate = this.fb.group({
      id: c.id,
      name: c.name,
    });
    // console.log(this.formUpdate.getRawValue());
  }

  open_modal_delete(c: Category) {
    this.Modal_delete.show();
    // console.log(id)
    // this.id = c.id;
    document.getElementById('category_name')!.innerHTML = c.name;
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



  // public onAddCategory(addForm: NgForm): void {
  //   this.categoryService.addCategory(addForm.value).subscribe(
  //     (response: Category) => {
  //       console.log(response);
  //       this.getCategories();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }


  onAddCategory() {
    // console.log(this.form.getRawValue());
    const formData = this.formAdd.getRawValue();
    const data = {
      id: formData.id,
      name: formData.name
    };

    this.categoryService.addCategory(data).subscribe(
      (response: Category) => {
        this.formAdd = this.fb.group({
          name: '',
        });
        // console.log("Success");
        // console.log(response);
        this.toastrService.success('Message Success!', 'Title Success!');
        this.getCategories();
        // document.getElementById('add_category_close')?.click();
        this.Modal_add.hide();
        // this.router.navigate(['/admin/colors'])
      },
      error => {
        this.toastrService.error('Message Error!', error);
        // console.log("Error");
        // console.log(error);
        this.formAdd = this.fb.group({
          name: '',
        });
      }
    );
  }


  onUpdateCategory() {
    // console.log(this.formUpdate.getRawValue());
    const formData = this.formUpdate.getRawValue();
    const data = {
      id: formData.id,
      name: formData.name
    };

    this.categoryService.updateCategory(data).subscribe(
      (response: Category) => {
        // console.log("Success");
        this.toastrService.success('Message Success!', 'Title Success!');
        // console.log(response);
        this.getCategories();
        // document.getElementById('add_category_close')?.click();
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

  // public onDeleteCategory(categoryId: number): void {
  //   this.categoryService.deleteCategory(categoryId).subscribe(
  //     (response: void) => {
  //       console.log(response);
  //       this.getCategories();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  onDeleteCategory() {
    this.categoryService.deleteCategory(this.id).subscribe(
      (response: void) => {
        console.log("Success");

        this.toastrService.success('Message Success!', 'Bien supprimer !');
        console.log(response);
        this.getCategories();
        // document.getElementById('add_category_close')?.click();
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


  // public searchCategorys(key: string): void {
  //   console.log(key);
  //   const results: Category[] = [];
  //   for (const category of this.categories) {
  //     if (category.name.toLowerCase().indexOf(key.toLowerCase())) {
  //       results.push(category);
  //     }
  //   }
  //   this.categories = results;
  //   if (results.length === 0 || !key) {
  //     this.getCategories();
  //   }
  // }

  // public onOpenModal(category: Category, mode: string): void {

  // }


