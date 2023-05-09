import {type GeneralPowerMap, type OriginPowerMap, type RolePowerMap} from '../Map';
import {type GeneralPowerInterface} from '../Power/GeneralPower/GeneralPower';
import {type OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import {type RolePowerInterface} from '../Role/RolePower';
import {type TranslatableName} from '../Translator';
import {type TransactionInterface} from './TransactionInterface';

export type SheetPowersMap = {general: GeneralPowerMap; role: RolePowerMap; origin: OriginPowerMap};
export type SheetPowersInterface = {
	pickGeneralPower(power: GeneralPowerInterface, transaction: TransactionInterface, source: TranslatableName): void;
	pickRolePower(power: RolePowerInterface, transaction: TransactionInterface, source: TranslatableName): void;
	pickOriginPower(power: OriginPowerInterface, transaction: TransactionInterface, source: TranslatableName): void;
	getGeneralPowers(): GeneralPowerMap;
	getRolePowers(): RolePowerMap;
	getOriginPowers(): OriginPowerMap;
};
