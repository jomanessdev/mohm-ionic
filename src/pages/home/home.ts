//Angular
import { Component } from '@angular/core';

//Ionic
import { NavController } from 'ionic-angular';

//Classes
import { MohmEvent } from '../../classes/mohmEvent';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mohmEvents: MohmEvent[] = this.createFakeEvents();

  constructor(public navCtrl: NavController) {

  }

  createFakeEvents(): MohmEvent[]{
    let e1: MohmEvent = new MohmEvent();

    e1.$date = 'August 29, 2018';
    e1.$description = 'Our first youth event';
    e1.$rsvpRequired = false;
    e1.$title = 'Youth Day 2018';

    let e2: MohmEvent = new MohmEvent();

    e2.$date = 'September 4, 2018';
    e2.$description = 'Our third year anniversary';
    e2.$rsvpRequired = true;
    e2.$imgSource = 'assets/imgs/mohm-anniversary-18.jpg'
    e2.$title = '3 Year Anniversary';

    let e3: MohmEvent = new MohmEvent();

    e3.$date = 'October 12, 2018';
    e3.$description = 'Food, fun and games ALL FREE for kids.';
    e3.$rsvpRequired = true;
    e3.$imgSource = 'assets/imgs/mohm-fallfest-18.jpg'
    e3.$title = 'Fall Fest 2018';

    return [e1, e2, e3];
  }

}
