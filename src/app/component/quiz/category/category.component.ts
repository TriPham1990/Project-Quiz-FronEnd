import { Component, OnInit } from '@angular/core';
import {Category} from '../../../interface/category';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category;
  createCategoryForm: FormGroup;
  check: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
