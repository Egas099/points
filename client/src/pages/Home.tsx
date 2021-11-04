import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {

}

const Home: FC<Props> = ({ }) => {
    return (
        <div>
            <h2>The Points</h2>
            <Link className="menu__btn" to="/play">Play!</Link>
        </div>
    )
}

export default Home

