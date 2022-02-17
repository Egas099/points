import { FC } from 'react';
import { Link } from 'react-router-dom';

const About: FC = () => {
    return (
        <div className="about page">
            <h2>About game</h2>
            <Link to="/menu/">Back</Link>
        </div>
    );
};

export default About;
