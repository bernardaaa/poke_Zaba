import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicepokemoniService} from '../servicepokemoni.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {PokemonDetailsDialogComponent} from './dialog/pokemonDetailsDialog.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-version2',
  templateUrl: './version2.component.html',
  styleUrls: ['./version2.component.css'],
})

export class Version2Component implements OnInit {
  pokemonNames = [];
  displayedColumns = ['name', 'details'];
  searchName = '';
  dataSource: MatTableDataSource<any>;
  pageEvent: PageEvent = new PageEvent();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private service: ServicepokemoniService) {
  }

  ngOnInit(): void {
    this.service.getPokemons(0, 1).subscribe(response => {
      console.log('response getPokemons', response);

      this.service.getPokemons(0, response.count).subscribe(resp => {
        console.log('response u response-u GetPokemons', resp);

        for (let i = 0; i < resp.results.length; i++) {
          this.pokemonNames.push(resp.results[i].name);
        }
        this.dataSource = new MatTableDataSource<any>(this.pokemonNames);
        // console.log('NAMES:', this.pokemonNames);
        this.dataSource.paginator = this.paginator;

      });
    });
  }

  applyFilter() {
    // console.log('input:', this.searchName);
    // console.log('imena svih pokemona:', this.pokemonNames);
    const filteredList = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pokemonNames.length; i++) {
      if (this.pokemonNames[i].startsWith(this.searchName)) {
        filteredList.push(this.pokemonNames[i]);
      }
      this.dataSource = new MatTableDataSource<any>(filteredList);
    }
  }

  clickOnRowButton(name: string): void {
    const dialogRef = this.dialog.open(PokemonDetailsDialogComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        name: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public ToLowerCase(event) {
    this.searchName = event.toLowerCase();
  }

  onTest2BtnClick(): void {
    console.log(this.route);
    this.router.navigate(['/homepage']);
  }
}


// filter 2. NAČIN
// applyFilter() {
//  const filteredList = this.pokemonNames.filter(x => x.startsWith(this.searchName));
//  this.dataSource = new MatTableDataSource<any>(filteredList);
// }

