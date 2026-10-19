
/* JavaScript and Validation: Group Member Name */
/* JSON Product Document: Group Member Name */
/* jQuery Search and Update: Group Member Name */

// Store products by Product ID
const products = {};

// Display messages to the user
function showMessage(message, success = true) {
    $("#message")
        .text(message)
        .css("color", success ? "green" : "red");
}

// Get product information from the form
function getProductData() {
    const weightInput = $("#productWeight").val();

    return {
        productId: $("#productId").val().trim(),
        productDesc: $("#productDesc").val().trim(),
        productCategory: $("#productCategory").val(),
        productUOM: $("#productUOM").val(),
        productPrice: Number($("#productPrice").val()),
        productWeight: weightInput === ""
            ? null
            : Number(weightInput)
    };
}

// Validate required fields and numbers
function validateProduct() {
    const form = document.getElementById("productForm");

    if (!form.reportValidity()) {
        return false;
    }

    const product = getProductData();

    if (
        !product.productId ||
        !product.productDesc ||
        !product.productCategory ||
        !product.productUOM
    ) {
        showMessage("Please complete all required fields.", false);
        return false;
    }

    if (
        !Number.isFinite(product.productPrice) ||
        product.productPrice < 0
    ) {
        showMessage("Please enter a valid product price.", false);
        return false;
    }

    if (
        product.productWeight !== null &&
        (!Number.isFinite(product.productWeight) ||
         product.productWeight < 0)
    ) {
        showMessage("Please enter a valid product weight.", false);
        return false;
    }

    return true;
}

// Display the JSON product document
function displayJSON(product) {
    const jsonDocument = JSON.stringify(product, null, 4);

    $("#jsonOutput").text(jsonDocument);
}

// Fill the form with existing product information
function fillProductForm(product) {
    $("#productId").val(product.productId);
    $("#productDesc").val(product.productDesc);
    $("#productCategory").val(product.productCategory);
    $("#productUOM").val(product.productUOM);
    $("#productPrice").val(product.productPrice);
    $("#productWeight").val(product.productWeight ?? "");
}

// SAVE PRODUCT
$("#productForm").on("submit", function(event) {
    event.preventDefault();

    if (!validateProduct()) {
        return;
    }

    const product = getProductData();

    if (Object.hasOwn(products, product.productId)) {
        showMessage(
            "Product ID already exists. Use Update instead.",
            false
        );
        return;
    }

    products[product.productId] = product;

    displayJSON(product);

    showMessage("Product saved successfully!");
});

// SEARCH PRODUCT USING JQUERY
$("#searchBtn").on("click", function() {
    const searchId = $("#searchId").val().trim();

    if (searchId === "") {
        showMessage("Please enter a Product ID to search.", false);
        return;
    }

    if (Object.hasOwn(products, searchId)) {
        const product = products[searchId];

        fillProductForm(product);
        displayJSON(product);

        showMessage("Product found successfully!");
    } else {
        $("#jsonOutput").text("");

        showMessage("Product not found.", false);
    }
});

// UPDATE EXISTING PRODUCT
$("#updateBtn").on("click", function() {
    if (!validateProduct()) {
        return;
    }

    const product = getProductData();

    if (!Object.hasOwn(products, product.productId)) {
        showMessage(
            "Product does not exist. Save it first.",
            false
        );
        return;
    }

    products[product.productId] = product;

    displayJSON(product);

    showMessage("Product updated successfully!");
});
