import { Player, PlayerEntity } from '../../../data/enums';

export function createProfile(player: Player): PlayerProfile {
    return {
        player: player,
        entity: {
            playerEntity: PlayerEntity.empty,
            id: ''
        }
    };
}
