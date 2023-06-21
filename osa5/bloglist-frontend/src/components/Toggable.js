import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel, visible, toggleVisibility, children }) => {

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  return (
    <div>
      <div style={hideWhenVisible}>
      <button onClick={toggleVisibility} data-testid="toggle-button">{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable