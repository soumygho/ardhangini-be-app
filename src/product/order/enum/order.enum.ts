export enum OrderType {
  COD = 'cashondelivery',
  ONLINE = 'onlinepayment',
}

export enum OrderStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESS = 'successful',
  REJECTED = 'rejected',
}
