import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: Observable<any>;
  items: any[];
  url: string;

  constructor(public http: HttpClient) {
    // this.url = "assets/inputFiles/input.json";
    this.getData();
  }
  getData() {
    // this.data = ;
    this.http.get("assets/inputFiles/user1.json").subscribe((data: any)=> {
      this.items = data;
    }, err => console.log("log error here===", err),
      () => console.log('yay'))
  }

  doInfinite(infiniteScroll) {

    this.data = this.http.get(this.url);
    this.data.subscribe(data => {
      this.items = this.items.concat(data);
      infiniteScroll.target.complete();
    }, err => {
      console.log("log error ==", err);
      infiniteScroll.target.complete()
    },
      () => {
        console.log('yay');
        infiniteScroll.target.complete();
      });
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    this.data.subscribe(data => {
      this.items = data;
      refresher.target.complete();
      // this.doRefresh(refresher);
    }, err => {
      console.log("this is a error", err);
      refresher.target.complete()
    },
      () => {
        console.log('yay');
        refresher.target.complete();
      });
  }


}
