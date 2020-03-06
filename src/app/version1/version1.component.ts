import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicepokemoniService} from '../servicepokemoni.service';
import {PokemonDetailsModel} from '../model/pokemonDetails.model';
import {TableDataSource} from '../tableDataSource';



@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.css']
})
export class Version1Component implements OnInit {

   pokemonDetailsArray = [];
   displayedColumns = ['name', 'type', 'heightweight', 'signatureAbility', 'baseExperience'];
   dataSource: TableDataSource;

  constructor(private router: Router, private route: ActivatedRoute, private service: ServicepokemoniService) {
  }

  ngOnInit(): void {

    this.service.getPokemons()
      .subscribe(response => {
        console.log('response getPokemons', response);

        for (let i = 0; i < response.results.length; i++) {
          let detail = new PokemonDetailsModel();

          detail.name = response.results[i].name;
          this.service.getPokemonDetails(response.results[i].url)
            .subscribe(responseDetails => {
              console.log('response details', responseDetails);
              detail.height = responseDetails.height;
              detail.weight = responseDetails.weight;
              detail.baseExperience = responseDetails.base_experience;

              for (let j = 0; j < responseDetails.types.length; j++) {
                detail.type += responseDetails.types[j].type.name + ', ';
              }

               detail.type = detail.type.slice(0, -2);

              for (let j = 0; j < responseDetails.abilities.length; j++) {
                detail.signatureAbility += responseDetails.abilities[j].ability.name + ', ';
              }

               detail.signatureAbility = detail.signatureAbility.slice(0, -2);

            });
          this.pokemonDetailsArray.push(detail);
        }
        this.dataSource = new TableDataSource(this.pokemonDetailsArray);
        console.log('data array', this.pokemonDetailsArray);
      });
  }


  onTest1BtnClick(): void {
    console.log(this.route);
    this.router.navigate(['/homepage']);

  }
}
