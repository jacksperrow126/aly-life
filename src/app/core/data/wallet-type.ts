import { WalletType } from '@core/models/money/wallet-types.model';
export enum WalletTypeString {
  TIEN_MAT = 'tienMat',
  NGAN_HANG = 'nganHang',
  CO_PHIEU = 'coPhieu',
  TIET_KIEM = 'tietKiem',
  TAI_SAN = 'taiSan',
  TIN_DUNG = 'tinDung',
}
export const walletType: WalletType[] = [
  { name: 'Tiền mặt', value: WalletTypeString.TIEN_MAT, icon: '' },
  { name: 'Ngân hàng', value: WalletTypeString.NGAN_HANG, icon: '' },
  { name: 'Cổ phiếu', value: WalletTypeString.CO_PHIEU, icon: '' },
  { name: 'Tiền tiết kiệm', value: WalletTypeString.TIET_KIEM, icon: '' },
  { name: 'Tài sản', value: WalletTypeString.TAI_SAN, icon: '' },
  { name: 'Tín dụng', value: WalletTypeString.TIN_DUNG, icon: '' },
];
