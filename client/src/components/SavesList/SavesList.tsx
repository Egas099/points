import { FC } from 'react';
import { getColorByPlayer, getIconByPlayerEntity } from '../../logic/common';
import { RootState } from '../../store';
import styles from './SavesList.module.css';

interface Props {
    saves: Save[];
    deleteSave: (id: number) => void;
    loadSave: (state: RootState) => void;
}

const SavesList: FC<Props> = ({ saves, deleteSave, loadSave }) => {
    function getDate(time: number) {
        return new Date(time).toLocaleString().split(', ').reverse().join(', ');
    }

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
                            <td onClick={() => loadSave(save.state)}>
                                {getDate(save.date)}
                            </td>
                            <td onClick={() => loadSave(save.state)}>
                                {save.state.gameState.moveNumber}
                            </td>
                            <td onClick={() => loadSave(save.state)}>
                                <div className={styles.icon_conteiner}>
                                    {save.state.gameState.players.map(
                                        (profile: PlayerProfile) => (
                                            <div
                                                key={profile.player}
                                                className={`${
                                                    styles.player_icon
                                                } ${getColorByPlayer(
                                                    profile.player
                                                )}`}
                                            >
                                                {getIconByPlayerEntity(
                                                    profile.entity.playerEntity
                                                )}
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
};

export default SavesList;
