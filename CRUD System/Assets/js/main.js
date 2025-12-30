var getInputElementNameValue = document.getElementById('productName')
var getInputElementCategoryValue = document.getElementById('productCategory')
var getInputElementPriceValue = document.getElementById('productPrice')
var getInputElementImgValue = document.getElementById('productCoverImage')
var getInputElementDescValue = document.getElementById('productDescription')
var StoredData = []
StoredData = JSON.parse(localStorage.getItem("saveProduct")) || []

display()

function GetInputValue(){
    if(validateName() && validateCategory() && validatePrice() && validateImage()){
        var product = {
            name: getInputElementNameValue.value,
            category: getInputElementCategoryValue.value,
            price: getInputElementPriceValue.value,
            imgURL: `Assets/images/` + getInputElementImgValue.files[0]?.name,
            description: getInputElementDescValue.value,
        }
        StoredData.push(product)
        display();

        localStorage.setItem("saveProduct", JSON.stringify(StoredData))
        getInputElementNameValue.value = null
        getInputElementCategoryValue.value = null
        getInputElementPriceValue.value = null
        getInputElementDescValue.value = null
    }
}
function display() {
    var cart = ``

    for (let i = 0; i < StoredData.length; i++) {
        cart += `
            <tr class="border-bottom-0">
                <td>${i + 1}</td>

                <td>
                    <img src="${StoredData[i].imgURL}" 
                         width="60" height="60" 
                         style="object-fit:cover;border-radius:8px;">
                </td>

                <td>${StoredData[i].name}</td>
                <td>${StoredData[i].category}</td>
                <td>
                    <span class="badge bg-primary">${StoredData[i].price}</span>
                </td>

                <td class="mx-5 p-3">
                    <div>
                        <button onclick="setValue(${i})" 
                            class="form-control w-50 btn btn-sm btn-outline-success me-1">
                            Update
                        </button>

                        <button onclick="DeleteItem(${i})" 
                                class="form-control w-50 btn btn-sm btn-outline-danger mt-2">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        `
    }

    document.getElementById('demo').innerHTML = cart
}


function DeleteItem(Index){
    StoredData.splice(Index,1)
    localStorage.setItem("saveProduct", JSON.stringify(StoredData))
    display()
}

let superIndex;
function setValue(index){
    document.getElementById('UpdateProduct').style.display = 'block'
    document.getElementById('addProduct').style.display = 'none' 
    superIndex = index;
    getInputElementNameValue.value = StoredData[index].name
    getInputElementCategoryValue.value = StoredData[index].category
    getInputElementPriceValue.value = StoredData[index].price
    getInputElementDescValue.value = StoredData[index].description
}

function updateProduct(){
    StoredData[superIndex].name = getInputElementNameValue.value
    StoredData[superIndex].category = getInputElementCategoryValue.value
    StoredData[superIndex].price = getInputElementPriceValue.value
    StoredData[superIndex].description = getInputElementDescValue.value

    localStorage.setItem("saveProduct", JSON.stringify(StoredData))
    display()
    document.getElementById('UpdateProduct').style.display = 'none'
    document.getElementById('addProduct').style.display = 'block' 

    getInputElementNameValue.value = null
    getInputElementCategoryValue.value = null
    getInputElementPriceValue.value = null
    getInputElementDescValue.value = null
}

function Search(InputValue) {
    var cart = ``
    InputValue = InputValue.toLowerCase()

    for (let i = 0; i < StoredData.length; i++) {
        if (StoredData[i].name.toLowerCase().includes(InputValue)) {

            cart += `
                <tr>
                    <td>${i + 1}</td>

                    <td>
                        <img src="${StoredData[i].imgURL}" 
                             width="60" height="60" 
                             style="object-fit:cover;border-radius:8px;">
                    </td>

                    <td>
                        ${StoredData[i].name.replace(
                            new RegExp(InputValue, "gi"),
                            `<span style="color:red;font-weight:bold;">$&</span>`
                        )}
                    </td>

                    <td>${StoredData[i].category}</td>

                    <td>
                        <span class="badge bg-primary">${StoredData[i].price}</span>
                    </td>

                    <td class="mx-5">
                        <div class="d-flex flex-column mx-5">
                            <button onclick="setValue(${i})" 
                                class="form-control w-100 btn btn-sm btn-outline-success me-1">
                                Update
                            </button>

                            <button onclick="DeleteItem(${i})" 
                                    class="form-control w-100 btn btn-sm btn-outline-danger mt-2">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `
        }
    }

    document.getElementById('demo').innerHTML = cart
}


function validateName(){
    var regex = /^[A-Za-z0-9]+(?:[A-Za-z0-9 '-]*[A-Za-z0-9])?$/
    if(regex.test(getInputElementNameValue.value)){
        document.getElementById('nameError').innerHTML = ""
        return true
    }else{
        document.getElementById('nameError').innerHTML = '**Please Enter a Valid Product Name'
        return false
    }
}

function validateCategory(){
    var regex = /^[A-Za-z]+$/
    if(regex.test(getInputElementCategoryValue.value)){
        document.getElementById('categoryError').innerHTML = ""
        return true
    }else{
        document.getElementById('categoryError').innerHTML = "**Please Enter a Valid Product Category Name"
        return false
    }
}

function validatePrice(){
    var regex = /^[0-9]+$/
    if(regex.test(getInputElementPriceValue.value)){
        document.getElementById('priceError').innerHTML = ""
        return true
    }else{
        document.getElementById('priceError').innerHTML = "**Please Enter a Valid Price"
    }
}

function validateImage(){
    if(getInputElementImgValue.files.length > 0){
        document.getElementById('imageError').innerHTML = ""
        return true
    }else{
        document.getElementById('imageError').innerHTML = "**Please select a Product Cover"
    }
}