
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicepokemoniService {

  url = 'https://pokeapi.co/api/v2/pokemon/';
  urlGetByType = 'https://pokeapi.co/api/v2/type/';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number, limit: number) {
    return this.http.get(this.url + '?offset=' + offset + '&limit=' + limit);
  }

  getPokemonDetails(urlDetails: string) {
    return this.http.get(urlDetails);
  }

  getPokemonByName(name: string) {
    //console.log('Servis getPokemonByName url za poziv ', this.url + name);
    return this.http.get(this.url + name);
  }

  getPokemonByType(type: string) {
    return this.http.get(this.urlGetByType + type);
  }

  getPokemonByDamage(urlDamage: string) {
   return this.http.get( urlDamage);
  }

}
