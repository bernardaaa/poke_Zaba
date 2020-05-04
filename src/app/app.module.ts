import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HomepageComponent } from './homepage/homepage.component';
import { ServicepokemoniService } from './servicepokemoni.service';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule, MatInputModule, MatPaginatorModule, MatDialogModule, MatIconModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PokemonDetailsDialogComponent} from './version2/dialog/pokemonDetailsDialog.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomepageComponent,
    PokemonDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [ServicepokemoniService],
  entryComponents: [PokemonDetailsDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
