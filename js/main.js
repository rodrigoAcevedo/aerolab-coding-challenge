// Main javascript

const PRODUCTS_PER_PAGE = 16;

var products = [];
var productsOrder = 0;

var userStats;

var currentPage = 1;
var totalPages;

function initUI()
{
    getUser().then(function(response) {
        userStats = response;
        drawUserStats(response);

        getProducts().then(function(response) {
            products = response;

            // We set the total amount of products
            document.getElementById("app-totalprods").innerHTML = products.length;

            drawProducts(response);
            totalPages = calculateTotalPages(products.length, PRODUCTS_PER_PAGE);
            checkRedeemAvailability();
        });
    });
}

function drawProducts(p = products)
{
    var container = document.getElementById("app-products-list");
    container.innerHTML = "";

    // In which order do we want products to be shown?
    p = sortProductsArray(p, productsOrder);

    /*
        Draw only 16 products according the page the user is at.
        For example, if the user is on page 1, start from product 0 to 15, if user is on
        page 2, from 16 to 31 and on.
    */
    var start, end;
    start = (currentPage * PRODUCTS_PER_PAGE) - PRODUCTS_PER_PAGE;
    end = (currentPage * PRODUCTS_PER_PAGE);
    // To prevent looking for products away from the list.
    if (end > p.length) {
        end = p.length;
    }

    // Where are we standing at?
    document.getElementById("app-prodend").innerHTML = end;

    for (var i = start; i < end; i++)
    {
        var productContainer = document.createElement("article");
        productContainer.classList.add("col-md-3");
        productContainer.classList.add("col-12");
        productContainer.classList.add("app-product");
        productContainer.setAttribute("id", p[i]._id);

        var productCategory = document.createElement("span");
        productCategory.innerHTML = p[i].category;

        var productName = document.createElement("h1");
        productName.innerHTML = p[i].name;

        var productPrize = document.createElement("p");
        productPrize.classList.add("bold");
        productPrize.innerHTML = p[i].cost;

        var productNeededPoints = document.createElement("div");
        productNeededPoints.classList.add("app-needed-points");
        var productNeededPointsText = document.createElement("span");
        productNeededPointsText.classList.add("attention");
        var productNeededPointsIcon = document.createElement("div");
        productNeededPointsIcon.classList.add("icon-coin");

        productNeededPoints.appendChild(productNeededPointsText);
        productNeededPoints.appendChild(productNeededPointsIcon);

        var productImg = document.createElement("img");
        productImg.classList.add("img-responsive");
        productImg.setAttribute("src", p[i].img.url);

        var productRedeemIcon = document.createElement("span");
        productRedeemIcon.classList.add("app-redeem-icon");
        productRedeemIcon.innerHTML = "<img src='assets/icons/buy-blue.svg' alt='Redeem' class='app-buy-default' width='42px'>";
        productRedeemIcon.innerHTML += "<img src='assets/icons/buy-white.svg' alt='Redeem' class='app-buy-hover' width='42px'>";

        var productRedeemWindow = document.createElement("div");
        productRedeemWindow.classList.add("app-redeem-window");

        var productRedeemBtn = document.createElement("a");
        productRedeemBtn.classList.add("app-redeem-btn");
        productRedeemBtn.innerHTML = "Redeem now";
        productRedeemBtn.setAttribute("product-id", p[i]._id);

        productRedeemBtn.addEventListener("click", function() {
            var productId = this.getAttribute("product-id");
            redeemProduct(productId).then(function(response) {
                alert("Redeemed product: " + productId);
                refreshUserStats();
            });
        });

        productRedeemWindow.appendChild(productRedeemBtn);

        productContainer.appendChild(productImg);
        productContainer.appendChild(productCategory);
        productContainer.appendChild(productName);
        productContainer.appendChild(productPrize);
        productContainer.appendChild(productNeededPoints);
        productContainer.appendChild(productRedeemWindow);
        productContainer.appendChild(productRedeemIcon);
        container.appendChild(productContainer);
    }
}

function drawUserStats(user, refreshPointsOnly = false)
{
    var userNameSpan = document.querySelector(".app-user-name span");
    var userPointsSpan = document.querySelector(".app-user-points span");

    if(!refreshPointsOnly)
        userNameSpan.innerHTML = user.name;

    userPointsSpan.innerHTML = user.points;
}

function refreshUserStats()
{
    getUser().then(function(response) {
        userStats = response;
        drawUserStats(response, true);
        checkRedeemAvailability();
    });
}

function checkRedeemAvailability(p = products)
{
    // In which order do we want products to be shown?
    p = sortProductsArray(p, productsOrder);

    var start, end;
    start = (currentPage * PRODUCTS_PER_PAGE) - PRODUCTS_PER_PAGE;
    end = (currentPage * PRODUCTS_PER_PAGE);
    // To prevent looking for products away from the list.
    if (end > p.length) {
        end = p.length;
    }
    for (var i = start; i < end; i++)
    {
        var productContainer = document.getElementById(p[i]._id);
        if (p[i].cost <= userStats.points)
        {
            productContainer.classList.add("app-product-available");
        }
        else
        {
            productContainer.classList.remove("app-product-available");
            // Calculate needed points for product.
            productContainer.querySelector(".app-needed-points span.attention").innerHTML = "You need " + (p[i].cost - userStats.points);

        }
    }
}

function sortProducts(order)
{
    const sortedProducts = sortProductsArray(products, order);
    productsOrder = order;
    drawProducts();
    checkRedeemAvailability(sortedProducts);
}

function goTo(n)
{
    currentPage += n;
    // If we try to go below 1.
    if (currentPage <= 0)
    {
        currentPage = 1;
        return;
    }
    else if (currentPage > totalPages)
    {
        currentPage = totalPages;
        return;
    }

    drawProducts(products);
    checkRedeemAvailability(products);
    // Where are we standing at?
    document.getElementById("app-prodend").innerHTML = currentPage * PRODUCTS_PER_PAGE;
}

initUI();
