export enum OrderCancellationReasonType {
  USER_CANCELLED = 'user cancelled',
  ORDER_AUTO_REJECTED = 'order fullfillment not possible as product out of stock',
  ORDER_REJECTED = 'order rejected by admin',
}
