import { Player, PlayerEntity } from '../../../types';

export function createProfile(player: Player): PlayerProfile {
    return {
        player: player,
        entity: {
            playerEntity: PlayerEntity.empty,
            id: ''
        }
    };
}
