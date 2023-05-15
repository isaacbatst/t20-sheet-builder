import type {Equipment} from '../Inventory/Equipment/Equipment';
import {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import type {OriginBenefits, OriginInterface} from './Origin';
import type {OriginBenefit} from './OriginBenefit/OriginBenefit';
import {OriginName} from './OriginName';
import {vi} from 'vitest';

export class OriginFake implements OriginInterface {
	name: OriginName = OriginName.acolyte;
	equipments: Equipment[] = [];
	chosenBenefits: OriginBenefit[] = [];
	benefits: OriginBenefits = {generalPowers: [], originPower: OriginPowerName.churchMember, skills: []};
	addToSheet = vi.fn();
}
