import {AbilityEffects} from '../../../Ability/AbilityEffects';
import type {Attribute} from '../../../Sheet/Attributes';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {ArcanistPath, ArcanistPathName} from './ArcanistPath';
import {ArcanistPathEffect} from './ArcanistPathEffect';

export class ArcanistPathAbility extends RoleAbility {
	static pathToAttribute: Record<ArcanistPathName, Attribute> = {
		mage: 'intelligence',
		sorcerer: 'charisma',
		wizard: 'intelligence',
	};

	static pathToLearnFrequency: Record<ArcanistPathName, 'all' | 'odd'> = {
		mage: 'all',
		sorcerer: 'odd',
		wizard: 'all',
	};

	effects: ReturnType<typeof this.getAbilityEffects>;

	constructor(path: ArcanistPath) {
		super(RoleAbilityName.arcanistPath);

		this.effects = this.getAbilityEffects(path);
	}

	getSpellsAttribute() {
		return this.effects.passive.default.path.spellsAttribute;
	}

	getLearnFrequency() {
		return this.effects.passive.default.path.spellLearnFrequency;
	}

	private getAbilityEffects(path: ArcanistPath) {
		return new AbilityEffects({
			passive: {
				default: new ArcanistPathEffect(path),
			},
		});
	}
}
