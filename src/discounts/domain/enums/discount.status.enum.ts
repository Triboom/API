
export enum DiscountStatus {
  STARTED = 1,
  COMPLETED = 2,
  FAILED = 3
}

export const DiscountStatusLabel = new Map<number, string>([
  [DiscountStatus.STARTED, 'STARTED'],
  [DiscountStatus.COMPLETED, 'COMPLETED'],
  [DiscountStatus.FAILED, 'FAILED'],
]);