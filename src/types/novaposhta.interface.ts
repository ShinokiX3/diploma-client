export interface IAddress {
	Ref: string;
	SettlementType: string;
	Latitude: string;
	Longitude: string;
	Description: string;
	DescriptionRu: string;
	DescriptionTranslit: string;
	SettlementTypeDescription: string;
	SettlementTypeDescriptionRu: string;
	SettlementTypeDescriptionTranslit: string;
	Region: string;
	RegionsDescription: string;
	RegionsDescriptionRu: string;
	RegionsDescriptionTranslit: string;
	Area: string;
	AreaDescription: string;
	AreaDescriptionRu: string;
	AreaDescriptionTranslit: string;
	Index1: string;
	Index2: string;
	IndexCOATSU1: string;
	Delivery1: string;
	Delivery2: string;
	Delivery3: string;
	Delivery4: string;
	Delivery5: string;
	Delivery6: string;
	Delivery7: string;
	SpecialCashCheck: number;
	Warehouse: string;
}

export interface ICityData {
	TotalCount: number;
	Addresses: IAddress[];
}

export interface ICitiesResponse {
	success: boolean;
	data: IAddress[];
	errors: [];
	warnings: [];
	info: [] | { totalCount: number };
	messageCodes: [];
	errorCodes: [];
	warningCodes: [];
	infoCodes: [];
}

export interface ICitiesResponseError {
	success: boolean;
	data: [];
	errors: [];
	warnings: [];
	info: [];
	messageCodes: [];
	errorCodes: [];
	warningCodes: [];
	infoCodes: [];
}
