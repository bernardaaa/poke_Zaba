import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicepokemoniService} from '../servicepokemoni.service';
import {PokemonDetailsModel} from '../model/pokemonDetails.model';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';


// @ts-ignore
@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.css']
})
export class Version1Component implements OnInit {
  name: string;
  type: string;
  pokemonDetailsArray = [];
  displayedColumns = ['name', 'type', 'heightweight', 'signatureAbility', 'baseExperience'];
  dataSource: any;

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ServicepokemoniService) {
  }

  ngOnInit(): void {
    this.pageEvent.pageSize = 10; // Za prvo pozivanje potrebno nam je 10 pokemona
    this.service.getPokemons(0, this.pageEvent.pageSize)
      .subscribe(response => {
        console.log('response getPokemons', response);
        // @ts-ignore
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < response.results.length; i++) {
          // @ts-ignore
          this.service.getPokemonDetails(response.results[i].url)
            .subscribe(responseDetails => {
              console.log('response details', responseDetails);

              this.getPokeDetails(responseDetails);   // NOVA FUNKCIJA!!!!!!
            });
        }
      });

  }

  getPokeDetails(detailsData: any): void {
    const detail = new PokemonDetailsModel();

    detail.name = detailsData.name;
    detail.height = detailsData.height;
    detail.weight = detailsData.weight;
    detail.baseExperience = detailsData.base_experience;

    for (let j = 0; j < detailsData.types.length; j++) {
      detail.type += detailsData.types[j].type.name + ', ';
    }
    detail.type = detail.type.slice(0, -2);

    for (let j = 0; j < detailsData.abilities.length; j++) {
      detail.signatureAbility += detailsData.abilities[j].ability.name + ', ';
    }
    detail.signatureAbility = detail.signatureAbility.slice(0, -2);

    this.pokemonDetailsArray.push(detail);
    this.dataSource = new MatTableDataSource(this.pokemonDetailsArray);
    this.dataSource.paginator = this.paginator;

  }

  onSearchClick(): void {
    console.log('pageEvent: ', this.pageEvent);
    this.pokemonDetailsArray = [];
    console.log('name: ', this.name);
    console.log('type: ', this.type);

    if (this.name) {
      this.service.getPokemonByName(this.name).subscribe(response => {
        console.log('response getPokemonByName', response);
        this.getPokeDetails(response);
      });
    }

    if (this.type && !this.name) {
      this.service.getPokemonByType(this.type).subscribe(response => {
        console.log('response getPokemonByType', response);
        for (let j = 0; j < 10; j++) {   /// ZAŠTO 10?
          // @ts-ignore
          this.service.getPokemonDetails(response.pokemon[j].pokemon.url)
            .subscribe(responseDetails => {
              console.log('response details', responseDetails);

              this.getPokeDetails(responseDetails);
            });
        }
      });
    }
  }

  public ToLowerCase(event) {
    this.name = event.toLowerCase();
  }

  public ChangeToLowerCase(event) {
    this.type = event.toLowerCase();
  }

  onTest1BtnClick(): void {
    console.log(this.route);
    this.router.navigate(['/homepage']);
  }
}

