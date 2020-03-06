import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicepokemoniService {

  url = 'https://pokeapi.co/api/v2/pokemon';


  constructor(private http: HttpClient) { }

  getPokemons(){
    return this.http.get(this.url);
  }

  getPokemonDetails(urlDetails: string){
    return this.http.get(urlDetails); //dohvati prvih 20 pokemona, for each petlja
  }
}
