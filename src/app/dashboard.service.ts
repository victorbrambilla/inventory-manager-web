import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map } from 'rxjs';
import {
  GET_ENTRIES,
  GET_EXITS,
  GET_FOODS,
  GET_STOCKS,
  GET_UNITS,
} from 'src/app/graphql/graphql.queries';

interface IFilter {
  by: string;
  value: string;
}

interface ISort {
  by: string;
  order: 'ASC' | 'DESC';
}

interface IParams {
  filter: IFilter[];
  sort: ISort;
}

export interface IStock {
  id: number;
  name: string;
}
export interface IStockResult {
  data: IStock[];
  loading: boolean;
  networkStatus: number;
}

interface IEntriesAndExitsParams {
  filter: IFilter[];
  sort: ISort;
  filterByFoodName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apollo: Apollo) {}

  getStocks = (params?: IParams) => {
    return this.apollo.watchQuery({
      query: GET_STOCKS,
      variables: params,
    });
  };

  getFoods = () => {
    return this.apollo.watchQuery({
      query: GET_FOODS,
    });
  };
  getUnits = () => {
    return this.apollo.watchQuery({
      query: GET_UNITS,
    });
  };

  getEntries = (params: IEntriesAndExitsParams) => {
    return this.apollo.watchQuery({
      query: GET_ENTRIES,
      variables: params,
    });
  };

  getExits = (params: IEntriesAndExitsParams) => {
    return this.apollo.watchQuery({
      query: GET_EXITS,
      variables: params,
    });
  };
}
