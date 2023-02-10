import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  QueryObserverBaseResult,
} from '@tanstack/react-query';

export interface SuspensedQueryResult<TData, TError>
  extends QueryObserverBaseResult<TData, TError> {
  data: TData;
  status: 'success';
  isSuccess: true;
}

const useSuspensedQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'suspense'
  >
): SuspensedQueryResult<TData, TError> => {
  return useQuery({
    ...options,
    queryKey,
    queryFn,
    suspense: true,
  }) as SuspensedQueryResult<TData, TError>;
};

export default useSuspensedQuery;
