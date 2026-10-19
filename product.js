
/* JavaScript Developer: Replace with group member name */

// Store products in the browser while the page is open.
const products = {};

function getProductFromForm() {
    return {
        productId: $("#productId").val().trim(),
        productDesc: $("#productDesc").val().trim(),
        productCategory: $("#productCategory").val(),
        productUOM: $("#productUOM").val(),
        productPrice: Number($("#productPrice").val()),
        productWeight: $("#productWeight").val() === ""
            ? null
            : Number($("#productWeight").val())
    };
}

function showJSON(product) {
    $("#jsonOutput").text(JSON.stringify(product, null, 4));
}

/* JSON Developer: Replace with group member name */

$("#productForm").on("submit", function(event) {
    event.preventDefault();

    if (!this.reportValidity()) {
        return;
    }

    const product = getProductFromForm();

    if (product.productId === "" || product.productDesc === "" ||
        product.productCategory === "" || product.productUOM === "" ||
        !Number.isFinite(product.productPrice) ||
        product.productPrice < 0 ||
        (product.productWeight !== null &&
         (!Number.isFinite(product.productWeight) || product.productWeight < 0))) {
        alert("Please enter valid product information.");
        return;
    }

    if (products[product.productId]) {
        alert("Product ID already exists. Use Update instead.");
        return;
    }

    products[product.productId] = product;

    showJSON(product);

    alert("Product saved successfully!");
});
