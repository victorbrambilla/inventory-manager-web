import {gql} from 'apollo-angular'

const GET_STOCKS = gql`
  query {
    stocks {
      id
      name
    }
  }
`

export {GET_STOCKS}
