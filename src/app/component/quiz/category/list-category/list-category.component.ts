import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../services/category/category.service';
import {Category} from '../../../../interface/category';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  pageActual = 1;

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

  submitDeleteCategory(id: number) {
    if (confirm('Bạn có thực sự muốn xóa danh mục này') === true) {
      this.deleteCategory(id);
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(result => {
      this.ngOnInit();
      console.log('success');
    }, error => {
      console.log('error');
    });
  }
}
