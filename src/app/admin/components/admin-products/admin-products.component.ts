import { DataTableModule } from 'angular-2-data-table';
import { Product } from '../../../shared/models/products';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productservice: ProductService) {
    this.subscription = this.productservice.getAll().subscribe(products => {
          console.log(products);
          this.filteredProducts = products;
          this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(this.products);

          this.tableResource.query({offset: 0}).then(items => {
            this.items = items;
          });
          this.tableResource.count().then(count => {
            this.itemCount = count;
          });
  }

  reloadItems(params){

    if (!this.tableResource) return;

    this.tableResource.query( params).then(items => {
            this.items = items;
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
          this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
          this.products;

    this.initializeTable(this.filteredProducts);
  }
}
