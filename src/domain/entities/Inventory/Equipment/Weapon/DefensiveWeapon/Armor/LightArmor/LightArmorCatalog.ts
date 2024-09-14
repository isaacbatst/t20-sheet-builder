import {EquipmentName} from '../../../../EquipmentName';
import {LightArmorData} from './LightArmorData';
import {type LightArmorName} from './LightArmorName';

export class LightArmorCatalog {
	static items: {
		[N in LightArmorName]: LightArmorData<N>;
	} = {
			leatherArmor: new LightArmorData({
				armorPenalty: 0,
				defenseBonus: 2,
				description: 'O peitoral desta ar'
        + ' madura é feito de couro curtido em óleo fervente,'
        + ' para ficar mais rígido, enquanto as demais partes são'
        + ' feitas de couro flexível.',
				equipmentName: EquipmentName.leatherArmor,
				price: 20,
				translatedName: 'Armadura de Couro',
			}),
			studdedLeather: new LightArmorData({
				armorPenalty: 1,
				defenseBonus: 3,
				description: 'Versão mais pesada da armadura de couro, reforçada com rebites de metal.',
				equipmentName: EquipmentName.studdedLeather,
				price: 35,
				translatedName: 'Couro Batido',
			}),
		};
}
