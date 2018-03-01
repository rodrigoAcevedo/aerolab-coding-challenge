function lowestToHighest(a,b)
{
    return a.cost - b.cost;
}

function highestToLowest(a,b)
{
    return b.cost - a.cost;
}

function calculateTotalPages(a,b)
{
    return Math.ceil(a / b);
}

function sortProductsArray(p, o)
{
    const r = p.slice(0);
    if (o === 1) {
        r.sort(lowestToHighest);
    } else if (o === -1) {
        r.sort(highestToLowest);
    }
    return r;
}
