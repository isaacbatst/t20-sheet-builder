import {AbilityEffects, type AbilityEffectsInterface} from '../../../../Ability';
import {AbilityEffectsStatic} from '../../../../Ability/AbilityEffectsStatic';
import {AttributeRequirement} from '../../../Requirement/AttributeRequirement';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';
import {GeneralPowerName} from '../../GeneralPowerName';
import {CommandEffect} from './CommandEffect';

export class Command extends GeneralPower {
	static readonly powerName = GeneralPowerName.command;
	static readonly effects = new AbilityEffectsStatic({
		roleplay: {
			default: CommandEffect,
		},
	});

	override group: GeneralPowerGroup = GeneralPowerGroup.destiny;

	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new CommandEffect(),
		},
	});

	constructor() {
		super(GeneralPowerName.command);
		this.addRequirement(new AttributeRequirement('charisma', 1));
	}
}
