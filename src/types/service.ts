export type Service = {
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
    description?: string | null;
    is_active: boolean;
    created_at: string;
  };