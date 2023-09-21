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
  query ($filter: [FilterArgs!], $sort: SortArgs) {
    entries(filter: $filter, sort: $sort) {
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
  query {
    exits {
      id
      quantity
      unit {
        id
        name
      }
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

export {
  GET_STOCKS,
  GET_UNITS,
  GET_FOODS,
  GET_ENTRIES,
  GET_EXITS,
  CREATE_ENTRY,
};
