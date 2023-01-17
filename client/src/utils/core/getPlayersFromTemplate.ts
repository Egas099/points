export function getPlayersFromTemplate(fieldTemplate: FieldTemplate) {
    return Array.from(
        new Set(fieldTemplate.spawns.map(spawn => spawn.player))
    );
}