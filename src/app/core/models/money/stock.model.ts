export interface Stock {
  code: string;
  value?: number;
  volume: number;
  startPrice: number;
  startDate?: Date;
  sellPrice?: number;
  sellDate?: Date;
  isHoding?: boolean;
  margin?: number;
}
