import { ONE_MINUTE_MS, THIRTY_MINUTES_MS } from "@/lib/constants";
import {
  wosLineService,
  WOSLineServiceParams,
  wosMasterService,
  WOSMaterServiceParams,
} from "@/services/wos/wos-service";
import { useQuery } from "@tanstack/react-query";

export function useWOSMasterList(params: WOSMaterServiceParams) {
  return useQuery({
    queryKey: ["wos", "master", "list", params],
    queryFn: () => wosMasterService(params),
    meta: {
      errorText: 1,
    },
    staleTime: THIRTY_MINUTES_MS,
  });
}

export function useWOSLineList(params: WOSLineServiceParams) {
  return useQuery({
    queryKey: ["wos", "line", "list", params],
    queryFn: () => wosLineService(params),
    meta: {
      errorText: 1,
    },
    staleTime: ONE_MINUTE_MS,
    enabled: !!params.wosserial,
  });
}
