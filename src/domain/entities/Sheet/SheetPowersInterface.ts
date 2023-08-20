import {type GeneralPowerMap, type GrantedPowerMap, type OriginPowerMap, type RolePowerMap} from '../Map';
import {type GeneralPowerInterface} from '../Power/GeneralPower/GeneralPower';
import {type GrantedPower} from '../Power/GrantedPower/GrantedPower';
import {type OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import {type RolePowerInterface} from '../Role/RolePower';
import {type TranslatableName} from '../Translator';
import {type SerializedSheetOriginPower, type SerializedSheetGrantedPower, type SerializedSheetRolePower, type SerializedSheetGeneralPower} from './SerializedSheet';
import {type TransactionInterface} from './TransactionInterface';

export type SheetPowersMap = {
	general: GeneralPowerMap;
	role: RolePowerMap;
	origin: OriginPowerMap;
	granted: GrantedPowerMap;
};
export type SheetPowersInterface = {
	pickGeneralPower(power: GeneralPowerInterface, transaction: TransactionInterface, source: TranslatableName): void;
	pickRolePower(power: RolePowerInterface, transaction: TransactionInterface, source: TranslatableName): void;
	pickOriginPower(power: OriginPowerInterface, transaction: TransactionInterface, source: TranslatableName): void;
	pickGrantedPower(power: GrantedPower, transaction: TransactionInterface, source: TranslatableName): void;
	getGeneralPowers(): GeneralPowerMap;
	getRolePowers(): RolePowerMap;
	getOriginPowers(): OriginPowerMap;
	getGrantedPowers(): GrantedPowerMap;
	serializeOriginPowers(): SerializedSheetOriginPower[];
	serializeGrantedPowers(): SerializedSheetGrantedPower[];
	serializeRolePowers(): SerializedSheetRolePower[];
	serializeGeneralPowers(): SerializedSheetGeneralPower[];
};
