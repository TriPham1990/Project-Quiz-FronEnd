import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../interface/category';
import {CategoryService} from '../../../../services/category/category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  isSuccess: boolean;
  category: Category;
  editCategoryForm: FormGroup;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      name: [null, Validators.required]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.getCategoryBy(id);
  }

  onSubmit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const {value} = this.editCategoryForm;
    value.id = id;
    this.editCategory(value);
  }

  getCategoryBy(id: number) {
    this.categoryService.getCategoryById(id).subscribe(result => {
      this.category = result;
      this.editCategoryForm.patchValue(this.category);
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  editCategory(value: any) {
    this.categoryService.updateCategory(value).subscribe(result => {
      this.isSuccess = true;
    }, error => {
      console.log('error');
    });
  }
}
