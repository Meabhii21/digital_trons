const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Movies = sequelize.define('movie',{
    uid:{
        type:Sequelize.STRING(30),
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:Sequelize.STRING(100),
        allowNull:true
    },
    releasedYear:{
        type:Sequelize.DATE,
        allowNull:true
    },
    rating:{
        type:Sequelize.STRING(20),
        allowNull:true
    },
    id:{
        type:Sequelize.STRING(20),
        allowNull:true
    },
    genres:{
        type:Sequelize.STRING(250),
        allowNull:true
    }
});

Movies.moviesBetweenYears = async(fromDate,toDate)=>{
    console.log(fromDate,toDate);
    return sequelize.query(`select * from movies where "createdAt" between :fromDate and :toDate `,{
        replacements:{
            fromDate:fromDate,
            toDate:toDate
        },
        type:sequelize.QueryTypes.SELECT
    })
}

Movies.moviesInParticularYear = async(year)=>{
    return sequelize.query(`select title from movies where Extract(year from "createdAt") = :year `,{
        replacements:{
            year:year
        },
        type:sequelize.QueryTypes.SELECT
    })
}

Movies.moviesByRating = async(fromRate,toRate)=>{
    return sequelize.query(`select * from movies where "rating" between :fromRate and :toRate `,{
        replacements:{
            fromRate:fromRate,
            toRate:toRate
        },
        type:sequelize.QueryTypes.SELECT
    })
}

Movies.moviesByGenres = (temp)=>{
    return sequelize.query(`select * from movies where LOWER("genres") || UPPER("genres") || CONCAT("genres") LIKE '%${temp}%' `,{
        replacements:{
            temp:temp
        },
        type:sequelize.QueryTypes.SELECT
    });
}

module.exports = Movies;