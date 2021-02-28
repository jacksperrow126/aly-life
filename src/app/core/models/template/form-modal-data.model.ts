export interface IFormModal {
  key: string;
  data?: IStockForm;
}

interface IStockForm {
  code: string;
  startPrice: number;
  volume: number;
}
