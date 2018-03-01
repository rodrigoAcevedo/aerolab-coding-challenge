// Config params and ajax calls

var configParams = {
    "personalToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg1ZWRjM2IzMjU3ODAwOGYyYWNjZGMiLCJpYXQiOjE1MTg3MjY1OTV9.Eo7JWh76Va4twpW2ZXvPJdj-kf1CTW7oCORpNRQAyz0",
    "productionURL" : "https://aerolab-challenge.now.sh",
    "debugURL" : "https://private-anon-9e2fc0100d-aerolabchallenge.apiary-proxy.com"
}

function getUser()
{
    return new Promise(function(resolve, reject)
    {
        var request = new XMLHttpRequest();

        request.open("GET", configParams.debugURL + "/user/me");

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', configParams.personalToken);

        request.onreadystatechange = function () {
            if (this.readyState === 4)
            {
                resolve(JSON.parse(request.response));
            }
        };

        request.send();
    });

}

function getProducts()
{
    return new Promise(function(resolve, reject)
    {
        var request = new XMLHttpRequest();

        request.open("GET", configParams.debugURL + "/products");

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', configParams.personalToken);

        request.onreadystatechange = function () {
            if (this.readyState === 4)
            {
                resolve(JSON.parse(request.response));
            }
        };

        request.send();
    });

}

function addPointsToUser(points)
{
    return new Promise(function(resolve, reject)
    {
        var request = new XMLHttpRequest();

        request.open("POST", configParams.debugURL + "/user/points");

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', configParams.personalToken);

        request.onreadystatechange = function () {
            if (this.readyState === 4)
            {
                resolve(JSON.parse(request.response));
            }
        };

        var body = {
            "amount" : points
        }

        request.send(JSON.stringify(body));
    });
}

function redeemProduct(productId)
{
    return new Promise(function(resolve, reject)
    {
       var request = new XMLHttpRequest();

        request.open("POST", configParams.debugURL + "/redeem");

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', configParams.personalToken);

        request.onreadystatechange = function () {
            if (this.readyState === 4)
            {
                resolve(JSON.parse(request.response));
            }
        };

        var body = {
            "productId" : productId
        };

        request.send(JSON.stringify(body));
    });
}

function getUserRedeemHistory()
{
    return new Promise(function(resolve, reject)
    {
        var request = new XMLHttpRequest();

        request.open("GET", configParams.debugURL + "/user/history");

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', configParams.personalToken);

        request.onreadystatechange = function () {
            if (this.readyState === 4)
            {
                resolve(JSON.parse(request.response));
            }
        };

        request.send();
    });
}
