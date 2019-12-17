import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../interface/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category: Category;
  createCategoryForm: FormGroup;
  isSuccess: boolean;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.createCategoryForm = this.fb.group({
      name: [null, Validators.required]
    });
  }

  createCategory() {
    if (this.createCategoryForm.valid) {
      const category = this.createCategoryForm.value;
      this.categoryService.createCategory(category).subscribe(result => {
        this.isSuccess = true;
      }, error => {
        this.isSuccess = false;
      });
    }
  }
}
