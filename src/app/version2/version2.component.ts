import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-version2',
  templateUrl: './version2.component.html',
  styleUrls: ['./version2.component.css']
})
export class Version2Component {


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onTest2BtnClick(): void {
    console.log(this.route);
    this.router.navigate(['/homepage']);

  }

}
