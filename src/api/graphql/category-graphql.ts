import {provideApolloClient,useLazyQuery,useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import apolloClient from './apollo-clients';
import { ref } from 'vue';

provideApolloClient(apolloClient);

function getCategoryGraphql(data: { keyword: string, pageable: object }) {
  return useQuery(
    gql`
          query ($keyword: String!, $pageable: Pageable) {
              categories(keyword: $keyword, pageable: $pageable) {
                  totalCount
                  edges {
                      node {
                          id
                          code
                          name
                          description
                          groupId
                          order
                          status
                          isDefault
                      }
                  }
              }
          }
      `,
    { ...data },
    { fetchPolicy: 'network-only' }
  );
}

function getCategoryByCodeGraphql(code: string) {
  return useQuery(
    gql`
          query ($code: String!) {
              category(code: $code) {
                  id
                  code
                  name
                  description
                  groupId
                  order
                  status
              }
          }
      `,
    { code }
  );
}

function getCategoriesByGroupGraphql(groupId: string) {
  return useQuery(
    gql`
          query ($groupId: String!) {
              groupCategories(groupId: $groupId) {
                  id
                  code
                  name
                  description
                  groupId
                  order
                  status
              }
          }
      `,
    { groupId }
  );
}

function saveCategoryGraphql() {
  return useMutation(
    gql`
          mutation ($id: String!, $categoryInput: CategoryInput!) {
              saveCategory(id: $id, categoryInput: $categoryInput) {
                  id
                  code
                  name
                  description
                  groupId
                  order
                  status
              }
          }
      `
      );
}

function deleteCategoryGraphql() {
  return useMutation(
    gql`
          mutation ($id: String!) {
              deleteCategory(id: $id) {
                  id
                  code
                  name
                  description
                  groupId
                  order
                  status
              }
          }
      `
      );
}

function getPacketCategoriesGraphql() {
  return useQuery(
    gql`
          query {
              packetCategories {
                  priceTypes {
                      id
                      name
                  }
                  units {
                      id
                      name
                  }
                  types {
                      id
                      name
                  }
              }
          }
      `,
    {},
    { fetchPolicy: 'network-only' }
  );
}

function getServiceCategoriesGraphql() {
  return useLazyQuery(
    gql`
          query {
              serviceCategories {
                  types {
                      id
                      name
                  }
                  units {
                      id
                      name
                  }
              }
          }
      `,
    {},
    { fetchPolicy: 'network-only' }
  );
}

function getCategoryByIdGraphql() {
  return useLazyQuery(
    gql`
            query findById($id : String!){
                findCategoryById(id : $id) {
                        id
                        name
                }
            }
        `,
    {},
    { fetchPolicy: 'cache-and-network' }
  );
}

export {
  deleteCategoryGraphql,
  getCategoriesByGroupGraphql,
  getCategoryByCodeGraphql,
  getCategoryByIdGraphql,
  getCategoryGraphql,
  getPacketCategoriesGraphql,
  getServiceCategoriesGraphql,
  saveCategoryGraphql
};
