import db from "../config/dbConnection.js";

export default function queryAsync(query, params = []) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}
