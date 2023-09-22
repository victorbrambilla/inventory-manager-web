import { gql } from 'apollo-angular';

const GET_STOCKS = gql`
  query ($filter: [FilterArgs!], $sort: SortArgs) {
    stocks(filter: $filter, sort: $sort) {
      id
      name
    }
  }
`;

const GET_UNITS = gql`
  query {
    units {
      id
      name
    }
  }
`;

const GET_FOODS = gql`
  query ($filter: [FilterArgs!], $sort: SortArgs) {
    foods(filter: $filter, sort: $sort) {
      id
      name
      entries {
        id
        quantity
      }
    }
  }
`;

const GET_ENTRIES = gql`
  query ($filter: [FilterArgs!], $sort: SortArgs, $filterByFoodName: String) {
    entries(filter: $filter, sort: $sort, filterByFoodName: $filterByFoodName) {
      id
      quantity
      food {
        id
        name
      }
      stock {
        id
        name
      }
    }
  }
`;

const CREATE_ENTRY = gql`
  mutation createEntry($data: CreateEntryInput!) {
    createEntry(data: $data) {
      id
      quantity
    }
  }
`;

const GET_EXITS = gql`
  query ($filter: [FilterArgs!], $sort: SortArgs, $filterByFoodName: String) {
    exits(filter: $filter, sort: $sort, filterByFoodName: $filterByFoodName) {
      id
      quantity
      entry {
        id
      }
      stock {
        id
        name
      }
    }
  }
`;
const CREATE_EXIT = gql`
  mutation createExit($data: CreateExitInput!) {
    createExit(data: $data) {
      id
      quantity
    }
  }
`;
export {
  GET_STOCKS,
  GET_UNITS,
  GET_FOODS,
  GET_ENTRIES,
  GET_EXITS,
  CREATE_ENTRY,
  CREATE_EXIT,
};
