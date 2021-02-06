import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeShopProject';
  LoadedFeature='Recipe';
  onNavigate(feature: string) { 
    this.LoadedFeature = feature;
  }
}
