import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatBadgeModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatInputModule],
  exports: [MatBadgeModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatInputModule],
})

export class MatComponentsModule { }