import React, { Component } from 'react'
import './WorldStats.css';

export class WorldStats extends Component {
    render() {
        return (
        <div className='WorldStats-box'>
            <h1 className='totalNumbers'>{this.props.total}</h1>
            <p className='about'>{this.props.about}</p>
            
        </div>
        )
    }
}

export default WorldStats
