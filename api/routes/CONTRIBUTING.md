# Package `routes`
The modules of this package contain python functions of type _controller_ as well as the _binding_ of these functions
with API routes thanks to the _framework Flask_.

## Do
These functions must contain: calls to `domain`, or` repository` functions as well as the various _HTTP status codes_ that we wish to return with the API routes thanks to the _framework Flask_.

## Don't
These functions must not contain: management rules, _queries_ to the database of calls to web services.

## Testing
These functions are tested across routes, with functional tests. These tests use HTTP calls and
therefore position themselves from the client's point of view.

They aim to:
* document the different status codes that exist for each route
* document the expected JSON input for each route
* document the expected JSON output for each route
* detect regressions on API routes

They do not aim to:
* test all possible pass or non-pass cases. These cases will be tested closer to the code, in
modules of `domain` or` repository` for example.

## For more information
* http://flask.pocoo.org/docs/1.0/quickstart/#routing
