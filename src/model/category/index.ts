import { STATUSES } from '../../constants';

export interface CategoryInterface {
  id: string,
  code: string,
  name: string,
  description: string,
  groupId: string | null,
  order: number | null,
  isDefault: boolean | null,
  status: string
}

export class Category implements CategoryInterface {
  isDefault: boolean | null;

  order: number | null;

  code: string;

  description: string;

  id: string;

  name: string;

  groupId: string | null;

  status: string;

  constructor() {
    this.id = '';
    this.code = '';
    this.name = '';
    this.description = '';
    this.groupId = null;
    this.order = 0;
    this.isDefault = false;
    this.status = STATUSES.ACTIVE;
  }

}

export interface CategoryEdge {
  cursor: string
  node: CategoryInterface | null
}

export interface CategoryGroupInterface {
  id: string,
  code: string,
  name: string,
  description: string,
  parentId: string | null,
  order: number,
  status: string
}

export class CategoryGroup implements CategoryGroupInterface {
  code: string;

  description: string;

  id: string;

  name: string;

  order: number;

  parentId: string | null;

  status: string;

  constructor() {
    this.id = '';
    this.code = '';
    this.name = '';
    this.description = '';
    this.parentId = null;
    this.order = 0;
    this.status = STATUSES.ACTIVE;
  }

}

export interface CategoryGroupEdge {
  cursor: string
  node: CategoryGroupInterface | null
}

export interface CategoryOption {
  id: string,
  code: string,
  name: string,
  order: number,
  parentId: string
}