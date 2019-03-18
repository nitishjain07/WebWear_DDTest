import { Component, OnInit } from '@angular/core';
import { ShareCartDataService } from '../../common/services/share-cart-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemsCount:number;

  constructor(
    private shareCartDataService:ShareCartDataService
  ) { }

  ngOnInit() {
    // updates cart badge value on cart update
    this.shareCartDataService.currentCart.subscribe(data => {
      this.cartItemsCount = data.length || null;
    });
  }
}
