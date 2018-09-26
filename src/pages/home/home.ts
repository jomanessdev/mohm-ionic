// Angular
import { Component, OnInit } from '@angular/core';

// Ionic
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';

// import { MohmEvent } from '../../classes/mohmEvent';
import ConfigClasses from '../../classes/configClasses';

// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// Rxjs
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Classes
import { MohmEvent } from '../../classes/mohmEvent';
// export interface MohmEvent {  date: string; description: string; rsvpRequired: boolean; title: string; isGoing: boolean; imgSource: string; location: string; }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  mohmEventsCollection: AngularFirestoreCollection<MohmEvent>;

  mohmEvents: Observable<MohmEvent[]>;

  mohmEventDoc: any;

  justPrintIt: any;

  config: ConfigClasses = new ConfigClasses();

  loading: Loading;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private firestore: AngularFirestore) {}
  ngOnInit(){
    this.startLoading();
    this.firestore.collection<MohmEvent>('mohmEvent').snapshotChanges().pipe(
      map(
        results => {
          return results.map(a => {
            let _mEvent: MohmEvent = new MohmEvent();
            _mEvent.$date = a.payload.doc.data().date;
            _mEvent.$location = a.payload.doc.data().location;
            _mEvent.$title = a.payload.doc.data().title;
            _mEvent.$description = a.payload.doc.data().description;
            _mEvent.$imgSource = a.payload.doc.data().imgSource;
            _mEvent.$isGoing = a.payload.doc.data().isGoing;
            _mEvent.$rsvpRequired = a.payload.doc.data().rsvpRequired;
            _mEvent.$id = a.payload.doc.id;
            return _mEvent;
          })
        }
      )
    ).subscribe((_mohmEvents) => {
      this.stopLoading();
      this.mohmEvents = of(_mohmEvents);
      console.log(_mohmEvents);
    }, error => { this.stopLoading(); console.log('[HomeComp] error', error) });
  }

  attendanceChanged(mEvent: MohmEvent){
    let _text = mEvent.$isGoing ? 'Going to' : 'Not going to';

    this.mohmEventDoc = this.firestore.doc<MohmEvent>(`mohmEvent/${mEvent.$id}`);
    this.mohmEventDoc.update(mEvent.$isGoing).subscribe((result) => {
      let attendanceToast = this.toastCtrl.create(this.config.createToastConfig(`${_text} ${mEvent.$title}`));
      attendanceToast.present();
    }, (error) => {
      let attendanceToast = this.toastCtrl.create(this.config.createToastConfig(`Unable to update`));
      attendanceToast.present();
      console.log('[HomeComp] error', error);
    });

  }

  startLoading(){
    this.loading = this.loadingCtrl.create({content: 'Loading'});
    this.loading.present();
  }

  stopLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }

}
