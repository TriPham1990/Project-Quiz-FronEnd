import {Component, OnInit} from '@angular/core';
import {Category} from '../../../interface/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category;
  createCategoryForm: FormGroup;
  isSuccess: boolean;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.createCategoryForm = this.fb.group({
      category: [null, Validators.required]
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
