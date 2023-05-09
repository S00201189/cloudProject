$(document).ready(function () {

    // set the checkout figure
    if (localStorage.getItem('checkout') == null) {
        localStorage.setItem('checkout', 0);
    }
    $("#checkout").html(localStorage.getItem('checkout'));


    // Fetch product data and populate the page with product cards
    fetch('https://8n49wwz2ui.execute-api.eu-west-1.amazonaws.com/prod/product', {
        headers: {
            'Access-Control-Allow-Origin': '*' // Allow any origin
        }
    })

        .then(response => response.json())
        .then(data => {
            const productsContainer = $(".row");

            data.forEach(product => {
                const productCard = `
<div class="column">
<div class="card">
<div class="card-body">
  <img src="${product.img_url}" class="d-block w-100" alt="${product.name}" width="300px" height="450px">
  <strong class="card-title">${product.name}</strong>
  <p class="card-text">${product.description}</p>
  <p><strong>Price :</strong> €${product.price}</p>
  <a href="#" class="btn btn-primary addtocart">Add to Cart</a>
</div>
</div>
</div>
`;
                productsContainer.append(productCard);
            });

            // Update add to cart click event to use the new fetched product data
            $(".addtocart").click(function () {
                var total = localStorage.getItem('checkout');
                total++;
                localStorage.setItem('checkout', total);
                $("#checkout").html(total);
            });
        })
        .catch(error => console.error(error))



    // this code is run everytime this js file is loaded.   

    /* localstroage is a javascript object that allows us to store key/value pairs 
    https://javascript.info/localstorage */
    if (localStorage.getItem('userdetails') === null) {
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        var userDetails = { firstName: "Walter", lastName: "Mitty", dob: "1990-12-01", address1: "Buenos Ayres Drive", address2: "Strandhill", address3: "Co. Sligo" };
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        localStorage.setItem('userdetails', JSON.stringify(userDetails));
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. JSON.parse turns it back into an javascript object
        userDetails = JSON.parse(localStorage.getItem('userdetails'));
    }

    // we only run this code if an id of udetails is on the html page we are currently on - makes the code a little bit more efficient
    // if the length > 0 it means we are on the right page - and we can populdate the form fields!!!
    if ($('#udetails').length > 0) {
        $('input[name="firstname"]').val(userDetails.firstName);
        $('input[name="lastname"]').val(userDetails.lastName);
        $('input[name="dob"]').val(userDetails.dob);
        $('input[name="address1"]').val(userDetails.address1);
        $('input[name="address2"]').val(userDetails.address2);
        $('input[name="address3"]').val(userDetails.address3);
    }


    // wait for submit button to be clicked on userdetails update form
    $('form[name="userdetails"]').submit(function (event) {
        // if the user updates the user details - we update the userDetails javascript object
        userDetails.firstName = $('input[name="firstname"]').val();
        userDetails.lastName = $('input[name="lastname"]').val();
        userDetails.address1 = $('input[name="address1"]').val();
        userDetails.address2 = $('input[name="address2"]').val();
        userDetails.address3 = $('input[name="address3"]').val();
        // finally we convert the javascript object to a string with JSON.stringify and save it to localstorage
        localStorage.setItem('userdetails', JSON.stringify(userDetails));
        return false;
    });

    // wait for submit button to be clicked on userdetails update form
    $('form[name="paymentdetails"]').submit(function (event) {
        var cardnumber = $('input[name="cardnumber"]').val();
        if (cardnumber == "1234 5678 9102 3456") {
            $("#payment-failure").addClass("d-none");
            $("#payment-success").removeClass("d-none");
            $("#buy-button").addClass("d-none");
            var total = 0;
            localStorage.setItem('checkout', total); // makes sure that when we goto another page - the total help in localstorage is zero
            $("#checkout").html(total);

        } else {
            $("#payment-failure").removeClass("d-none");
        }
        return false;
    });


    $(".addtocart").click(function () {
        var total = localStorage.getItem('checkout');
        total++;
        localStorage.setItem('checkout', total);
        $("#checkout").html(total);
    });
});

