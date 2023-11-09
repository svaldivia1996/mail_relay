export interface Alias {
  id: number;
  email: string;
  active: boolean;
  user_id: number;
}

export interface AliasFormValues {
  active?: boolean;
  description?: string;
}
