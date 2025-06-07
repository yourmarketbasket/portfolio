import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProductsComponent } from './products/products.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent }
];
