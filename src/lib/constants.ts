import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
export const axisInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successText?: string | ((val: any) => string);
      errorText: string | ((val: any, error: Error | AxiosError) => string) | 1;
    };
    queryMeta: {
      successText?: string;
      errorText?:
        | string
        | ((val: any, error: Error | AxiosError) => string)
        | 1;
    };
  }
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSettled: (data, error: any, _variables, _context, mutation) => {
      if (!error && mutation?.meta?.invalidatesQuery) {
        if (Array.isArray(mutation.meta.invalidatesQuery[0])) {
          mutation.meta.invalidatesQuery.forEach((item) => {
            queryClient.invalidateQueries({
              queryKey: item as any,
            });
          });
        }
        queryClient.invalidateQueries({
          queryKey: mutation?.meta?.invalidatesQuery,
        });
        if (mutation.meta.successText) {
          toast.success(mutation.meta.successText);
        }
      }
      const errorMsg = mutation.meta?.errorText as any;
      if (!error) return;
      if (typeof errorMsg === "string") {
        toast.error(errorMsg);
      } else if (typeof errorMsg === "number") {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error(errorMsg(data, error));
      }
    },
  }),
  queryCache: new QueryCache({
    onSettled(data, error: any, query) {
      const successText = query?.meta?.successText;

      if (!error && successText) {
        toast.success(successText);
      }
      const errorText = query?.meta?.errorText;

      if (!error) return;
      if (typeof errorText === "string") {
        toast.error(errorText);
      } else if (typeof errorText === "function") {
        toast.error(errorText(data, error));
      } else {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error(error.message);
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ONE_MINUTE_MS = 1000 * 60; // 60_000
export const FIVE_MINUTES_MS = 1000 * 60 * 5; // 300_000
export const TEN_MINUTES_MS = 1000 * 60 * 10; // 600_000
export const FIFTEEN_MINUTES_MS = 1000 * 60 * 15; // 900_000
export const TWENTY_MINUTES_MS = 1000 * 60 * 20; // 1_200_000
export const TWENTY_FIVE_MINUTES_MS = 1000 * 60 * 25; // 1_500_000
export const THIRTY_MINUTES_MS = 1000 * 60 * 30; // 1_800_000
export const THIRTY_FIVE_MINUTES_MS = 1000 * 60 * 35; // 2_100_000
export const FORTY_MINUTES_MS = 1000 * 60 * 40; // 2_400_000
export const FORTY_FIVE_MINUTES_MS = 1000 * 60 * 45; // 2_700_000
export const FIFTY_MINUTES_MS = 1000 * 60 * 50; // 3_000_000
export const FIFTY_FIVE_MINUTES_MS = 1000 * 60 * 55; // 3_300_000
export const ONE_HOUR_MS = 1000 * 60 * 60; // 3_600_000
