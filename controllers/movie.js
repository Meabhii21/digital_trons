const Movies =  require('../models/movies');
const imdbDetail = require('../utils/imdb'); 
const base64Id = require('base64id');
// const { Movie } = require('imdb-api');
const Sequelize = require('sequelize');
const e = require('express');
const Op = Sequelize.Op;

exports.searchMovieName = async(req,res,next)=>{
    const title = req.query.title;
    const movieDetail = await Movies.findOne({where:{title:title}});
    if(movieDetail){
        return res.status(200).json({status:1,msg:'DB Detail',data:movieDetail});
    }else{
        imdbDetail.imdbData(title)
                   .then(async thisData=>{
                       Movies.create({
                           uid:base64Id.generateId(),
                           title:thisData.title,
                           releasedYear:thisData.released,
                           rating:thisData.rating,
                           id:thisData.imdbid,
                           genres:thisData.genres
                       })
                     return res.status(200).json({status:1,msg:'IMDB Data:',data:thisData});
                   }).catch(err=>{
                       return res.status(500).json({status:0,msg:'Something went wrong'});
                   });
    }
}

exports.searchMovieById = async(req,res,next)=>{
    const movieId = req.query.id;
    const movieDetails = await Movies.findOne({where:{id:movieId}});
    if(movieDetails){
        return res.status(200).json({status:1,msg:'DB DATA:',data:movieDetails});
    }else{
        imdbDetail.imdbDataById(movieId)
                  .then(async thisData=>{
                    Movies.create({
                        uid:base64Id.generateId(),
                        title:thisData.title,
                        releasedYear:thisData.released,
                        rating:thisData.rating,
                        id:thisData.imdbid,
                        genres:thisData.genres
                    })
                    return res.status(200).json({status:1,msg:'IMDB Data:',data:thisData});
                  }).catch(err=>{
                      console.log(err);
                      return res.status(500).json({status:0,msg:'Something went wrong'});
                  })
    }
}

exports.searchMovieByYear = async(req,res,next)=>{
    const fromDate = req.params.fromDate;
    const toDate = req.params.toDate;
    Movies.moviesBetweenYears(fromDate,toDate)
          .then(async thisData=>{
              if(thisData.length>0){
                return res.status(200).json({status:1,msg:'Movie List',data:thisData});
              }else{
                  return res.status(400).json({status:1,msg:'No data found'});
              }
          }).catch(err=>{
              console.log(err);
              return res.status(200).json({status:1,msg:'Something went wrong'});
          });
}

exports.moviesReleasedInParticularYear = async(req,res,next)=>{
    const year = req.params.year

    Movies.moviesInParticularYear(year)
          .then(async thisData=>{
            if(thisData.length>0){
                return res.status(200).json({status:1,msg:'Movie List',data:thisData});
            }else{
                return res.status(400).json({status:1,msg:'No data found'});
            }
          }).catch(err=>{
              console.log(err);
              return res.status(500).json({status:1,msg:'Something went wrong'});
          });
}

exports.searchMovieByRating = async(req,res,next)=>{
    const fromRate  = req.params.fromRate;
    const toRate = req.params.toRate;

    Movies.moviesByRating(fromRate,toRate)
          .then(async thisData=>{
             if(thisData.length>0){
                 return res.status(200).json({status:1,msg:'Movie List',data:thisData});
             }else{
                 return res.status(400).json({status:1,msg:'No data found'});
             }
          }).catch(err=>{
              console.log(err);
              return res.status(500).json({status:0,msg:'Something went wrong'});
          });
}

exports.searchMovieByGenre = async(req,res,next)=>{
    const genre = req.query.genre;
    Movies.moviesByGenres(genre)
          .then(async thisData=>{
            if(thisData.length>0){
                return res.status(200).json({status:1,msg:'Movie List',data:thisData});
            }else{
                return res.status(400).json({status:1,msg:'No data found'});
            }
          }).catch(err=>{
              console.log(err);
            return res.status(500).json({status:0,msg:'Something went wrong'});
          });
}

