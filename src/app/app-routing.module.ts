import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProdutosComponent } from './core/components/produtos/produtos.component';

const routes: Routes = [

  {
    path: "",
    component: HomeComponent
  },
  {
    path: "produtos",
    component: ProdutosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
