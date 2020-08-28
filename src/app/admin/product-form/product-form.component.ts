import { Product } from './../../models/products';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { AngularFireList } from 'angularfire2/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{
  categories$;
  product:Product = {
    title: "",
    price: null,
    category: "",
    imageUrl: ""
  }; 
  id;
  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) 
    { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id)
        .subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('are you sure want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  

}
