import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_URL } from '../../data/constants';
import styles from './About.module.css';
import ReactMarkdown from 'react-markdown';
import '../../../node_modules/github-markdown-css/github-markdown.css';
import Loader from '../../components/Loader/LoaderIndicator';
import { useFetch } from '../../hooks/useFetch';

const About: FC = () => {
    const [aboutContent, loading, error] = useFetch(ABOUT_URL);

    return (
        <div className={styles.content}>
            {loading ? (
                <Loader />
            ) : error ? (
                <h3 className={styles.error}>
                    Произошла ошибка при загрузке описания
                </h3>
            ) : (
                <ReactMarkdown className="markdown-body">
                    {aboutContent}
                </ReactMarkdown>
            )}
            <Link className={styles.backLink} to="/menu/">
                Back
            </Link>
        </div>
    );
};

export default About;
