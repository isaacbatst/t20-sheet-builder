import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {ResistanceName} from '../../../Resistance/ResistanceName';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {type QareenElementalResistanceType} from '../QareenElementalResistanceType';
import {type QareenType} from '../QareenType';
import {ElementalResistanceEffect} from './ElementalResistanceEffect';

export class ElementalResistance extends RaceAbility {
	static qareenTypeToResistance: Record<QareenType, QareenElementalResistanceType> = {
		air: ResistanceName.electricity,
		darkness: ResistanceName.darkness,
		earth: ResistanceName.acid,
		fire: ResistanceName.fire,
		light: ResistanceName.light,
		water: ResistanceName.cold,
	};

	override effects: AbilityEffectsInterface;

	constructor(qareenType: QareenType) {
		super(RaceAbilityName.elementalResistance);

		this.effects = new AbilityEffects({
			passive: {
				default: new ElementalResistanceEffect(ElementalResistance.qareenTypeToResistance[qareenType]),
			},
		});
	}
}
