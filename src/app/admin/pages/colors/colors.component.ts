import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/interfaces/color';
import { ColorService } from 'src/app/services/color.service';

declare var window: any;

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {


  public colors!: Color[];

  Modal_add: any;
  Modal_update: any;
  Modal_delete: any;

  formAdd: FormGroup;
  formUpdate: FormGroup;

  id!: number;

  constructor(private colorService: ColorService,
    private fb: FormBuilder,
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
    this.getColors();

    this.Modal_add = new window.bootstrap.Modal(
      document.getElementById("add_color")
    );

    this.Modal_update = new window.bootstrap.Modal(
      document.getElementById("update_color")
    );

    this.Modal_delete = new window.bootstrap.Modal(
      document.getElementById("delete_color")
    );
  }

  public getColors(): void {
    this.colorService.getColors().subscribe(
      (response: Color[]) => {
        this.colors = response;
        // console.log(this.colors  );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  open_modal_add() {
    this.Modal_add.show();
  }


  open_modal_update(c: Color) {
    this.Modal_update.show();
    // console.log(c)
    this.formUpdate = this.fb.group({
      id: c.id,
      name: c.name,
    });
    // console.log(this.formUpdate.getRawValue());
  }



  open_modal_delete(c: Color) {
    this.Modal_delete.show();
    // console.log(id)
    this.id = c.id;
    document.getElementById('color_name')!.innerHTML = c.name;
  }



  onAddColor() {
    // return true;
    const formData = this.formAdd.getRawValue();
    const data = {
      id: formData.id,
      name: formData.name
    };

    this.colorService.addColor(data).subscribe(
      (response: Color) => {
        this.formAdd = this.fb.group({
          name: '',
        });
        // console.log("Success");
        // console.log(response);
        this.toastrService.success('Message Success!', 'Bien ajouter!');
        this.getColors();
        // document.getElementById('add_color_close')?.click();
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



  onUpdateColor() {
    // console.log(this.formUpdate.getRawValue());
    const formData = this.formUpdate.getRawValue();
    const data = {
      id: formData.id,
      name: formData.name
    };

    this.colorService.updateColor(data).subscribe(
      (response: Color) => {
        // console.log("Success");
        this.toastrService.success('Message Success!', 'Bien modifier');
        // console.log(response);
        this.getColors();
        // document.getElementById('add_color_close')?.click();
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

  onDeleteColor() {
    this.colorService.deleteColor(this.id).subscribe(
      (response: void) => {
        console.log("Success");

        this.toastrService.success('Message Success!', 'Bien supprimer !');
        console.log(response);
        this.getColors();
        // document.getElementById('add_color_close')?.click();
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

