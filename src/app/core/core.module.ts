import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module'
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosComponent } from './components/produtos/produtos.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProdutosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ProdutosComponent,
  ]
})
export class CoreModule { }
