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
    this.url = "assets/inputFiles/input.json";
    this.getData();
  }

  getData() {
    this.data = this.http.get(this.url);
    this.data.subscribe((data: any) => {
      this.items = data;
    }, err => console.log("log error here===", err),
      () => console.log('return nothing'))
  }

  // function call for lazy loading
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
        console.log('return nothing');
        infiniteScroll.target.complete();
      });
  }

  //function call to refresh the page
  doRefresh(refresher) {
      this.data.subscribe(data => {
      this.items = data;
      refresher.target.complete();
    }, err => {
      console.log("this is a error", err);
      refresher.target.complete()
    },
      () => {
        console.log('return nothing');
        refresher.target.complete();
      });
  }


}
