import {vi} from 'vitest';
import type {Equipment} from '../Inventory/Equipment/Equipment';
import {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import {type OriginInterface} from './Origin';
import type {OriginBenefit} from './OriginBenefit/OriginBenefit';
import {type OriginBenefits} from './OriginBenefit/OriginBenefits';
import {OriginName} from './OriginName';

export class OriginFake implements OriginInterface {
	name: OriginName = OriginName.acolyte;
	equipments: Equipment[] = [];
	chosenBenefits: OriginBenefit[] = [];
	benefits: OriginBenefits = {generalPowers: [], originPower: OriginPowerName.churchMember, skills: []};
	addToSheet = vi.fn();
	serialize = vi.fn();
}
