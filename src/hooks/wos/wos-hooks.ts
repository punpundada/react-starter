import {
  FIVE_MINUTES_MS,
  ONE_MINUTE_MS,
  THIRTY_MINUTES_MS,
} from "@/lib/constants";
import {
  saveWOSReplay,
  vetWosService,
  wosCorrespondanceResponseService,
  wosCorrespondanceResponseServiceParams,
  wosLineService,
  WOSLineServiceParams,
  wosMasterService,
  WOSMaterServiceParams,
} from "@/services/wos/wos-service";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useVetWOSMutation() {
  return useMutation({
    mutationFn: vetWosService,
    meta: {
      invalidatesQuery: [["wos", "line", "list"]],
      errorText: 1,
      successText: "Qty vetted successfully",
    },
  });
}

export function useWOSCorrespondanc(
  params: wosCorrespondanceResponseServiceParams,
) {
  return useQuery({
    queryKey: ["wos", "correspondance", "reply", params],
    queryFn: () => wosCorrespondanceResponseService(params),
    enabled: !!params.wosSerial,
    staleTime: FIVE_MINUTES_MS,
  });
}

export function useSaveWOSReplay(wosSerial:number) {
  return useMutation({
    mutationFn: saveWOSReplay,
    meta: {
      errorText: 1,
      invalidatesQuery: [["wos", "correspondance", "reply",{wosSerial}]],
      successText: "Repled successfully",
    },
  });
}
