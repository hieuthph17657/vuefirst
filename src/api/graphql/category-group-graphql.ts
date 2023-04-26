import {provideApolloClient,useLazyQuery,useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

function getCategoryGroupGraphql(data: { keyword: string, pageable: object }) {
  return useQuery(
    gql`
          query ($keyword: String!, $pageable: Pageable) {
              categoryGroups(keyword: $keyword, pageable: $pageable) {
                  totalCount
                  edges {
                      node {
                          id
                          code
                          name
                          description
                          parentId
                          order
                          status
                      }
                  }
              }
          }
      `,
    { ...data },
    { fetchPolicy: 'network-only' }
  );
}

function getCategoryGroupByCodeGraphql(code: string) {
  return useQuery(
    gql`
          query ($code: String!) {
              categoryGroup(code: $code) {
                  id
                  code
                  name
                  description
                  parentId
                  order
                  status
              }
          }
      `,
    { code }
  );
}

function getCategoryGroupsByParentGraphql(parentId: string) {
  return useQuery(
    gql`
          query ($parentId: String!) {
              childCategoryGroups(parentId: $parentId) {
                  id
                  code
                  name
                  description
                  parentId
                  order
                  status
              }
          }
      `,
    { parentId }
  );
}

function getAllCategoryGroupGraphql() {
  return useQuery(
    gql`
        query {
            allCategoryGroup {
                id
                code
                name
                order
                parentId
            }
        }
    `,
    {},
    { fetchPolicy: 'network-only' }
  );
}

function saveCategoryGroupGraphql() {
  return useMutation(
    gql`
          mutation ($id: String!, $categoryGroupInput: CategoryGroupInput!) {
              saveCategoryGroup(id: $id, categoryGroupInput: $categoryGroupInput) {
                  id
                  code
                  name
                  description
                  parentId
                  order
                  status
              }
          }
      `);
}

function deleteCategoryGroupGraphql() {
  return useMutation(
    gql`
          mutation ($id: String!) {
              deleteCategoryGroup(id: $id) {
                  id
                  code
                  name
                  description
                  parentId
                  status
              }
          }
      `);
}

export {
  deleteCategoryGroupGraphql,
  getAllCategoryGroupGraphql,
  getCategoryGroupByCodeGraphql,
  getCategoryGroupGraphql,
  getCategoryGroupsByParentGraphql,
  saveCategoryGroupGraphql
};
