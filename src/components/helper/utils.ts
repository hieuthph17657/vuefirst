// import './string.extensions';

import { assign, camelCase, find, groupBy, isDate, isEmpty, lowerFirst, merge, toLower } from 'lodash';
import type { TreeExpandedKeys, TreeNode, TreeSelectionKeys } from 'primevue/tree';
import type { TreeTableExpandedKeys, TreeTableSelectionKeys } from 'primevue/treetable';
import { markRaw } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

// import DynamicDialogFooter from '@/components/dialog/DynamicDialogFooter.vue';
// import { ACTIVITY_STATUSES, DEFAULT_DIALOG_CONFIG, MENU_MODULES } from '@/constants';
// import i18n from '@/i18n';
// import type { InformationDialogProperties } from '@/model/dialog';
// import router from '@/router';
// import { routes } from '@/router/routes';
// import { usePermissionStore } from '@/store/permission';

// const { t } = i18n.global;

// export const hideInformationDialog = (informationDialogProperties: InformationDialogProperties) => {
//   assign(informationDialogProperties, {
//     type: '',
//     title: '',
//     message: '',
//     show: false
//   });
// };

// export const dynamicDialogConfig = ({ props = {}, templates = {}, emits = {}, footerButtons = [], data = {} }) => {
//   const defaultProps = DEFAULT_DIALOG_CONFIG;

//   const defaultTemplates = { footer: markRaw(DynamicDialogFooter) };

//   const defaultFooterButtons = {
//     closeButton: {
//       icon: 'close',
//       label: t('common.close'),
//       text: true,
//       severity: 'danger',
//       type: 'button'
//     },
//     actionButton: {
//       icon: 'check',
//       type: 'button',
//       text: true,
//     },
//     otherButtons: []
//   };

//   return {
//     props: merge(defaultProps, props),
//     templates: merge(defaultTemplates, templates),
//     data: {
//       footerButtons: merge(defaultFooterButtons, footerButtons),
//       ...data 
//     },
//     emits
//   };
// };

// type Menu = {
//   label: string | symbol | undefined
//   icon?: string
//   to?: string
//   items: Menu[] | null
// }

// export const extractMenuFromRoutes: () => [{ items: Menu[] | null }] = () => {
//   function extractChildrenMenu(path: string, children: RouteRecordRaw[]): Menu[] | null {
//     const childrenFilter = children.filter((route: RouteRecordRaw) => !isEmpty(route.path)
//       && usePermissionStore().hasPermission(route.meta?.functionMapping as string || '')
//       && (route.meta && (typeof route.meta.showInMenu === 'undefined' || route.meta.showInMenu)));
//     return childrenFilter && childrenFilter.length ? childrenFilter.map((route: RouteRecordRaw) => {
//       return {
//         label: typeof route.name === 'string' ? t(`components.${lowerFirst(route.name)}`) : route.name,
//         icon: route.meta?.icon as string,
//         to: `${path}/${route.path}`,
//         items: route.children ? extractChildrenMenu(`${path}/${route.path}`, route.children) : null
//       };
//     }) : null;
//   }

//   const root: RouteRecordRaw | undefined = find(routes, (route) => {
//     return route.path === '/';
//   });

//   return [{ items: extractChildrenMenu('', root?.children || [] as RouteRecordRaw[]) }];
// };

// export const extractGroupMenuFromRoutes: () => [{ items: Menu[] | null }] = () => {
//   const extractGroupMenu = (parentMenu: string, children: RouteRecordRaw[]): Menu => {
//     const items = extractChildrenMenu('', children);
//     return {
//       label: t(`components.${camelCase(parentMenu)}`),
//       to: items === null && children.length === 1 ? children[0].path : undefined,
//       icon: items === null && children.length === 1 ? children[0].path : MENU_MODULES[camelCase(parentMenu) as keyof typeof MENU_MODULES].icon,
//       items
//     };
//   };

//   const extractChildrenMenu = (path: string, children: RouteRecordRaw[]): Menu[] | null => {
//     const childrenFilter = children.filter((route: RouteRecordRaw) => !isEmpty(route.path) && route.meta
//       && usePermissionStore().hasPermission(route.meta.functionMapping as string)
//       && route.meta.showInMenu);

//     return childrenFilter.length ? childrenFilter.map((route: RouteRecordRaw) => {
//       return {
//         label: typeof route.name === 'string' ? t(`components.${lowerFirst(route.name)}`) : route.name,
//         icon: route.meta?.icon as string,
//         to: `${path}/${route.path}`,
//         items: route.children ? extractChildrenMenu(`${path}/${route.path}`, route.children) : null
//       };
//     }) : null;
//   };

//   const root: RouteRecordRaw = find(routes, ['path', '/']) || {
//     children: [],
//     path: '' 
//   };
//   const groupByParentMenu = groupBy(root.children, 'meta.parentModule');
//   return [{ items: Object.keys(groupByParentMenu).map((key) => extractGroupMenu(key, groupByParentMenu[key])).filter(menu => menu) }];
// };

// export const allowRoutes = () => {
//   const routes = router.getRoutes();
//   return routes.filter(r => usePermissionStore().hasPermission(r.meta?.functionMapping as string || ''));
// };

// export const generateHeaderDialog = (action: string, objectName: string, itemName: string) => {
//   const object = toLower(isEmpty(objectName) ? '' : ' ' + t(objectName));
//   const item = isEmpty(itemName) ? '' : ': ' + itemName;
//   return `${action}${object}${item}`;
// };

// export const getStatuses = () => {
//   return Object.keys(ACTIVITY_STATUSES).map((key) => {
//     const status = ACTIVITY_STATUSES[key as keyof typeof ACTIVITY_STATUSES];
//     return {
//       label: t(`common.statuses.${toLower(status)}`),
//       value: status
//     };
//   });
// };

export const convertAlias = (str: string, toUpperCase = false) => {
  str = str ? str.trim().toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '') // Huyền sắc hỏi ngã nặng
    .replace(/\u02C6/g, '') // Â, Ê
    .replace(/\u0306/g, '') // Ă
    .replace(/\u031B/g, '') // Ơ, Ư
    : '';

  return toUpperCase ? str.toUpperCase() : str;
};

// export const objectDataToQueryString: (obj: object) => string = (obj: object) => {
//   const str = [];
//   const keys = Object.keys(obj);
//   for (const p in obj) {
//     if (keys.indexOf(p) >= 0) {
//       const c = obj[p as keyof typeof obj];
//       if (typeof c === 'object' && !isDate(c)) {
//         str.push(objectDataToQueryString(c));
//       } else {
//         str.push(encodeURIComponent(p) + '=' + (c != null ? encodeURIComponent(c) : ''));
//       }
//     }
//   }
//   return str.join('&');
// };

export const mapEnum = (enumData: object) => {
  return (
    Object.keys(enumData).filter((v) =>
      !isNaN(Number(v)),
    ) as (keyof typeof enumData)[]
  ).map((key) => {
    return enumData[key];
  });
};

type ReType<T, K extends string> = T & { [P in K]?: ReType<T, K>[] }

interface TreeOption<T extends object> {
  id: keyof T
  parentId: keyof T
  children: keyof T
}

export function listToTree<
  T extends object,
  C extends Pick<TreeOption<T>, 'id'> & {
    parentId: keyof T
    children: string & keyof R
  },
  R extends ReType<T, C['children']>,
>(list: T[], options: TreeOption<T>): R[] {
  const res: R[] = [];
  const fullMap = new Map<T[C['id']], T>(list.map((v) => [v[options.id], v]));

  for (const node of list) {
    const parent: R = fullMap.get(node[options.parentId]) as R;
    if (parent) {
      if (!parent[options.children]) {
        parent[options.children] = [] as any;
      }
      parent[options.children]?.push(node);
    } else {
      res.push(node as any);
    }
  }

  return res;
}

export const expandTreeNodes = (trees: TreeNode[], expandedNodes: TreeExpandedKeys | TreeTableExpandedKeys) => {
  const expandNode = (node: TreeNode) => {
    if (node.children && node.children.length && node.key) {
      (expandedNodes as TreeTableExpandedKeys)[node.key] = true;

      for (const child of node.children) {
        expandNode(child);
      }
    }
  };

  for (const node of trees) {
    expandNode(node);
  }

  expandedNodes = { ...expandedNodes };

  return expandedNodes;
};

export const checkTreeNodes = (nodes: TreeNode[], selectedNodes: TreeSelectionKeys | TreeTableSelectionKeys, referenceData: string[]) => {
  const checkNode = (node: TreeNode) => {
    if (node.key) {
      if (node.children && node.children.length) {
        const countCheck = (childs: TreeNode[]) => {
          let count = 0;
          childs.forEach((child) => {
            if (child.key && referenceData.includes(child.key)) {
              count++;
            }
          });
          return count;
        }; 

        const count = countCheck(node.children);
        if (count > 0) {
          (selectedNodes as TreeTableSelectionKeys)[node.key] = count === node.children.length
            ? {
              checked: true,
              partialChecked: false 
            }
            : {
              checked: false,
              partialChecked: true
            };
        }

        for (const child of node.children) {
          checkNode(child);
        }
      } else {
        if (referenceData.includes(node.key)) {
          (selectedNodes as TreeTableSelectionKeys)[node.key] = {
            checked: true,
            partialChecked: false 
          };
        }
      }
    }
  };

  for (const node of nodes) {
    checkNode(node);
  }

  selectedNodes = { ...selectedNodes };

  return selectedNodes;
};

export const decodeBase64Utf8 = (encodedString: string) => {
  return decodeURIComponent(atob(encodedString).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};