import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'



const Filter = (props) => {
    const setSearchText = (value) => {
        console.log(value)
        props.setFilter(value)
    }
    return (
        <div>
            <input placeholder='search' onChange={ev => setSearchText(ev.target.value)}></input>
        </div>
    )
}

const mapDispatchToProps = {
    setFilter,
  }

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter


//vanha versio ilman connectia
/*const Filter = () => {

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

export default Filter*/