import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  {


  constructor(private router: Router, private route: ActivatedRoute) {
  }

     onVersion1BtnClick(): void {
      console.log(this.route);
       this.router.navigate(['/version1']);

   }

   onVersion2BtnClick(): void {
     this.router.navigate(['/version2']);
   }
}
