const { response } = require('express');
const { dbConnection } = require('../database/mysqlConfig');

const getTablesNames = async () => {
  try {
    const [results] = await dbConnection.query('SHOW TABLES');
    
    const filteredResults = results
      .filter(result => !["contacto", "info", "trabajos"
        //  , "lab_g1", "lab_g2", "lab_g3"
      ].includes(result[`Tables_in_${process.env.DATABASE}`]))
      .map(obj => Object.values(obj)[0]);

    return filteredResults;
  } catch (error) {
    throw error;
  }
};

const getProjects = async (req, res = response) => {
  try {
    const tablesNames = await getTablesNames();
    console.log(tablesNames);
    const projects = [];

    for (const tableName of tablesNames) {
      const dataQuery = `SELECT * FROM ${tableName}`;
      const infoQuery = `SELECT * FROM trabajos WHERE table_name='${tableName}'`;
      const [info] = await executeQuery(infoQuery);
      const [data] = await executeQuery(dataQuery);
      console.log(info?.img);

      projects.push({ img: info?.img, name: info?.title, table_name: tableName, category: info?.category, data: data });
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

const getOneProject = async (req, res = response) => {
  try {
    const tableName = req.params.tableName;
    console.log(tableName);
    const project = [];

    const dataQuery = `SELECT * FROM ${tableName}`;
    const infoQuery = `SELECT * FROM trabajos WHERE table_name='${tableName}'`;
    const [info] = await executeQuery(infoQuery);
    const [data] = await executeQuery(dataQuery);
    console.log(info?.img);

    project.push({ img: info?.img, name: info?.title, table_name: tableName, category: info?.category, data: data });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

const getProjectsDataless = async (req, res = response) => {
  try {
    const tablesNames = await getTablesNames();
    console.log(tablesNames);
    const projects = [];

    for (const tableName of tablesNames) {
      const infoQuery = `SELECT * FROM trabajos WHERE table_name='${tableName}'`;
      const [info] = await executeQuery(infoQuery);

      projects.push({ img: info?.img, name: info?.title, table_name: tableName, category: info?.category, data: [] });
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

const getProjectTracker = async (req, res = response) => {
  const patentID = req.query.patent;
  const infoQuery = `SELECT * FROM fic_tracker ${patentID ? "WHERE pat="+patentID : ""}`;
  const info = await executeQuery(infoQuery);
  res.json(info);
};

const postProjectTracker = async (req, res = response) => {
  const { lat, lon, pat, batt } = req.query;
  const insertQuery = `INSERT INTO fic_tracker (lat, lon, pat, batt) VALUES (${lat}, ${lon}, ${pat}, ${batt})`;

  const result = await executeQuery(insertQuery);
  return res.status(200).send(result);
};

const executeQuery = async (query) => {
  try {
    const [results] = await dbConnection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProjects,
  getOneProject,
  getProjectsDataless,
  getProjectTracker,
  postProjectTracker
};
