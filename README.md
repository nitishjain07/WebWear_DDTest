Steps to run the code:

1. Make sure you have node installed in your machine. Else download node first.
2. From root folder of the project- run- 'npm install' command.
3. If you see any error in 2nd step please run - 'npm install' again. 
4. After all npm dependencies are installed, run command- 'ng serve --open'. This will automatically run local server and open application in your default browser.


Code Layout:

1. src/app folder contain all the components and modules of the app.
2. src/assets folder contains all the images and data json files.

approach

1. divided the view between header, footer and main container.
2. Made a shared service to share cart details amongst different components and define reusable functions also in it.
3. User can add products with quantity>0 from product listing page and also update the quantity
4. same functionality is reused in cart page which also show pricing section.
5. For coupon functionality, api call is made to get valid coupons for only first time and then coupon is applied based on availability and validity.
6. Created variable and mixins scss files to leverage the advantages of scss.
7. Valid Coupon Code's which can be seen in coupons.json file too are - save5, save10 and save15. Validity criteria has been set accoding to the requirement.











# WebWear

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
