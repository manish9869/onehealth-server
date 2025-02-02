export interface FeaturePermission {
    ID?: number;
    NAME: string;
    featurePermission: { [key: number]: number[] };
    PERMISSION_ID?: number;
}