const fs=require('fs');
const path = require('path');
const logger = require('../logger');
const config = require('../config');

function ciEquals(a, b) {
    return typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
        : a === b;
}

const getCollectionsData = (dataset) => {
  let cfile=path.join(config.ROOT_DIR, 'data', 'collections.json');
  let rawdata=fs.readFileSync(cfile);
  let confjson=JSON.parse(rawdata);

  let retdata={
    'payload':{
        'collections': [],
        'links': []
    },
    'status_code':200,
    'message':'success'
  };

  let resources = confjson.resources;
  for (var i in resources){
    if (!ciEquals(resources[i].type,"collection")) continue;
    let acollection = {'links': []};
    acollection['id'] = i;
    acollection['title'] = resources[i].title;
    acollection['description'] = resources[i].description;
    acollection['keywords'] = resources[i].keywords;

    let bbox = resources[i]['extents']['spatial']['bbox']
//    # The output should be an array of bbox, so if the user only
//    # provided a single bbox, wrap it in a array.
    if (!Array.isArray(bbox[0])){
      bbox = [bbox]
    }
    acollection['extent'] = {
        'spatial': {
            'bbox': bbox
        }
    }

    if ('crs' in resources[i]['extents']['spatial'])
        acollection['extent']['spatial']['crs'] = resources[i]['extents']['spatial']['crs'];

    let t_ext = resources[i]['extents']['temporal'];
    if (t_ext){
      let begins = t_ext['begin'];//dategetter('begin', t_ext)
      let ends = t_ext['end'];//dategetter('end', t_ext)
      acollection['extent']['temporal'] = {
          'interval': [[begins, ends]]
      };
      if ('trs' in t_ext)
          acollection['extent']['temporal']['trs'] = t_ext['trs'];
    }

    for (var alnk in resources[i]['links']){
      let link=resources[i]['links'][alnk];
      let lnk = {
          'type': link['type'],
          'rel': link['rel'],
          'title': link['title'],
          'href': link['href']
      };
      if ('hreflang' in link)
          lnk['hreflang'] = link['hreflang'];

      acollection['links'].push(lnk);
    }

    acollection['links'].push({
        'type': 'application/json',
        'rel': 'self',
        'title': 'This document as JSON',
        'href': config.URL_PATH+((config.URL_PORT !== '80')?':'+config.URL_PORT:'')+'/collections/'+i+'?f=json'
    });

    if (typeof dataset !== 'undefined'){
      if (ciEquals(dataset,i)) {
        retdata.payload=acollection;
        return retdata;
      }
    }
    else retdata.payload.collections.push(acollection);
  }

  if (typeof dataset !== 'undefined'){
    retdata.status_code=404;
    retdata.message="Resource "+dataset+" does not exist!";
  }else {
    retdata.payload['links'].push({
        'type': 'application/json',
        'rel': 'self',
        'title': 'This document as JSON',
        'href': config.URL_PATH+((config.URL_PORT !== '80')?':'+config.URL_PORT:'')+'/collections?f=json'
    });
  }

  return retdata;
}


module.exports = {
  getCollectionsData,
};
