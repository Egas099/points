import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { README_URL } from '../../data/constants';
import styles from './About.module.css';

const About: FC = () => {
    const [text, setText] = useState<any>('');
    useEffect(fetchAboutText);

    function fetchAboutText() {
        fetch(README_URL).then(async response => {
            setText(await response.text());
        });
    }

    return (
        <div>
            <h2>About game</h2>
            <pre className={styles.content}>{text}</pre>
            <Link to="/menu/">Back</Link>
        </div>
    );
};

export default About;
