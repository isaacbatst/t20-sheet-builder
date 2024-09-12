import {EquipmentName} from '../../../EquipmentName';
import {DefensiveWeaponData} from '../DefensiveWeaponData';
import {type ShieldName} from './ShieldName';

export class ShieldCatalog {
	static items: {
		[N in ShieldName]: DefensiveWeaponData<N>;
	} = {
			heavyShield: new DefensiveWeaponData({
				armorPenalty: 2,
				defenseBonus: 2,
				description: 'Normalmente feito de aço,'
        + ' este escudo é preso ao antebraço e também deve ser'
        + ' empunhado com firmeza, impedindo o usuário de'
        + ' usar aquela mão.',
				equipmentName: EquipmentName.heavyShield,
				price: 15,
				translatedName: 'Escudo Pesado',
				usageLimitType: 'wield',
				slots: 2,
			}),
			lightShield: new DefensiveWeaponData({
				armorPenalty: 1,
				defenseBonus: 1,
				description: ' Tipicamente feito de madeira,'
        + ' este escudo é amarrado no antebraço, deixando a'
        + ' mão livre. Você pode carregar um objeto na mão que'
        + ' empunha o escudo, mas não manusear uma arma.',
				equipmentName: EquipmentName.lightShield,
				price: 5,
				translatedName: 'Escudo Leve',
				usageLimitType: 'wield',
			}),
		};
}
