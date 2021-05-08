import React, { Component } from 'react'
import './Countries.css'
import HeadlineNames from '../HeadingNames/HeadingNames'
import ArraySort from 'array-sort';
import CountryDetails from './../../components/CountryDetails/CountryDetails'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import Spinner from '../../components/Spinner/Spinner'

export class Countries extends Component {
    
    state = {
        countryDetails: [],
        searchedCountries: []
    }

    async componentDidMount(){
        var countryData = await axios.get('https://api.covid19api.com/summary')
        var countryDetails = countryData.data.Countries
        countryDetails = ArraySort(countryDetails, 'TotalConfirmed', {reverse: true});

        this.setState({
            countryDetails: countryDetails,
            status: true,
            selectedData: countryDetails

        })
    }

    ChangeSortValue = e => {
        const value = e.target.value;
        let sortByReverse = true;

        if(value === "Highest") {
            sortByReverse = true;
        } else {
            sortByReverse = false;
        }
        let countryDetails = ArraySort(this.state.countryDetails, 'TotalConfirmed', {reverse: sortByReverse});
        this.setState({
            countryDetails: countryDetails,
            status: true,

        })
    }

    SearchCountry = e => {
        const value = e.target.value;
        const countryDetails = this.state.countryDetails;
        var FindSpecificCountry = [];

       if(value){
           // eslint-disable-next-line
        countryDetails.map((cur, index) => {
            const finder = cur.Country.toLowerCase().search(value.toLowerCase())

            if(finder !== -1) {
                FindSpecificCountry.push(countryDetails[index])

            }
        })

        FindSpecificCountry = ArraySort(FindSpecificCountry, 'TotalConfirmed', {reverse: true})
        this.setState({searchedCountries: FindSpecificCountry })

       } else{
        this.setState({countryDetails: countryDetails});
       }

       if(value.length === 0){
           this.setState({selectedData: this.state.searchedCountries})
       }
       
    }

    render() {
        const ChangeNumbertoFormat = function(val) {
            return <NumberFormat value={val} thousandSeparator={true} displayType="text" />
        }
        var countriesList = this.state.countryDetails.length > 0 ? 
        this.state.selectedData.map(function(cur, index){
            return   <CountryDetails
                            key={index}
                            countryCode={cur.CountryCode}

                            totalCases={ChangeNumbertoFormat(cur.TotalConfirmed)}
                            newCases={ChangeNumbertoFormat(cur.NewConfirmed)}

                            totalDeaths={ChangeNumbertoFormat(cur.TotalDeaths)}
                            newDeaths={ChangeNumbertoFormat(cur.NewDeaths)}

                            totalRecovered={ChangeNumbertoFormat(cur.TotalRecovered)}
                            newRecovered={ChangeNumbertoFormat(cur.NewRecovered)}

                        /> 
        }) : null
        return (
            <div className='countries-stats'>
                <h2 className='countries-stats-heading'>Countries Stats</h2>
                <hr style={{margin: 'auto 43%', height : '1px' , color: '#c3c3c3'}} />
                <div className='filtering'>
                    <input type='text' placeholder='Enter Country Name' onChange={this.SearchCountry} />
                    <select className='sort-by' onChange={this.ChangeSortValue}>
                        <option>Highest</option>
                        <option>Lowest</option>

                    </select>
                    

                </div>
                <HeadlineNames />
                {this.state.countryDetails.length < 1 ? <Spinner  /> : null }
                {countriesList}
            </div>
        )
    }
}

export default Countries
