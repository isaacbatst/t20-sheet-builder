import {RolePlayEffect} from '../../../Ability';
import {OriginPowerName} from '../OriginPowerName';

export class BlueBloodEffect extends RolePlayEffect {
	static description = 'Você tem alguma influência política, suficiente '
  + 'para ser tratado com mais leniência pela guarda, conseguir uma audiência com o nobre local etc.';

	constructor() {
		super(OriginPowerName.blueBlood, BlueBloodEffect.description);
	}
}
