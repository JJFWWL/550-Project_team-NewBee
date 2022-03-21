const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
//fill information in config.json
const connection = mysql.createConnection({
    host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect();



// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
//changed for project to get the user favorite business(>=4) and return as result
//http://localhost:8080/friend_business/username/?page=2&pagesize=5
async function friend_business(req, res) {
    

    const userName = req.query.name ? req.query.name : "Ken"
    

    if (req.query.page && !isNaN(req.query.page)) {
        
        const page=parseInt(req.query.page);
        const pageSize= req.query.pagesize && !isNaN(req.query.pagesize)? parseInt(req.query.pagesize):10;
        const stringLimit="LIMIT "+(page - 1) * pageSize + "," + pageSize;

        //WHERE Division = '${league}'
        //ORDER BY HomeTeam, AwayTeam ${stringLimit}
        connection.query(
          `WITH ZERO AS(SELECT user.user_id
            FROM user JOIN (SELECT MAX(user.review_count) as masR FROM user WHERE user.name='${userName}') MR ON user.review_count=MR.masR
            WHERE user.name='${userName}')
            SELECT DISTINCT RP.business_id,Business.name,Business.address,Business.city,Business.State
            FROM review_Portland RP JOIN ZERO ON RP.user_id=ZERO.user_id
                                    JOIN Business ON RP.business_id=Business.business_id
            WHERE RP.stars>=4 ${stringLimit}`,
            
            function (error, results, fields) {
              if (error) {
                console.log(error);
                res.json({ error: error });
              } else if (results) {
                res.json({ results: results });
              } else {
                res.json({ results: [] });
              }
            }
          );

    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`WITH ZERO AS(SELECT user.user_id
          FROM user JOIN (SELECT MAX(user.review_count) as masR FROM user WHERE user.name='${userName}') MR ON user.review_count=MR.masR
          WHERE user.name='${userName}')
          SELECT DISTINCT RP.business_id,Business.name,Business.address,Business.city,Business.State
          FROM review_Portland RP JOIN ZERO ON RP.user_id=ZERO.user_id
                                  JOIN Business ON RP.business_id=Business.business_id
          WHERE RP.stars>=4 `, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }else {
                res.json({ results: [] });
              }
        });
    }
}


// Route 3.2 (handler)
//changed for project to get the user favorite business(>=4) and return as result
//http://localhost:8080/friend_connection/businessID/?page=2&pagesize=5
async function friend_connection(req, res) {
    

  const ID = req.query.id ? req.query.id : "3dy8So9wPWTYJSsrFvHDMg"
  

  if (req.query.page && !isNaN(req.query.page)) {
      
      const page=parseInt(req.query.page);
      const pageSize= req.query.pagesize && !isNaN(req.query.pagesize)? parseInt(req.query.pagesize):10;
      const stringLimit="LIMIT "+(page - 1) * pageSize + "," + pageSize;

      //WHERE Division = '${league}'
      //ORDER BY HomeTeam, AwayTeam ${stringLimit}
      connection.query(
        `WITH ONE AS (
          SELECT DISTINCT RP.user_id, user.name, 1 AS N
          FROM review_Portland RP
                   JOIN user ON RP.user_id = user.user_id
          WHERE RP.stars = 5
            AND RP.business_id = '${ID}'
      ),
              TWO_B AS(
          SELECT DISTINCT review_Portland.business_id
          FROM ONE LEFT JOIN review_Portland ON review_Portland.user_id=ONE.user_id
          WHERE review_Portland.stars=5
      
              ),
          TWO AS (
          SELECT DISTINCT review_Portland.user_id, user.name, 2 AS N
          FROM review_Portland JOIN TWO_B ON review_Portland.business_id=TWO_B.business_id
          JOIN user ON review_Portland.user_id= user.user_id
          WHERE review_Portland.stars=5
          ),
         TOT AS(
         SELECT * FROM ONE
         UNION ALL
         SELECT * FROM TWO
          )
      SELECT user_id, name, MIN(N) AS N FROM TOT
      GROUP BY user_id
      ORDER BY N ${stringLimit}`,
          
          function (error, results, fields) {
            if (error) {
              console.log(error);
              res.json({ error: error });
            } else if (results) {
              res.json({ results: results });
            } else {
              res.json({ results: [] });
            }
          }
        );

  } else {
      // we have implemented this for you to see how to return results by querying the database
      connection.query(`WITH ONE AS (
        SELECT DISTINCT RP.user_id, user.name, 1 AS N
        FROM review_Portland RP
                 JOIN user ON RP.user_id = user.user_id
        WHERE RP.stars = 5
          AND RP.business_id = '${ID}'
    ),
            TWO_B AS(
        SELECT DISTINCT review_Portland.business_id
        FROM ONE LEFT JOIN review_Portland ON review_Portland.user_id=ONE.user_id
        WHERE review_Portland.stars=5
    
            ),
        TWO AS (
        SELECT DISTINCT review_Portland.user_id, user.name, 2 AS N
        FROM review_Portland JOIN TWO_B ON review_Portland.business_id=TWO_B.business_id
        JOIN user ON review_Portland.user_id= user.user_id
        WHERE review_Portland.stars=5
        ),
       TOT AS(
       SELECT * FROM ONE
       UNION ALL
       SELECT * FROM TWO
        )
    SELECT user_id, name, MIN(N) AS N FROM TOT
    GROUP BY user_id
    ORDER BY N `, function (error, results, fields) {

          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }else {
              res.json({ results: [] });
            }
      });
  }
}



module.exports = {
    friend_business,
    friend_connection,
}