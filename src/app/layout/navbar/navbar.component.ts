import { Component ,OnInit ,effect, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AppState } from '../../state/red.store';
import { Store, select } from '@ngrx/store';
import { Cart } from '../../product/product.module';
import { storeLengthSelector } from '../../state/cart/cart.reducer';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';
import { storeAddProducts } from '../../state/cart/cart.action';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule ,RouterOutlet, RouterLink, RouterLinkActive, ToggleButtonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  cartLength$ ?: Observable<number>;
  checked: boolean = false;
  widthscreen = signal<number>(innerWidth);

  constructor(private store: Store<AppState> ,private router: Router ,private localstorage :LocalStorageService ,private scroller: ViewportScroller){
    this.cartLength$ = this.store.pipe(select(storeLengthSelector));
    effect(() => {
      if(this.localstorage.getItem("cart")) {
        let localStoragedData = JSON.parse(this.localstorage.getItem("cart"));
        localStoragedData.map((ele :Cart) => {
          this.store.dispatch(storeAddProducts({Items : ele.Items}))
        })
      }
    },{ allowSignalWrites: true })

  }
  ngOnInit(): void {}

  elementWidth(event:any) {
    this.widthscreen.set(event.target.innerWidth);
  }

  navigateCart() {
    this.router.navigate(['cart'])
  }

  navigateComponent(targetName : string) {
    let urlSnap = this.router.routerState.snapshot.url;
    const awaitRoute = async() => {
      if(urlSnap !== "/") {
        await this.router.navigate(['']);
      }
      this.scroller.scrollToAnchor(targetName);
    }
    awaitRoute();
  }
}
