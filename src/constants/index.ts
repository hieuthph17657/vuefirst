

export const STATUSES = {
    ACTIVE: 'ACTIVE',
    DEACTIVATE: 'DEACTIVATE',
    DELETED: 'DELETED'
  };

export const DEFAULT_DIALOG_CONFIG = {
  'style': { 'min-width': '50vw' },
  'breakpoints': {
    '960px': '75vw',
    '640px': '90vw'
  },
  'modal': true,
  'dismissable-mask': false,
  'maximizable': true
};

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
export const DEFAULT_PAGINATOR_TEMPLATE = 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown';

export const DEFAULT_DATATABLE_CONFIG = {
  'current-page-report-template':  'Hiển thị {first} đến {last} trên {totalRecords} kết quả',
  'paginator': true,
  'paginator-template': DEFAULT_PAGINATOR_TEMPLATE,
  'rows': DEFAULT_PAGE_SIZE,
  'rows-per-page-options': DEFAULT_PAGE_SIZE_OPTIONS,
  'show-gridlines': true,
  'table-class': 'border-round',
  'striped-rows': true
};