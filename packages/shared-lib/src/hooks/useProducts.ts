import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductBySlug, fetchProductById } from '../api/products';

export function useProducts(limit: number = 30) {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => fetchProducts(limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
}

export function useProductById(id: number) {
  return useQuery({
    queryKey: ['product', 'id', id],
    queryFn: () => fetchProductById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
