export interface VoucherData {
  code: string;
  amount: number;
  status: string;
  redeemed_at: string | null;
  expires_at: string;
  created_at: string;
  user_wallet: string | null;
}

export interface Voucher {
  voucher: VoucherData;
  qr_code: string;
}
