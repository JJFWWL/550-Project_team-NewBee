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
// page 2.1 login function
//http://localhost:8080/login/?name=Don&uid=0ZxoUw
async function login(req, res) {
  if (req.query.name !== undefined && req.query.uid != undefined) {
    const name = req.query.name;
    const uid = "%" + req.query.uid;
    connection.query(
      `SELECT user_id
        FROM user
        WHERE name='${name}' AND user_id LIKE '${uid}'`,
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
    res.json({ message: `Hello, user information invalid, please re-enter` });

  }
}

// page 2.2
//changed for project to get the user favorite business(=5) and return as result
//http://localhost:8080/friends/friend_business/userid/?page=2&pagesize=5
async function friend_business(req, res) {

    const userid = req.params.userid ? req.params.userid : "Pf7FI0OukC_CEcCz0ZxoUw"
    

    if (req.query.page && !isNaN(req.query.page)) {
        
        const page=parseInt(req.query.page);
        const pageSize= req.query.pagesize && !isNaN(req.query.pagesize)? parseInt(req.query.pagesize):10;
        const stringLimit="LIMIT "+(page - 1) * pageSize + "," + pageSize;

        //WHERE Division = '${league}'
        //ORDER BY HomeTeam, AwayTeam ${stringLimit}
        connection.query(
          `SELECT DISTINCT RP.business_id,Business.name,Business.address,Business.city,Business.State, Business.new_categories
          FROM review RP JOIN Business ON RP.business_id=Business.business_id
          WHERE RP.user_id='${userid}' AND RP.stars=5 ${stringLimit}`,
          
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
        connection.query(`SELECT DISTINCT RP.business_id,Business.name,Business.address,Business.city,Business.State, Business.new_categories
        FROM review RP JOIN Business ON RP.business_id=Business.business_id
        WHERE RP.user_id='${userid}' AND RP.stars=5`, function (error, results, fields) {

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



// Route 2.3 (handler)
//changed for project to get the user favorite business(>=4) and return as result
//http://localhost:8080/friends/friend_connection/businessID/?userID=Pf7FI0OukC_CEcCz0ZxoUw&page=2&pagesize=5

async function friend_connection(req, res) {
    

  const ID = req.params.id ? req.params.id : "3dy8So9wPWTYJSsrFvHDMg"
  const userID = req.query.userID ? req.query.userID : "Pf7FI0OukC_CEcCz0ZxoUw";

  if (req.query.page && !isNaN(req.query.page)) {

    const page = parseInt(req.query.page);
    const pageSize = req.query.pagesize && !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : 10;
    const stringLimit = "LIMIT " + (page - 1) * pageSize + "," + pageSize;

 
    connection.query(
      `SELECT DISTINCT RP.business_id,Business.name,Business.address,Business.city,Business.State, Business.new_categories
          FROM review_Portland RP JOIN Business ON RP.business_id=Business.business_id
          WHERE RP.user_id='${userid}' AND RP.stars=5 ${stringLimit}`,

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
    connection.query(`SELECT DISTINCT RP.business_id,Business.name,Business.address,Business.city,Business.State, Business.new_categories
        FROM review_Portland RP JOIN Business ON RP.business_id=Business.business_id
        WHERE RP.user_id='${userid}' AND RP.stars=5`, function (error, results, fields) {

      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      } else {
        res.json({ results: [] });
      }
    });
  }
}



// Route 2.3 (handler)
//changed for project to get the user favorite business(>=4) and return as result
//http://localhost:8080/friends/friend_connection/businessID/?userID=Pf7FI0OukC_CEcCz0ZxoUw&page=2&pagesize=5


async function friend_connection(req, res) {


  const ID = req.params.id ? req.params.id : "3dy8So9wPWTYJSsrFvHDMg"

  const userID = req.query.userID ? req.query.userID : "Pf7FI0OukC_CEcCz0ZxoUw";

  if (req.query.page && !isNaN(req.query.page)) {
      


    const page = parseInt(req.query.page);
    const pageSize = req.query.pagesize && !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : 10;
    const stringLimit = "LIMIT " + (page - 1) * pageSize + "," + pageSize;

    //WHERE Division = '${league}'
    //ORDER BY HomeTeam, AwayTeam ${stringLimit}
    connection.query(

      `WITH ZERO_B AS(
        SELECT RestaurantsPriceRange2, stars, new_categories
        FROM Business
        WHERE business_id='${ID}'
    ),
      ONE AS (

          SELECT DISTINCT RP.user_id, user.name, 1 AS N
          FROM review RP
                   JOIN user ON RP.user_id = user.user_id
          WHERE RP.stars = 5
            AND RP.business_id = '${ID}' AND RP.user_id!='${userID}'
      ),
              TWO_B AS(
          SELECT DISTINCT review.business_id
          FROM ONE LEFT JOIN review ON review.user_id=ONE.user_id
          JOIN Business ON review.business_id=Business.business_id
          JOIN ZERO_B ON Business.new_categories=ZERO_B.new_categories
          WHERE review.stars=5
      
              ),
          TWO AS (
          SELECT DISTINCT review.user_id, user.name, 2 AS N
          FROM review JOIN TWO_B ON review.business_id=TWO_B.business_id
          JOIN user ON review.user_id= user.user_id
          WHERE review.stars=5  AND review.user_id!='${userID}'
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

    connection.query(`WITH ZERO_B AS(
      SELECT RestaurantsPriceRange2, stars, new_categories
      FROM Business
      WHERE business_id='${ID}'
  ),
    ONE AS (

        SELECT DISTINCT RP.user_id, user.name, 1 AS N
        FROM review RP
                 JOIN user ON RP.user_id = user.user_id
        WHERE RP.stars = 5
          AND RP.business_id = '${ID}'  AND RP.user_id!='${userID}'
    ),
            TWO_B AS(
        SELECT DISTINCT review.business_id
        FROM ONE LEFT JOIN review ON review.user_id=ONE.user_id
        JOIN Business ON review.business_id=Business.business_id
        JOIN ZERO_B ON Business.new_categories=ZERO_B.new_categories
        WHERE review.stars=5
    
            ),
        TWO AS (
        SELECT DISTINCT review.user_id, user.name, 2 AS N
        FROM review JOIN TWO_B ON review.business_id=TWO_B.business_id
        JOIN user ON review.user_id= user.user_id
        WHERE review.stars=5  AND review.user_id!='${userID}'
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
      } else {
        res.json({ results: [] });
      }
    });
  }
}

//page 3.1 star distribution_state level(input state name)
//http://localhost:8080/star_sci/choice/?name=OR&page=2&pagesize=5

async function star_sci(req, res) {


  if (req.query.page && !isNaN(req.query.page)) {

    const page = parseInt(req.query.page);
    const pageSize = req.query.pagesize && !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : 10;
    const stringLimit = "LIMIT " + (page - 1) * pageSize + "," + pageSize;
    if (req.params.choice === 'state') {
      const name = req.query.name ? req.query.name : "MA";
      connection.query(
        `SELECT city, SUM(IF(stars<2,1,0)) AS 1star_count,SUM(IF(stars<3 AND stars>=2,1,0)) AS 2star_count,SUM(IF(stars<4 AND stars>=3,1,0)) AS 3star_count,
            SUM(IF(stars<5 AND stars>=4,1,0)) AS 4star_count,SUM(IF(stars=5,1,0)) AS 5star_count,SUM(IF(stars<2,1,0))/SUM(IF(stars>0,1,0)) AS 1star_percent, SUM(IF(stars<3 AND stars>=2,1,0))/SUM(IF(stars>0,1,0)) AS 2star_percent,
            SUM(IF(stars<4 AND stars>=3,1,0))/SUM(IF(stars>0,1,0)) AS 3star_percent,SUM(IF(stars<5 AND stars>=4,1,0))/SUM(IF(stars>0,1,0)) AS 4star_percent, SUM(IF(stars=5,1,0))/SUM(IF(stars>0,1,0)) AS 5star_percent
            FROM BusinessFull
            WHERE state='${name}' 
            GROUP BY city ${stringLimit}`,

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
    } else if (req.params.choice === 'city') {
      const name = req.query.name ? req.query.name : "Portland";
      connection.query(
        `SELECT postal_code, SUM(IF(stars<2,1,0)) AS 1star_count,SUM(IF(stars<3 AND stars>=2,1,0)) AS 2star_count,SUM(IF(stars<4 AND stars>=3,1,0)) AS 3star_count,
          SUM(IF(stars<5 AND stars>=4,1,0)) AS 4star_count,SUM(IF(stars=5,1,0)) AS 5star_count,SUM(IF(stars<2,1,0))/SUM(IF(stars>0,1,0)) AS 1star_percent, SUM(IF(stars<3 AND stars>=2,1,0))/SUM(IF(stars>0,1,0)) AS 2star_percent,
          SUM(IF(stars<4 AND stars>=3,1,0))/SUM(IF(stars>0,1,0)) AS 3star_percent,SUM(IF(stars<5 AND stars>=4,1,0))/SUM(IF(stars>0,1,0)) AS 4star_percent, SUM(IF(stars=5,1,0))/SUM(IF(stars>0,1,0)) AS 5star_percent
          FROM BusinessFull
          WHERE city='${name}' 
          GROUP BY postal_code ${stringLimit}`,
          
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
      }else if(req.params.choice==='zip'){
        const name=req.query.name? req.query.name: "02143";
        connection.query(
          `SELECT stars,COUNT(*) AS count,COUNT(*)/SUM(COUNT(*)) OVER () AS percent
          FROM BusinessFull
          WHERE postal_code='${name}' 
          GROUP BY stars
          ORDER BY stars ${stringLimit}`,

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
      res.json({ message: `error` });
    }


  } else {
    if (req.params.choice === 'state') {
      const name = req.query.name ? req.query.name : "MA";
      connection.query(
        `SELECT city, SUM(IF(stars<2,1,0)) AS 1star_count,SUM(IF(stars<3 AND stars>=2,1,0)) AS 2star_count,SUM(IF(stars<4 AND stars>=3,1,0)) AS 3star_count,
        SUM(IF(stars<5 AND stars>=4,1,0)) AS 4star_count,SUM(IF(stars=5,1,0)) AS 5star_count,SUM(IF(stars<2,1,0))/SUM(IF(stars>0,1,0)) AS 1star_percent, SUM(IF(stars<3 AND stars>=2,1,0))/SUM(IF(stars>0,1,0)) AS 2star_percent,
        SUM(IF(stars<4 AND stars>=3,1,0))/SUM(IF(stars>0,1,0)) AS 3star_percent,SUM(IF(stars<5 AND stars>=4,1,0))/SUM(IF(stars>0,1,0)) AS 4star_percent, SUM(IF(stars=5,1,0))/SUM(IF(stars>0,1,0)) AS 5star_percent
        FROM BusinessFull
        WHERE state='${name}'
        GROUP BY city`,

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
    } else if (req.params.choice === 'city') {
      const name = req.query.name ? req.query.name : "Portland";
      connection.query(
        `SELECT postal_code, SUM(IF(stars<2,1,0)) AS 1star_count,SUM(IF(stars<3 AND stars>=2,1,0)) AS 2star_count,SUM(IF(stars<4 AND stars>=3,1,0)) AS 3star_count,
      SUM(IF(stars<5 AND stars>=4,1,0)) AS 4star_count,SUM(IF(stars=5,1,0)) AS 5star_count,SUM(IF(stars<2,1,0))/SUM(IF(stars>0,1,0)) AS 1star_percent, SUM(IF(stars<3 AND stars>=2,1,0))/SUM(IF(stars>0,1,0)) AS 2star_percent,
      SUM(IF(stars<4 AND stars>=3,1,0))/SUM(IF(stars>0,1,0)) AS 3star_percent,SUM(IF(stars<5 AND stars>=4,1,0))/SUM(IF(stars>0,1,0)) AS 4star_percent, SUM(IF(stars=5,1,0))/SUM(IF(stars>0,1,0)) AS 5star_percent
      FROM BusinessFull
      WHERE city='${name}' 
      GROUP BY postal_code`,

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
  }else if(req.params.choice==='zip'){
    const name=req.query.name? req.query.name: "02143";
    connection.query(
      `SELECT stars,COUNT(*) AS count,COUNT(*)/SUM(COUNT(*)) OVER () AS percent
      FROM BusinessFull
      WHERE postal_code='${name}'
      GROUP BY stars
      ORDER BY stars;`,

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
      res.json({ message: `error` });
    }
  }
}

//page 3.2 price distribution_state level(input state name)
//http://localhost:8080/price_sci/choice/?name=OR&page=2&pagesize=5

async function price_sci(req, res) {


  if (req.query.page && !isNaN(req.query.page)) {

    const page = parseInt(req.query.page);
    const pageSize = req.query.pagesize && !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : 10;
    const stringLimit = "LIMIT " + (page - 1) * pageSize + "," + pageSize;
    if (req.params.choice === 'state') {
      const name = req.query.name ? req.query.name : "MA";
      connection.query(
        `SELECT city, SUM(IF(RestaurantsPriceRange2=1,1,0)) AS 1price_count,SUM(IF(RestaurantsPriceRange2=2,1,0)) AS 2price_count,SUM(IF(RestaurantsPriceRange2=3,1,0)) AS 3price_count,
            SUM(IF(RestaurantsPriceRange2=4,1,0)) AS 4price_count,SUM(IF(RestaurantsPriceRange2=1,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 1price_percent, SUM(IF(RestaurantsPriceRange2=2,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 2price_percent,
            SUM(IF(RestaurantsPriceRange2=3,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 3price_percent,SUM(IF(RestaurantsPriceRange2=4,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 4price_percent
            FROM BusinessFull
            WHERE State='${name}'
            GROUP BY city
            HAVING SUM(IF(RestaurantsPriceRange2>0,1,0))>0 ${stringLimit}`,

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
    } else if (req.params.choice === 'city') {
      const name = req.query.name ? req.query.name : "Portland";
      connection.query(
        `SELECT postal_code, SUM(IF(RestaurantsPriceRange2=1,1,0)) AS 1price_count,SUM(IF(RestaurantsPriceRange2=2,1,0)) AS 2price_count,SUM(IF(RestaurantsPriceRange2=3,1,0)) AS 3price_count,
          SUM(IF(RestaurantsPriceRange2=4,1,0)) AS 4price_count,SUM(IF(RestaurantsPriceRange2=1,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 1price_percent, SUM(IF(RestaurantsPriceRange2=2,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 2price_percent,
          SUM(IF(RestaurantsPriceRange2=3,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 3price_percent,SUM(IF(RestaurantsPriceRange2=4,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 4price_percent
          FROM BusinessFull
          WHERE city='${name}'
          GROUP BY postal_code
          HAVING SUM(IF(RestaurantsPriceRange2>0,1,0))>0 ${stringLimit}`,
          
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
      }else if(req.params.choice==='zip'){
        const name=req.query.name? req.query.name: "02143";
        connection.query(
          `SELECT RestaurantsPriceRange2, COUNT(RestaurantsPriceRange2)/SUM(COUNT(RestaurantsPriceRange2)) OVER () AS percent
          FROM BusinessFull
          WHERE postal_code='${name}' AND RestaurantsPriceRange2 IS NOT NULL
          GROUP BY RestaurantsPriceRange2
          ORDER BY RestaurantsPriceRange2 ${stringLimit}`,

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
      res.json({ message: `error` });
    }


  } else {
    if (req.params.choice === 'state') {
      const name = req.query.name ? req.query.name : "MA";
      connection.query(
        `SELECT city, SUM(IF(RestaurantsPriceRange2=1,1,0)) AS 1price_count,SUM(IF(RestaurantsPriceRange2=2,1,0)) AS 2price_count,SUM(IF(RestaurantsPriceRange2=3,1,0)) AS 3price_count,
        SUM(IF(RestaurantsPriceRange2=4,1,0)) AS 4price_count,SUM(IF(RestaurantsPriceRange2=1,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 1price_percent, SUM(IF(RestaurantsPriceRange2=2,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 2price_percent,
        SUM(IF(RestaurantsPriceRange2=3,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 3price_percent,SUM(IF(RestaurantsPriceRange2=4,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 4price_percent
        FROM BusinessFull
        WHERE State='${name}'
        GROUP BY city
        HAVING SUM(IF(RestaurantsPriceRange2>0,1,0))>0`,

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
    } else if (req.params.choice === 'city') {
      const name = req.query.name ? req.query.name : "Portland";
      connection.query(
        `SELECT postal_code, SUM(IF(RestaurantsPriceRange2=1,1,0)) AS 1price_count,SUM(IF(RestaurantsPriceRange2=2,1,0)) AS 2price_count,SUM(IF(RestaurantsPriceRange2=3,1,0)) AS 3price_count,
      SUM(IF(RestaurantsPriceRange2=4,1,0)) AS 4price_count,SUM(IF(RestaurantsPriceRange2=1,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 1price_percent, SUM(IF(RestaurantsPriceRange2=2,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 2price_percent,
      SUM(IF(RestaurantsPriceRange2=3,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 3price_percent,SUM(IF(RestaurantsPriceRange2=4,1,0))/SUM(IF(RestaurantsPriceRange2>0,1,0)) AS 4price_percent
      FROM BusinessFull
      WHERE city='${name}'
      GROUP BY postal_code
      HAVING SUM(IF(RestaurantsPriceRange2>0,1,0))>0`,

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
  }else if(req.params.choice==='zip'){
    const name=req.query.name? req.query.name: "02143";
    connection.query(
      `SELECT RestaurantsPriceRange2, COUNT(RestaurantsPriceRange2)/SUM(COUNT(RestaurantsPriceRange2)) OVER () AS percent
      FROM BusinessFull
      WHERE postal_code='${name}' AND RestaurantsPriceRange2 IS NOT NULL
      GROUP BY RestaurantsPriceRange2
      ORDER BY RestaurantsPriceRange2`,

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
      res.json({ message: `error` });
    }
  }
}
//3.3 location average price/star
//http://localhost:8080/avg_sci/choice?page=2&pagesize=5 , input choice: state, city, postal_code
async function avg_sci(req, res) {
  const choice = req.params.choice;

  if (req.query.page && !isNaN(req.query.page)) {
      
    const page=parseInt(req.query.page);
    const pageSize= req.query.pagesize && !isNaN(req.query.pagesize)? parseInt(req.query.pagesize):10;
    const stringLimit="LIMIT "+(page - 1) * pageSize + "," + pageSize;
      connection.query(
        `SELECT ${choice}, COUNT(stars) AS num,AVG(RestaurantsPriceRange2) AS avg_price, AVG(stars) AS avg_review
        FROM BusinessFull
        GROUP BY ${choice}
        ORDER BY num DESC ${stringLimit}`,

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
    connection.query(
      `SELECT ${choice}, COUNT(stars) AS num,AVG(RestaurantsPriceRange2) AS avg_price, AVG(stars) AS avg_review
      FROM BusinessFull
      GROUP BY ${choice}
      ORDER BY num DESC`,

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
  }
}

//3.4 categories_map
//http://localhost:8080/cat_map/choice?name=Portland , input choice: state, city, postal_code, name is related name
async function cat_map(req,res){
    const choice=req.params.choice;
    const name=req.query.name;
    connection.query(
      `SELECT new_categories,COUNT(*) AS count,COUNT(*)/SUM(COUNT(*)) OVER () AS percent
      FROM BusinessFull
      WHERE ${choice}='${name}'
      GROUP BY new_categories
      ORDER BY count DESC`,

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

}
module.exports = {
  login,
  friend_business,
  friend_connection,
  star_sci,
  price_sci,
  avg_sci,
  cat_map,
}