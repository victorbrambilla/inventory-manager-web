import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_STOCKS } from 'src/app/graphql/graphql.queries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'inventor-manager-web';
  constructor(private apollo: Apollo) { }
  ngOnInit() {
    this.apollo.watchQuery({
      query: GET_STOCKS
    }).valueChanges.subscribe(result => {
      console.log(result);
    });
  }
}
