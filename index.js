'use strict';

const apiKey = 'HrlSX9yOQTbCvBdX70pih8ovZeizwK2X41MdaD5t';
const nationalParksURL = 'https://developer.nps.gov/api/v1/parks'


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getNationalParkData(query, maxResults = 10) {
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey,
    }

    const queryString = formatQueryParams(params)
    const url = `${nationalParksURL}?${queryString}`;
    console.log(url)

    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log('uh oh')
            } else {
                console.log(`##${response}`)
                return response.json()
            }
        })
        .then(responseJson => displayResults(responseJson))
        // .then(response => response.json())
        // .then(responseJson => displayResults(responseJson))
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#resultsList').empty();
    console.log(responseJson.data.length)
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#resultsList').append(`<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].addresses[0].line1}<br>
        ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} <br>
        ${responseJson.data[i].addresses[0].postalCode}
        </p>
        <a href='${responseJson.data[i].url}' target='_blank'>${responseJson.data[i].name}</a>
        <p>${responseJson.data[i].description}</p>
        </li>`)
    }
}



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userSearchResults = $('#userSearch').val();
        const maxSearchResults = $('#maxResults').val();
        console.log(userSearchResults);
        console.log(maxSearchResults);
        getNationalParkData(userSearchResults, maxSearchResults);
    })
}


$(watchForm)