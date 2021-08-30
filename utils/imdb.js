var imdb = require('imdb-api');
const express = require('express');

exports.imdbData = async(movieName)=>{
    const imdbData = await imdb.get({name:`${movieName}`}, {apiKey: 'f13ea555',timeout: 30000})
        return imdbData;
}

exports.imdbDataById = async(movieId)=>{
    const imdbData = await imdb.get({id:`${movieId}`}, {apiKey: 'f13ea555',timeout: 30000})
        return imdbData;
}