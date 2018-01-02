import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: any[];
  product = {};
  id;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {

    categoryService.getAll().subscribe(categories => this.categories = categories);

    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(id)
    if (this.id){
      console.log('id not null');
      this.productService.getProduct(this.id).take(1).subscribe(p => {
        console.log(p);
        this.product = p;
      });
    }
  }

  ngOnInit() {
  }

  save(product){
    console.log(product);
    if (this.id){
      this.productService.update(this.id, product);
    } else {
    this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }


  delete() {
    if (confirm('Do you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
