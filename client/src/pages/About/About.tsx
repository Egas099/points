import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_URL } from '../../data/constants';
import styles from './About.module.css';
import ReactMarkdown from 'react-markdown';
import '../../../node_modules/github-markdown-css/github-markdown.css';
import Loader from '../../components/Loader/LoaderIndicator';

const About: FC = () => {
    const [aboutContent, setAboutContent] = useState(<></>);
    useEffect(fetchAboutText);

    function fetchAboutText() {
        fetch(ABOUT_URL)
            .then(async response => {
                setAboutContent(mdComponent(await response.text()));
            })
            .catch(async error => {
                console.error(error);
                setAboutContent(ERROR_MESSAGE);
            });
    }
    const mdComponent = (md: string) => (
        <ReactMarkdown className="markdown-body">{md}</ReactMarkdown>
    );

    const ERROR_MESSAGE = <h3>Произошла ошибка при загрузке описания</h3>;

    return (
        <div className={styles.content}>
            {aboutContent ? aboutContent : <Loader />}
            <Link className={styles.backLink} to="/menu/">
                Back
            </Link>
        </div>
    );
};

export default About;
