import React from 'react'
import ReactCountryFlag from 'react-country-flag';
import './CountryDetails.css'


export default function CountryDetails(props) {
    return (
        <div className="countryDetails">
            <div className="country-icon">
                <ReactCountryFlag
                    className='country-flag'
                    countryCode={props.countryCode}
                    svg
                    style={{
                        width: '3.5em',
                        height: '3.5em'
                    }}
                />
            </div>

            <div className="cases-details">
                <div className="cases-box Cases">
                 {/* eslint-disable-next-line */}
                    <a href="#">{props.totalCases}</a>
                    <p className="yesterday">Last 24 Hours: <strong>{props.newCases}</strong></p>
                </div>

                <div className="cases-box Deaths">
                {/* eslint-disable-next-line */}
                    <a href="#">{props.totalDeaths}</a>
                    <p className="yesterday">Last 24 Hours: <strong>{props.newDeaths}</strong></p>
                </div>

                <div className="cases-box Recovered">
                {/* eslint-disable-next-line */}
                    <a href="#">{props.totalRecovered}</a>
                    <p className="yesterday">Last 24 Hours: <strong>{props.newRecovered}</strong></p>
                </div>
            </div>
        </div>
    )
}
