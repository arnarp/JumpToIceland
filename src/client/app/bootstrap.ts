import {bind, bootstrap} from 'angular2/angular2';
import {ROUTER_BINDINGS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
//import {CharacterService} from './character.service';
import {JtiComponent} from './jtiApp.component';

bootstrap(JtiComponent, [
	ROUTER_BINDINGS,
	bind(LocationStrategy).toClass(HashLocationStrategy),
]);
