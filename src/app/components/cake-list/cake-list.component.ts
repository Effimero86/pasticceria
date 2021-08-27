import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cake } from 'src/app/model/cake';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.scss']
})
export class CakeListComponent implements OnInit {

  cakes: Cake[] = [];
  cakeSelectedId: string | undefined;
  cakeSelected: Cake | undefined;

  constructor(
    private cakeService: CakeService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.updateList();
  }

  private updateList() {
    this.cakeService.getCakes().subscribe((cakes: Cake[]) => {
      this.cakes = cakes;
    });
  }

  onSelect(cake: Cake): void {
    this.cakeSelectedId = cake._id;
    this.cakeSelected = cake;
  }

  onEdit() {
    if(this.cakeSelectedId) {
      this.router.navigate(["/edit", this.cakeSelectedId]);
    }
  }

  onDelete() {
    if(this.cakeSelectedId) {
      this.cakeService.deleteCake(this.cakeSelectedId)
        .subscribe(res => {
          console.log(res);
          this.updateList();
          this.cakeSelectedId = undefined;
          this.cakeSelected = undefined;
        });
    }
  }

}
