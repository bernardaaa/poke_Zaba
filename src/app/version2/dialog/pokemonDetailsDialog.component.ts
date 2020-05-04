import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ServicepokemoniService} from '../../servicepokemoni.service';


@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemonDetailsDialog.component.html',
  styleUrls: ['./pokemonDetailsDialog.component.css']
})
export class PokemonDetailsDialogComponent implements OnInit {
  pokemonName: string;
  pokemonHeight: string;
  pokemonWeight: string;
  pokemonType = '';
  signatureAbility = '';
  doubleDamageFrom = '';
  doubleDamageTo = '';
  halfDamageFrom = '';
  halfDamageTo = '';
  noDamageFrom = '';
  noDamageTo = '';

  constructor(public service: ServicepokemoniService,
              public dialogRef: MatDialogRef<string>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  ngOnInit() {
    // name from v2.ts (clickOnRowButton)
    this.service.getPokemonByName(this.data.name).subscribe(resp => {
      console.log('response getPokemonByName', resp);
      this.pokemonName = resp.name;
      this.pokemonWeight = resp.height;
      this.pokemonHeight = resp.weight;

      for (let j = 0; j < resp.types.length; j++) {
        this.pokemonType += resp.types[j].type.name + ', ';
      }
      this.pokemonType = this.pokemonType.slice(0, -2);

      for (let j = 0; j < resp.abilities.length; j++) {
        this.signatureAbility += resp.abilities[j].ability.name + ', ';
      }
      this.signatureAbility = this.signatureAbility.slice(0, -2);


      for (let i = 0; i < resp.types.length; i++) {
        this.service.getPokemonByType(resp.types[i].type.name).subscribe(responseType => {
          console.log('response getPokemonByType', responseType);

          for (let j = 0; j < responseType.damage_relations.double_damage_from.length; j++) {
            if (!this.doubleDamageFrom.includes(responseType.damage_relations.double_damage_from[j].name)) {
              this.doubleDamageFrom += responseType.damage_relations.double_damage_from[j].name + ', ';
            }
          }

          for (let j = 0; j < responseType.damage_relations.double_damage_to.length; j++) {
            if (!this.doubleDamageTo.includes(responseType.damage_relations.double_damage_to[j].name)) {
              this.doubleDamageTo += responseType.damage_relations.double_damage_to[j].name + ', ';
            }
          }

          for (let j = 0; j < responseType.damage_relations.half_damage_from.length; j++) {
            if (!this.halfDamageFrom.includes(responseType.damage_relations.half_damage_from[j].name)) {
              this.halfDamageFrom += responseType.damage_relations.half_damage_from[j].name + ', ';
            }
          }

          for (let j = 0; j < responseType.damage_relations.half_damage_to.length; j++) {
            if (!this.halfDamageTo.includes(responseType.damage_relations.half_damage_to[j].name)) {
              this.halfDamageTo += responseType.damage_relations.half_damage_to[j].name + ', ';
            }
          }

          for (let j = 0; j < responseType.damage_relations.no_damage_from.length; j++) {
            if (!this.noDamageFrom.includes(responseType.damage_relations.no_damage_from[j].name)) {
              this.noDamageFrom += responseType.damage_relations.no_damage_from[j].name + ', ';
            }
          }

          for (let j = 0; j < responseType.damage_relations.no_damage_to.length; j++) {
            if (!this.noDamageTo.includes(responseType.damage_relations.no_damage_to[j].name)) {
              this.noDamageTo += responseType.damage_relations.no_damage_to[j].name + ', ';
            }
          }

          // complete javlja kad je response resp došao do kraja petlje
        }, null, () => {
          console.log('complete');
          // @ts-ignore
          if (i === resp.types.length - 1) {
            this.doubleDamageFrom = this.doubleDamageFrom.slice(0, -2);
            this.doubleDamageTo = this.doubleDamageTo.slice(0, -2);
            this.halfDamageFrom = this.halfDamageFrom.slice(0, -2);
            this.halfDamageTo = this.halfDamageTo.slice(0, -2);
            this.noDamageFrom = this.noDamageFrom.slice(0, -2);
            this.noDamageTo = this.noDamageTo.slice(0, -2);
          }

        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
