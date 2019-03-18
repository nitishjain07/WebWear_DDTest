import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { CartItem } from '../../common/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShareCartDataService {
  cartItems:Array<CartItem> = [];

  //subject to keep track of updated cart
  private cartUpdateSource = new BehaviorSubject([]);
  currentCart = this.cartUpdateSource.asObservable();

  constructor(
    private snackBar: MatSnackBar
  ) { }

  //just returns the updated cart item object
  getCartItems() {
    return this.cartItems;
  }

  // adds item to cart if not already added
  addToCart(item) {
    if (this.cartItems.filter(function(e) { return e.prodId === item.prodId; }).length === 0) {
      this.cartItems.push(item);
      item.added = true;
      item.addedQty = item.addedQty ? item.addedQty++ : 1;
      this.updateCart(this.cartItems);
      this.openSnackBar('Added to Cart', '', 1000);
    }
  }

  // update cart wherever subject is subscribed
  updateCart(data: Array<CartItem>) {
    this.cartUpdateSource.next(data);
    this.cartItems = data;
  }

  // decreases the qty of item or removes in case qty is already 1
  decItem(item) {
    --item.addedQty;
    if(item.addedQty === 0) {
      item.added = false;
      this.removeItem(item);
      this.openSnackBar('Item removed from the cart', '', 2000);
    } else {
      this.updateCart(this.cartItems);
      this.openSnackBar('Quantity Updated Successfully', '', 2000);      
    }
  }

  // increase the qty of item
  incItem(item) {
    if(item.addedQty >= item.qtyInStck) {
      this.openSnackBar(`We're sorry! Only ${item.qtyInStck} units available`, '', 2000);
      return;
    }
    ++item.addedQty;
    this.updateCart(this.cartItems);
    this.openSnackBar('Quantity Updated Successfully', '', 2000);
  }

  // removes item from cart
  removeItem(item) {
    this.cartItems.forEach((element, index) => {
      if(element.prodId === item.prodId) {
        this.cartItems.splice(index, 1);
        this.updateCart(this.cartItems);
      }
    });
  }

  // common method to open material snackbar alert
  openSnackBar(message: string, action:string, timer) {
    this.snackBar.open(message, action, {
      duration: timer,
    });
  }

  // returns total price(with all quantities) but without discount price 
  getInitTotalPrice() {
    return this.cartItems.reduce((accumulator, currentValue) => 
      currentValue.disPrice ? 
        accumulator + (currentValue.disPrice*currentValue.addedQty) : accumulator + (currentValue.price*currentValue.addedQty)
    , 0);
  }
}
