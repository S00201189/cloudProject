console.log(document.getElementById("getEircode"))
document.getElementById("orderForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById("FirstName").value,
        lastName: document.getElementById("LastName").value,
        address: document.getElementById("address1").value,
        eircode: document.getElementById("getEircode").value,
        state: document.getElementById("state").value,
        nameOnCard: document.getElementById("cname").value,
        creditCardNumber: document.getElementById("ccnum").value,
        expiryDate: document.getElementById("expyear").value,
        cvv: document.getElementById("cvv").value,
    };

    try {
        const response = await fetch("https://8n49wwz2ui.execute-api.eu-west-1.amazonaws.com/prod/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            alert("Order saved successfully!");
        } else {
            throw new Error("Error saving order");
        }
    } catch (error) {
        console.error("Error saving order:", error);
        alert("Error saving order");
    }
});


