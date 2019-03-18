import { Component, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { ShareCartDataService } from '../../common/services/share-cart-data.service';

import { CartItem } from '../../common/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems:Array<CartItem> = [];
  couponCode:string = '';
  couponMessage:string;
  avlCoupons:Object;
  totalPrice:number = 0;
  cpnDiscount:number = 0;
  total:number = 0;

  constructor(
    private dataService:DataService,
    private shareCartDataService:ShareCartDataService
  ) { }

  ngOnInit() {
    this.cartItems = this.shareCartDataService.getCartItems();  // gets cart items from shared service
    this.totalPrice = this.shareCartDataService.getInitTotalPrice();  // gets total price without discount from shared service
    this.total = this.totalPrice - this.cpnDiscount;  // calculates total price with discount
  }

  // make first time http call to get coupons and then call applyCoupon fxn.
  // Also, remove previous coupon and discount if applied
  getCoupons() {
    this.cpnDiscount = 0;
    this.total = this.totalPrice - this.cpnDiscount;
    if(!this.avlCoupons) {
      this.dataService.fetchData('assets/data/coupons.json').subscribe(data => {
        this.avlCoupons = data;
        this.applyCoupon();
      });
    } else {
      this.applyCoupon();
    }
  }

  // checks the coupon validity and apply discount/show alert based on that
  applyCoupon() {
    if(this.avlCoupons[this.couponCode.toLowerCase()]) {
      let item = this.avlCoupons[this.couponCode.toLowerCase()];
      if(item.minTotal <= this.totalPrice) {
        this.cpnDiscount = item.disAmt;
        this.total = this.totalPrice - this.cpnDiscount;
        this.couponMessage = 'coupon applied successfully';
      } else {
        this.couponMessage = item.errorMess || 'invalid coupon';
      }
    } else {
      this.couponMessage = 'invalid coupon';
    }
  }

  // updates pricing on increment, decrement or removal of item
  updatePrice() {
    this.totalPrice = this.shareCartDataService.getInitTotalPrice();
    this.cpnDiscount = 0;
    this.couponMessage = '';
    this.couponCode = '';
    this.total = this.totalPrice - this.cpnDiscount;
  }
}
