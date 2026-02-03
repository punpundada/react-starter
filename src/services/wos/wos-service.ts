import { axisInstance } from "@/lib/constants";
import { objectToQueryString } from "@/lib/utils";
import { VetType } from "@/pages/wos/wos-line/WOSLine";
import {
  WOSCorrespondanceReplayTYpe,
  WOSCorrespondanceTYpe,
  WOSLineType,
  WOSMasterType,
} from "@/type/wos/wos-types";

export type WOSMaterServiceParams = {
  from_date?: string;
  to_date?: string;
  customer_code?: string;
  station_code?: string;
};

export async function wosMasterService(params: WOSMaterServiceParams) {
  const queryString = objectToQueryString(params);
  const res = await axisInstance.get<WOSMasterType[]>(
    "wosmaster" + queryString,
  );
  return res.data;
}

export type WOSLineServiceParams = {
  wosserial: number;
};

export async function wosLineService(params: WOSLineServiceParams) {
  const res = await axisInstance.get<WOSLineType[]>(
    `wosline?wosserial=${params.wosserial}`,
  );
  return res.data;
}

export async function vetWosService(params: VetType) {
  const res = await axisInstance.put(`wosline-bulk`, params);
  return res.data;
}

export type wosCorrespondanceResponseServiceParams = {
  wosSerial: number;
};

export async function wosCorrespondanceResponseService(
  params: wosCorrespondanceResponseServiceParams,
) {
  const res = await axisInstance.get<WOSCorrespondanceTYpe[]>(
    `correspondence/${params.wosSerial}`,
  );
  return res.data;
}

export async function saveWOSReplay(params: WOSCorrespondanceReplayTYpe) {
  const res = await axisInstance.post("correspondence", params);
  return res.data;
}
