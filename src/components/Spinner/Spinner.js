import React from 'react'
import spinner from './spinner.gif'

 function Spinner() {
    return (
        <div className='spinner'>
              <img src={spinner} alt='loading...' style={styles} />
        </div>
    )
}

const styles = {
    width: '200px',
    margin: 'auto',
    display: 'block'
}
export default Spinner