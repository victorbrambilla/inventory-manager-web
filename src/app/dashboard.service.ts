import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import {
  CREATE_ENTRY,
  CREATE_EXIT,
  GET_ENTRIES,
  GET_EXITS,
  GET_FOODS,
  GET_STOCKS,
  GET_UNITS,
} from 'src/app/graphql/graphql.queries';

export interface ICreateEntry {
  foodId: number;
  stockId: number;
  quantity: number;
  expirationDate: string;
}

interface ICreateExit {
  quantity: number;
  entryId: number;
}

interface IFilter {
  by: string;
  value: string;
}

interface ISort {
  by: string;
  order: 'ASC' | 'DESC';
}

interface IParams {
  filter?: IFilter[];
  sort?: ISort;
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
  filter?: IFilter[];
  sort?: ISort;
  filterByFoodName?: string;
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

  getEntries = (params?: IEntriesAndExitsParams) => {
    return this.apollo.watchQuery({
      query: GET_ENTRIES,
      variables: params,
    });
  };

  createEntry = ({
    foodId,
    stockId,
    quantity,
    expirationDate,
  }: ICreateEntry) => {
    return this.apollo.mutate<any>({
      mutation: CREATE_ENTRY,
      variables: {
        data: {
          foodId,
          stockId,
          quantity,
          expirationDate,
        },
      },
      refetchQueries: [
        {
          query: GET_ENTRIES,
        },
      ],
    });
  };

  getExits = (params?: IEntriesAndExitsParams) => {
    return this.apollo.watchQuery({
      query: GET_EXITS,
      variables: params,
    });
  };

  createExit = ({ quantity, entryId }: ICreateExit) => {
    return this.apollo.mutate<any>({
      mutation: CREATE_EXIT,
      variables: {
        data: {
          quantity,
          entryId,
        },
      },
      refetchQueries: [
        {
          query: GET_ENTRIES,
        },
        {
          query: GET_EXITS,
        },
      ],
    });
  };
}
