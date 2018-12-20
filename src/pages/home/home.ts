// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';

// Ionic
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';

// Classes
import ConfigClasses from '../../classes/configClasses';

// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Classes
import { MohmEvent } from '../../classes/mohmEvent';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{

  mohmEventsCollection: AngularFirestoreCollection<MohmEvent>;

  mohmEvents: MohmEvent[];

  mohmEventDoc: any;

  justPrintIt: any;

  config: ConfigClasses = new ConfigClasses();

  loading: Loading;

  mohmEventsSubscription: ISubscription;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private fireDB: AngularFirestore, private fireStorage: AngularFireStorage) {}
  ngOnInit(){
    this.startLoading();
    
    this.mohmEventsSubscription = this.fireDB.collection<any>('mohmEvent').snapshotChanges().pipe(
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
      )
      .subscribe((_mohmEvents) => {
        this.mohmEvents = _mohmEvents;
        this.stopLoading();
      }, error => { this.stopLoading(); console.log('[HomeComp] error', error) });
  }

  ngOnDestroy(){
    if(!this.mohmEventsSubscription.closed){
      this.mohmEventsSubscription.unsubscribe();
    }
  }

  attendanceChanged(mEvent: MohmEvent){
    let _text = mEvent.$isGoing ? `Going to` : `Not going to`;
    _text += ` ${mEvent.$title}`;

    const localMohmDoc = {
      isGoing: mEvent.$isGoing,
    }

    this.mohmEventDoc = this.fireDB.doc<MohmEvent>(`mohmEvent/${mEvent.$id}`);

    this.mohmEventDoc.update(localMohmDoc);
    let attendanceToast = this.toastCtrl.create(this.config.createToastConfig(`${_text}`));
    attendanceToast.present();
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

  picUrl(_name: string): Observable<any>{
    const ref = this.fireStorage.ref(_name);
    return ref.getDownloadURL();
  }

}
