import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../interface/category';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAllListCategory().subscribe(result => {
      this.categories = result;
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

  deleteCategory() {}

}
