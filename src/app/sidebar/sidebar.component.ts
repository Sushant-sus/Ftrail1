import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
  isOpen = true;
  private subscription: Subscription;

  constructor(private sidebarService: SidebarService) {
    this.subscription = this.sidebarService.isOpen$.subscribe((isOpen) => {
      this.isOpen = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // get isOpen(); boolean{
  //   return true;
  // }
}
// export class SidebarComponent implements OnInit {
//   isOpen$: Observable<boolean> | undefined;

//   constructor(private sidebarService: SidebarService) {
//     console.log('isOpen');
//     this.isOpen$ = this.sidebarService.isOpen$;
//   }

//   ngOnInit(): void {
//     console.log('oninit');
//   }
// }
