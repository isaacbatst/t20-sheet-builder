import {type EffectRange} from '../../Ability';
import {EffectAffectableArea} from '../../Ability/EffectAffectable';
import {type Affectable} from '../../Affectable/Affectable';
import {ManaCost} from '../../ManaCost';
import type {Cost} from '../../Sheet/CharacterSheet/CharacterSheetInterface';
import {SpellEffect} from '../SpellEffect';
import {SpellName} from '../SpellName';

export class ControlPlantsDefaultEffect extends SpellEffect {
	override range: EffectRange = 'short';
	override affectable: Affectable = new EffectAffectableArea('square');
	override baseCosts: Cost[] = [new ManaCost(1)];
	override description: string = 'Esta magia só pode ser lançada em'
  + ' uma área com vegetação. As plantas se enroscam nas criaturas da área.'
  + ' Aquelas que falharem na resistência ficam enredadas. Uma vítima pode'
  + ' se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.'
  + ' Além disso, a área é considerada terreno difícil. No início de seus turnos,'
  + ' a vegetação tenta enredar novamente qualquer criatura na área, exigindo'
  + ' um novo teste de Reflexos.';

	constructor() {
		super({
			duration: 'scene',
			execution: 'default',
			source: SpellName.controlPlants,
		});
	}
}
