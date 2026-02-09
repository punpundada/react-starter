import z from "zod";

export type WOSMasterType = {
    WOSSerial: number;
    CustomerCode: string;
    WOSType: string;
    InitiatedBy: string;
    DateTimeInitiated: string;
    ConcurredBy: string;
    DateTimeConcurred: string;
    UOINumber: string;
    UOIDate: string;
    ApprovedBy: string;
    DateTimeApproved: string;
    SanctionNo: string;
    SanctionDate: string;
    ClosedBy: string | null;
    DateTimeClosed: string | null;
    Remarks: string | null;
};

export type WOSLineType = {
    WOSSerial: number;
    WOSLineSerial: number;
    ItemCode: string;
    ItemDesc: string;
    ItemDeno: string;
    SOS: string;
    AuthorisedQty: number;
    ReceivedQty: number;
    BalanceQty: number;
    ReviewedQty: number;
    VettedQty: number;
    RecommendedQty: number;
    DateFromWhichHeld: string;
    AuthorityRef: string;
    AuthorityDate: string;
    Justification: string;
    Price: number;
    TotalCost: number;
    Remarks: string;
    ClosedBy: string | null;
    DateTimeClosed: string | null;
};

const vettedLineSchema = z.object({
    VettedQty: z.coerce
        .number({ required_error: "VettedQty is required" })
        .min(1),
    WOSLineSerial: z.coerce
        .number({ required_error: "WOSLineSerial is required" })
        .min(1),
});

export const vettedQtySchema = z.object({
    WOSSerial: z.coerce
        .number({ required_error: "WOSSerial is required parameter" })
        .min(1),
    Lines: z.array(vettedLineSchema),
});

export type WOSCorrespondanceTYpe = {
    LineNo: number;
    TableName: string;
    PrimaryKeyValue: string;
    RoleName: string;
    CorrespondenceBy: string;
    CorrespondenceToRole: string;
    DateTimeCorrespondence: string;
    CorrespondenceType: string;
    StationCode: string;
    Remarks: string;
    DocumentType: string;
    CorrespondenceChoice: string;
    CorrespondenceTypeDescription: string;
};


export const WOSCorrespondanceReplaySchema = z.object({
    TableName: z.string().optional(),
    PrimaryKeyValue: z
        .string({ required_error: "WOS Serial is requreid" })
        .nonempty(),
    RoleName: z.string({ required_error: "RoleName is require" }).nonempty(),
    CorrespondenceBy: z
        .string({ required_error: "CorrespondenceBy is required" })
        .nonempty(),
    CorrespondenceToRole: z
        .string({ required_error: "CorrespondenceToRole is required" })
        .nonempty(),
    CorrespondenceType: z
        .string({ required_error: "CorrespondenceType is required" })
        .nonempty(),
    StationCode: z
        .string({ required_error: "StationCode is required" })
        .nonempty(),
    Remarks: z.string({ required_error: "Remarks is required" }).nonempty(),
    DocumentType: z.string().optional().nullable(),
    CorrespondenceChoice: z
        .string({ required_error: "CorrespondenceChoice is required" })
        .nonempty(),
});

export type WOSCorrespondanceReplayTYpe = z.infer<
    typeof WOSCorrespondanceReplaySchema
>;

export const WOSResponseSchema = z.object({
    text: z
        .string({ required_error: "Text is required" })
        .min(6, "Text must be at least 6 characters long"),
    loginId: z.string({ required_error: "LoginId is required" }).nonempty(),
    role: z.string({ required_error: "Role is required" }).nonempty(),
    correspondenceType: z
        .string({ required_error: "CorrespondenceType is required" })
        .nonempty(),
});

export type WOSResponseType = z.infer<typeof WOSResponseSchema>;


