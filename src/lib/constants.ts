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
