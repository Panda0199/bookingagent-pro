import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Service } from '../types/service';

const fetchServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });
};