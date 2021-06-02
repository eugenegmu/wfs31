const LandingPageJson={
  "title": "GMU OGC API-Features",
  "description": "Testbed 17 API-Feature service via a Web API that conforms to the OGC API Features specification.",
  "links": [
    {
      "href": "http://localhost:8080/",
      "rel": "self",
      "type": "application/json",
      "title": "this document"
    },
    {
      "href": "http://localhost:8080/openapi",
      "rel": "service-desc",
      "type": "application/vnd.oai.openapi+json;version=3.0",
      "title": "the API definition"
    },
    {
      "href": "http://localhost:8080/api-docs",
      "rel": "service-doc",
      "type": "text/html",
      "title": "the API documentation"
    },
    {
      "href": "http://localhost:8080/conformance",
      "rel": "conformance",
      "type": "application/json",
      "title": "OGC API conformance classes implemented by this server"
    },
    {
      "href": "http://localhost:8080/collections",
      "rel": "data",
      "type": "application/json",
      "title": "Information about the feature collections"
    }
  ]
};
module.exports = LandingPageJson;
