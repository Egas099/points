import { FC } from 'react'
import MainMenu from '../components/MainMenu/MainMenu'
import '../css/home.css'
interface Props {

}

const Home: FC<Props> = ({ }) => {
    return (
        <div className="home page">
            <h2>The Points</h2>
            <div className="menu__wrapper center-content">
                <MainMenu />
            </div>
        </div>
    )
}

export default Home

