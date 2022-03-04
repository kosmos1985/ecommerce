import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  cartItems!: Collection[];
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;  
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user
    });   
  };

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
