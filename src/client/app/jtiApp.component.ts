import {View, Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
//import {CharactersComponent} from './characters.component';
//import {DashboardComponent} from './dashboard.component';

@Component({
    selector: 'jti'
})
@View({
  template: `
    <h1>Hello Angular</h1>
    `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  //{ path: '/', as: 'Dashboard', component: DashboardComponent },
  //{ path: '/characters', as: 'Characters', component: CharactersComponent }
])
export class JtiComponent { }