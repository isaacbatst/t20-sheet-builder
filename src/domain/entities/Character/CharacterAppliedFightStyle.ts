import {type FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import type {CharacterModifiers} from './CharacterModifiers';

export class CharacterAppliedFightStyle {
	constructor(
		readonly fightStyle: FightStyle,
		readonly indexesToRemove: {
			attack?: {
				contextual: number[];
			};
			defense?: {
				contextual: number[];
			};
		},
	) {}

	removeModifiers(modifiers: CharacterModifiers): void {
		this.indexesToRemove.attack?.contextual.forEach(index => {
			modifiers.attack.contextual.remove(index);
		});

		this.indexesToRemove.defense?.contextual.forEach(index => {
			modifiers.defense.contextual.remove(index);
		});
	}
}
