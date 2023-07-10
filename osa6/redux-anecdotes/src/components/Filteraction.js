import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = () => {

    const dispatch = useDispatch()
    const setSearchText = (value) => {
        console.log(value)
        dispatch(setFilter(value))
    }

    return (
        <div>
            <input placeholder='search' onChange={ev => setSearchText(ev.target.value)}></input>
        </div>

    )
}

export default Filter