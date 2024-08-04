export enum OrderEvent {
  SHIPPED = 'order is shipped',
  PROCESSING = 'order is being processed',
  ORDERDISPATCHED = 'order dispatched through courier partner',
  ORDERDELIVERRED = 'order is delivered',
  PENDINGFORPROCESSING = 'pending for processing',
  RETURNREQUESTED = 'return requested',
  RETURNPROCESSED = 'return processed',
  ORDERCREATED = 'order created',
  PAYMENTPROCESSED = 'payment processed',
  ORDERREJECTED = 'order rejected',
  ORERCANCELLED = 'order cancelled',
}
