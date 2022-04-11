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

// 1.1 A search businesses that meet given criteria
//http://localhost:8080/search/businesses/?City=Portland&State=OR
async function search_businesses(req, res) {
  // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
  // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
  const name = req.query.Name ? req.query.Name : ''
  const state = req.query.State ? req.query.State : ''
  const city = req.query.City ? req.query.City : ''
  const zip = req.query.Zip ? req.query.Zip : ''
  const category = req.query.Category ? req.query.Category : ''
  const rlow = req.query.RatingLow ? req.query.RatingLow : 0
  const rhigh = req.query.RatingHigh ? req.query.RatingHigh : 5
  const price = req.query.Price ? `AND RestaurantsPriceRange2 = ${req.query.Price}` : ''

  if (req.query.page && !isNaN(req.query.page)) {
      // This is the case where page is defined.
      const pagesize = req.query.pagesize ? req.query.pagesize : 10
      const page = req.query.page
      connection.query(`SELECT business_id, name, address, city, state, postal_code,
      stars, review_count, categories,
      RestaurantsPriceRange2 as price_range
      FROM Business
      WHERE Name like '%${name}%' AND state like '%${state}%' AND city like '%${city}%' AND postal_code like '%${zip}%'
          AND categories like '%${category}%'
          AND stars>= ${rlow} AND stars<=${rhigh} ${price}
      ORDER BY stars DESC, review_count DESC 
      LIMIT ${pagesize} 
      OFFSET ${((page-1)*pagesize)}`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });

  } else {     
      connection.query(`SELECT business_id, name, address, city, state, postal_code,
      stars, review_count, categories,
      RestaurantsPriceRange2 as price_range
      FROM Business
      WHERE Name like '%${name}%' AND state like '%${state}%' AND city like '%${city}%' AND postal_code like '%${zip}%'
          AND categories like '%${category}%'
          AND stars>= ${rlow} AND stars<=${rhigh} ${price}
      ORDER BY stars DESC, review_count DESC`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });
  }
}

// 1.1B & 1.2B select a business and query detailed info about this business
//http://localhost:8080/business/?id=_--ScmaNumIoT2gQanACvg
async function business(req, res) {
  // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
  if ( req.query.id !== undefined ) {
      const id = req.query.id

      connection.query(`WITH num_photos (business_id, num_photo) AS
      (SELECT business_id, count(*) as num_photo from photo
      WHERE business_id = '${id}')
      SELECT B.business_id, name, categories,
          RestaurantsPriceRange2 as price_range, stars, review_count, is_open,
          Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,
          address, city, state, postal_code,
          RestaurantsTakeOut,
          garage, lot, street, valet, validated,
          photo_id, caption, label, num_photo
      FROM Business B left join photo P on B.business_id = P.business_id
      left join num_photos N on P.business_id = N.business_id
      WHERE B.business_id = '${id}'`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });
  } 
}


// 1.2 A recommend businesses based on features of the top-rated businesses in user history
//http://localhost:8080/recommend/businesses/?UserId=zzYDSfrxsYaydnr8TngD4A&UserName=Nick&State=OR&City=Portland
async function recommend_businesses(req, res) {
  // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
  // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
  const userid = req.query.UserId ? req.query.UserId : ''
  const username = req.query.UserName ? req.query.UserName : ''
  const state = req.query.State ? req.query.State : ''
  const city = req.query.City ? req.query.City : ''
  const zip = req.query.Zip ? req.query.Zip : ''

  if (req.query.page && !isNaN(req.query.page)) {
      // This is the case where page is defined.
      const pagesize = req.query.pagesize ? req.query.pagesize : 10
      const page = req.query.page
      connection.query(`WITH K (uid, name, business_id, stars, price_range, keyword) AS (
      SELECT U.user_id, U.name, R.business_id, R.stars, B.RestaurantsPriceRange2,
              substring_index(B.categories, ',', 1) keyword
      FROM user U join review R on U.user_id=R.user_id
      join Business B on R.business_id = B.business_id
      WHERE U.user_id like '%${userid}%' and U.name like '%${username}%' and U.review_count>0
      ORDER BY stars DESC
      LIMIT 5)
      SELECT B.business_id, B.name, B.address, B.city, B.state, B.postal_code,
              B.stars, B.review_count, B.categories, B.RestaurantsPriceRange2 as price_range
      FROM Business B join K
          on B.RestaurantsPriceRange2 = K.price_range 
          AND B.stars>=4 AND FIND_IN_SET(K.keyword, categories)
      WHERE city like '%${city}%' and state like '%${state}%' AND postal_code like '%${zip}%'
      ORDER BY B.stars DESC, B.review_count DESC                  
      LIMIT ${pagesize} 
      OFFSET ${((page-1)*pagesize)}`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });

  } else {     
      connection.query(`WITH K (uid, name, business_id, stars, price_range, keyword) AS (
          SELECT U.user_id, U.name, R.business_id, R.stars, B.RestaurantsPriceRange2,
                  substring_index(B.categories, ',', 1) keyword
          FROM user U join review R on U.user_id=R.user_id
          join Business B on R.business_id = B.business_id
          WHERE U.user_id like '%${userid}%' and U.name like '%${username}%' and U.review_count>0
          ORDER BY stars DESC
          LIMIT 5)
          SELECT B.business_id, B.name, B.address, B.city, B.state, B.postal_code,
                  B.stars, B.review_count, B.categories, B.RestaurantsPriceRange2 as price_range
          FROM Business B join K
              on B.RestaurantsPriceRange2 = K.price_range 
              AND B.stars>=4 AND FIND_IN_SET(K.keyword, categories)
          WHERE city like '%${city}%' and state like '%${state}%' AND postal_code like '%${zip}%'
          ORDER BY B.stars DESC, B.review_count DESC`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });
  }
}

// page 2.1 login function
//http://localhost:8080/login?name=Don&uid=0ZxoUw ->correct format
//http://localhost:8080/login/?name=Don&uid=0ZxoUw

//http://localhost:8080/login/?name=Sparkely&uid=sL-tHA

//reference:
//id: __-xRn3SOmAoLA80MEsAvA        name: Derek
//id: __0cgHc1KI1O7WhflPTZFA        name: jon

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
//__dUOXQ2Pa149eLgsL-tHA
//http://localhost:8080/friends/friend_business/Pf7FI0OukC_CEcCz0ZxoUw/?page=2&pagesize=5
//http://localhost:8080/friends/friend_business/__dUOXQ2Pa149eLgsL-tHA
async function friend_business(req, res) {

  const userid = req.params.userid ? req.params.userid : "Pf7FI0OukC_CEcCz0ZxoUw"


  if (req.query.page && !isNaN(req.query.page)) {

    const page = parseInt(req.query.page);
    const pageSize = req.query.pagesize && !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : 10;
    const stringLimit = "LIMIT " + (page - 1) * pageSize + "," + pageSize;

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
      } else {
        res.json({ results: [] });
      }
    });
  }
}




// Route 2.3 (handler)
//changed for project to get the user favorite business(>=4) and return as result
//extra business:aS3Fhk3YHgLvyqM98augMA
//http://localhost:8080/friends/friend_connection/3dy8So9wPWTYJSsrFvHDMg/?userID=Pf7FI0OukC_CEcCz0ZxoUw&page=2&pagesize=5
//http://localhost:8080/friends/friend_connection/j-mkLrxKtOzGAh4ymO9bJg/?userID=__dUOXQ2Pa149eLgsL-tHA

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
          LIMIT 1000
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
        LIMIT 1000
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
//http://localhost:8080/star_sci/state/?name=OR&page=2&pagesize=5
//http://localhost:8080/star_sci/city/?name=Boston
//http://localhost:8080/star_sci/zip/?name=02215
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
    } else if (req.params.choice === 'zip') {
      const name = req.query.name ? req.query.name : "02143";
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
    } else if (req.params.choice === 'zip') {
      const name = req.query.name ? req.query.name : "02143";
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
//http://localhost:8080/price_sci/state/?name=OR&page=2&pagesize=5
//http://localhost:8080/price_sci/city/?name=Portland
//http://localhost:8080/price_sci/zip/?name=97217
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
    } else if (req.params.choice === 'zip') {
      const name = req.query.name ? req.query.name : "02143";
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
    } else if (req.params.choice === 'zip') {
      const name = req.query.name ? req.query.name : "02143";
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
//http://localhost:8080/avg_sci/state?page=2&pagesize=5
//http://localhost:8080/avg_sci/city
//http://localhost:8080/avg_sci/postal_code
async function avg_sci(req, res) {
  const choice = req.params.choice;

  if (req.query.page && !isNaN(req.query.page)) {

    const page = parseInt(req.query.page);
    const pageSize = req.query.pagesize && !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : 10;
    const stringLimit = "LIMIT " + (page - 1) * pageSize + "," + pageSize;
    connection.query(
      `SELECT ${choice}, COUNT(stars) AS num,AVG(RestaurantsPriceRange2) AS avg_price, AVG(stars) AS avg_review
        FROM BusinessFull
        GROUP BY ${choice}
        HAVING COUNT(stars)>10
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
      HAVING COUNT(stars)>10
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
//http://localhost:8080/cat_map/state?name=MA
//http://localhost:8080/cat_map/city?name=Boston
//http://localhost:8080/cat_map/postal_code?name=97217
async function cat_map(req, res) {
  const choice = req.params.choice;
  const name = req.query.name;
  connection.query(
    `SELECT new_categories,COUNT(*) AS count,COUNT(*)/SUM(COUNT(*)) OVER () AS percent
      FROM BusinessFull
      WHERE ${choice}='${name}'
      GROUP BY new_categories
      HAVING COUNT(*)>10
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

// 3.5 County Health Rankings and price/star frequency distributions
//http://localhost:8080/health_ranking_businesses_stats/?State=OR
async function county_health_businesses(req, res) {

  const state = req.query.State ? req.query.State : ''
 
  if (req.query.page && !isNaN(req.query.page)) {
      // This is the case where page is defined.
      const pagesize = req.query.pagesize ? req.query.pagesize : 10
      const page = req.query.page

      connection.query(`WITH H (business_id, price_range, stars,
          zip, city, state, fips, county, num_ranked_counties,
          health_factors_rank) AS
          (SELECT B.business_id, RestaurantsPriceRange2, stars,
          B.postal_code, B.city, B.state, R.fips, R.county, R.number_of_ranked_counties,
          R.health_factors_rank
      FROM BusinessFull B join Zip_county_crosswalk Z
          on B.postal_code = Z.zip AND B.city = Z.city AND B.state = Z.state
          join County_health_ranking R on Z.fips = R.fips
          WHERE B.state like '%${state}%')
      SELECT H.state, H.num_ranked_counties, H.fips, H.county, H.health_factors_rank,
            SUM(IF(H.price_range = 1, 1, 0)) as price1_count,
            SUM(IF(H.price_range = 2, 1, 0)) as price2_count,
            SUM(IF(H.price_range = 3, 1, 0)) as price3_count,
            SUM(IF(H.price_range = 4, 1, 0)) as price4_count,
            SUM(IF(H.price_range >0, 1, 0)) as price_count,
            SUM(IF(H.price_range = 1, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price1_pct,
            SUM(IF(H.price_range = 2, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price2_pct,
            SUM(IF(H.price_range = 3, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price3_pct,
            SUM(IF(H.price_range = 4, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price4_pct,
            SUM(IF(H.stars <= 1, 1, 0)) as star0_1_count,
            SUM(IF(H.stars>1 AND stars<=2, 1, 0)) as star1_2_count,
            SUM(IF(H.stars>2 AND stars<=3, 1, 0)) as star2_3_count,
            SUM(IF(H.stars>3 AND stars<=4, 1, 0)) as star3_4_count,
            SUM(IF(H.stars>4 AND stars<=5, 1, 0)) as star4_5_count,
            SUM(IF(H.stars >0, 1, 0)) as star_count,
            SUM(IF(H.stars <= 1, 1, 0))/SUM(IF(H.stars >0, 1, 0)) as star0_1_pct,
            SUM(IF(H.stars>1 AND stars<=2, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star1_2_pct,
            SUM(IF(H.stars>2 AND stars<=3, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star2_3_pct,
            SUM(IF(H.stars>3 AND stars<=4, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star3_4_pct,
            SUM(IF(H.stars>4 AND stars<=5, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star4_5_pct
      FROM H
      GROUP BY H.state, H.fips, H.county, H.health_factors_rank
      having count(H.business_id)>=10
      ORDER BY H.state, H.health_factors_rank
      LIMIT ${pagesize} 
      OFFSET ${((page-1)*pagesize)}`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });

  } else {     
      connection.query(`WITH H (business_id, price_range, stars,
        zip, city, state, fips, county, num_ranked_counties,
        health_factors_rank) AS
        (SELECT B.business_id, RestaurantsPriceRange2, stars,
        B.postal_code, B.city, B.state, R.fips, R.county, R.number_of_ranked_counties,
        R.health_factors_rank
    FROM BusinessFull B join Zip_county_crosswalk Z
        on B.postal_code = Z.zip AND B.city = Z.city AND B.state = Z.state
        join County_health_ranking R on Z.fips = R.fips
        WHERE B.state like '%${state}%')
    SELECT H.state, H.num_ranked_counties, H.fips, H.county, H.health_factors_rank,
           SUM(IF(H.price_range = 1, 1, 0)) as price1_count,
           SUM(IF(H.price_range = 2, 1, 0)) as price2_count,
           SUM(IF(H.price_range = 3, 1, 0)) as price3_count,
           SUM(IF(H.price_range = 4, 1, 0)) as price4_count,
           SUM(IF(H.price_range >0, 1, 0)) as price_count,
           SUM(IF(H.price_range = 1, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price1_pct,
           SUM(IF(H.price_range = 2, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price2_pct,
           SUM(IF(H.price_range = 3, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price3_pct,
           SUM(IF(H.price_range = 4, 1, 0))/SUM(IF(H.price_range >0, 1, 0)) as price4_pct,
           SUM(IF(H.stars <= 1, 1, 0)) as star0_1_count,
           SUM(IF(H.stars>1 AND stars<=2, 1, 0)) as star1_2_count,
           SUM(IF(H.stars>2 AND stars<=3, 1, 0)) as star2_3_count,
           SUM(IF(H.stars>3 AND stars<=4, 1, 0)) as star3_4_count,
           SUM(IF(H.stars>4 AND stars<=5, 1, 0)) as star4_5_count,
           SUM(IF(H.stars >0, 1, 0)) as star_count,
           SUM(IF(H.stars <= 1, 1, 0))/SUM(IF(H.stars >0, 1, 0)) as star0_1_pct,
           SUM(IF(H.stars>1 AND stars<=2, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star1_2_pct,
           SUM(IF(H.stars>2 AND stars<=3, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star2_3_pct,
           SUM(IF(H.stars>3 AND stars<=4, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star3_4_pct,
           SUM(IF(H.stars>4 AND stars<=5, 1, 0))/SUM(IF(H.stars >0, 1, 0))  as star4_5_pct
    FROM H
    GROUP BY H.state, H.fips, H.county, H.health_factors_rank
    having count(H.business_id)>=10
    ORDER BY H.state, H.health_factors_rank`, 
      function (error, results, fields) {
          if (error) {
              console.log(error)
              res.json({ error: error })
          } else if (results) {
              res.json({ results: results })
          }
      });
  }
}




module.exports = {
  search_businesses,
  business,
  recommend_businesses,
  login,
  friend_business,
  friend_connection,
  star_sci,
  price_sci,
  avg_sci,
  cat_map,
  county_health_businesses
}