import { FC } from 'react';
import {
    getColorClassByPlayer,
    getFormattedDate,
    getIconByPlayerEntity
} from '../../utils/common';
import styles from './SavesList.module.css';

interface Props {
    saves: Save[];
    deleteSave: (id: number) => void;
    loadSave: (id: number) => void;
}

const SavesList: FC<Props> = ({ saves, deleteSave, loadSave }) => {
    try {
        const getIconClass = (profile: PlayerProfile) => {
            return `${styles.player_icon} ${getColorClassByPlayer(
                profile.player
            )}`;
        };
        const getIcon = (profile: PlayerProfile) =>
            getIconByPlayerEntity(profile.entity.playerEntity);

        return (
            <div className={styles.wrapper}>
                <table>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Turn</td>
                            <td>Players</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {saves.map(save => (
                            <tr key={save.date}>
                                <td onClick={() => loadSave(save.date)}>
                                    {getFormattedDate(save.date)}
                                </td>
                                <td onClick={() => loadSave(save.date)}>
                                    {save.state.gameState.moveNumber}
                                </td>
                                <td onClick={() => loadSave(save.date)}>
                                    <div className={styles.icon_conteiner}>
                                        {save.state.gameState.players.map(
                                            (profile: PlayerProfile) => (
                                                <div
                                                    key={profile.player}
                                                    className={getIconClass(
                                                        profile
                                                    )}
                                                >
                                                    {getIcon(profile)}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </td>
                                <td
                                    className={styles.function_bar}
                                    onClick={() => deleteSave(save.date)}
                                >
                                    🗑
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } catch {
        return <div>Saves damaged</div>;
    }
};

export default SavesList;
