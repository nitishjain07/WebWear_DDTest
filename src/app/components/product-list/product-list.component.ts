import { Component, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { ShareCartDataService } from '../../common/services/share-cart-data.service';

import { CartItem } from '../../common/models/cart-item.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList:Array<CartItem> = [];
  cartItems:Array<CartItem> = [];

  constructor(
    private dataService:DataService,
    private shareCartDataService:ShareCartDataService
  ) { }

  ngOnInit() {
    // get all products on load
    this.dataService.fetchData('assets/data/product-list.json').subscribe((data:Array<CartItem>) => {
      this.productList = data;
      this.checkCartItems();     
    });
  }

  // persists the state(added to cart or not with qty) of cart items when user comes back from cart page
  checkCartItems() {
    if(this.shareCartDataService.getCartItems()) {
      this.cartItems = this.shareCartDataService.getCartItems();
      this.cartItems.forEach(cartItem => {
        this.productList.every(product => {  // used every for performance enhancement so that it doesn't loop through all items after match found
          if(cartItem.prodId === product.prodId) {
            product.added = true;
            product.addedQty = cartItem.addedQty;
            return false;
          }
          return true;
        });
      });
    }
  }

}
