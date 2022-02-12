import { FC } from 'react';

interface Props {
    saves: Save[];
}

const SavesList: FC<Props> = ({ saves }) => {
    return (
        <div>
            {!Array.isArray(saves) ? (
                <div>Saves are damaged</div>
            ) : saves.length > 0 ? (
                <ul>
                    {saves.map(save => (
                        <li key={save.date}>{save.date}</li>
                    ))}
                </ul>
            ) : (
                <div>Saves list empty</div>
            )}
        </div>
    );
};

export default SavesList;
