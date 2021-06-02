/* eslint-disable no-unused-vars */
const Service = require('./Service');
const LandingPageJson = require('../conf/LandingPageJson');
const LandingPageHtml = require('../conf/LandingPageHtml');
const ConformanceJson = require('../conf/ConformanceJson.js');
const ConformanceHtml = require('../conf/ConformanceHtml.js');
const GetCollectionsData = require('../models/GetCollectionsData.js');

/**
* describe the feature collection with id `collectionId`
*
* collectionId String local identifier of a collection
* returns collection
* */
const describeCollection = ({ collectionId }) => new Promise(
  async (resolve, reject) => {
    var retdata=GetCollectionsData.getCollectionsData(collectionId);
    try {
      if (retdata.status_code == 200)
        resolve(Service.successResponse(retdata.payload,200));
      else {
        resolve(Service.rejectResponse(retdata.message,retdata.status_code));
      }
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* the feature collections in the dataset
*
* returns collections
* */
const getCollections = () => new Promise(
  async (resolve, reject) => {
    var retdata=GetCollectionsData.getCollectionsData();
    try {
      if (retdata.status_code == 200)
        resolve(Service.successResponse(retdata.payload,200));
      else {
        resolve(Service.rejectResponse(retdata.message,retdata.status_code));
      }
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* information about specifications that this API conforms to
* A list of all conformance classes specified in a standard that the server conforms to.
*
* returns confClasses
* */
const getConformanceDeclaration = () => new Promise(
  async (resolve, reject) => {
    var payload=ConformanceJson;
/*    if (f=='text/html'){
      payload=ConformanceHtml;
    }
    */
    try {
      resolve(Service.successResponse(payload,200));
/*      resolve(Service.successResponse({
      }));
      */
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* landing page
* The landing page provides links to the API definition, the conformance statements and to the feature collections in this dataset.
*
* returns landingPage
* */
const getLandingPage = () => new Promise(
  async (resolve, reject) => {
    var payload=LandingPageJson;
/*    if (f=='text/html'){
      payload=LandingPageHtml;
    }
    */
    try {
      resolve(Service.successResponse(payload,200));
/*      resolve(Service.successResponse({
      }));
*/
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  describeCollection,
  getCollections,
  getConformanceDeclaration,
  getLandingPage,
};
