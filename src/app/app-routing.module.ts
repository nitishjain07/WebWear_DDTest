import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [

    {
        path: 'cart',
        component: CartComponent
    },

    {
        path: 'product-list',
        component: ProductListComponent
    },

    {
        path: '',
        redirectTo: 'product-list',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: 'product-list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule { }
