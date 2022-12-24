import type {Attribute} from '../../../Attributes';
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

	effects: {
		default: ArcanistPathEffect;
	};

	constructor(path: ArcanistPath) {
		super(RoleAbilityName.arcanistPath);

		this.effects = {
			default: new ArcanistPathEffect(path),
		};
	}

	getSpellsAttribute() {
		return ArcanistPathAbility.pathToAttribute[this.effects.default.path.name];
	}

	getLearnFrequency() {
		return ArcanistPathAbility.pathToLearnFrequency[this.effects.default.path.name];
	}
}
