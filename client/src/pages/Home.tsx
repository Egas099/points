import { FC } from 'react';
import MainMenu from '../components/MainMenu/MainMenu';
import '../css/home.css';

const Home: FC = () => {
    return (
        <div className="home page">
            <div className="home__content">
                <h2>The Points</h2>
                <div className="menu__wrapper center-content">
                    <MainMenu />
                </div>
            </div>
        </div>
    );
};

export default Home;
