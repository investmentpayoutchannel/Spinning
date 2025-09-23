// Basic types for the lucky draw application

export interface Prize {
  id: string;
  label: string;
  amount: number;
  weight: number;
  isActive: boolean;
}

export interface SpinResult {
  amount: number;
  label: string;
  canSpinAgain: boolean;
  prizeId: string;
}