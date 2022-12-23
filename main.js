let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let varCreate = 'create';
let temp;

// get total
function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#fe8f01';
    }else{
        total.innerHTML = 0;
        total.style.backgroundColor = '#d5dfe7';
    }
}

// create product
let dataPro;
if(localStorage.Product != null){
    dataPro = JSON.parse(localStorage.Product);
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro ={
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (varCreate === 'create')
    {
        if(newPro.count > 1)
        {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[temp] = newPro;
        submit.innerHTML = 'CREATE';
        count.style.display = 'block';
        varCreate = 'create';
    }
    
    // localStorage.clear();
    // save local data
    localStorage.setItem('Product', JSON.stringify(dataPro));
    
    // console.log(dataPro);
    // clear inputs
    title.value = price.value = taxes.value = ads.value = discount.value = total.innerHTML = count.value = category.value = null;
    showData();
    getTotal();
}



// show 
function showData()
{
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updataData(${i})' id="update">UPDATE</button></td>
            <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
        </tr>
        `;
    }
    // Add table to HTML
    document.getElementById('tbody').innerHTML = table;
    //Delete all
    let btnDelete = document.getElementById('deleteAll');
    if ( dataPro.length > 0)
    { 
        btnDelete.innerHTML = ` <button id='btnDeleteAll' onclick = 'deleteAll()'  style="width: 100%;">DELETE ALL  (${dataPro.length})</button>`;
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();



// delete
function deleteData(i)
{
    // console.log(i);
    dataPro.splice(i,1);
    localStorage.Product = JSON.stringify(dataPro);
    showData();
}

// delete all
function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    showData();

}
// count

// update
function updataData(i){
    // console.log(i);
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'UPDATE';
    varCreate = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search
let srchMode = 'Title';

function getSearchMode(id)
{
    let search = document.getElementById('search');
    if(id === 'searchTitle')
    {
        srchMode = 'Title';
    }else{
        srchMode = 'Category';
    }
    document.getElementById('search').placeholder = `Search with ${srchMode}`;
    search.focus();
    search.value = '';
    showData();
}

function srchData(value)
{
    let table = '';
    for (let i = 0; i < dataPro.length; i++) 
    {
        if(srchMode === 'Title')
        { 
            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updataData(${i})' id="update">UPDATE</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
                </tr>
                `;
                
            }
        }else{
            if(dataPro[i].category.includes(value.toLowerCase()))
                {
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick='updataData(${i})' id="update">UPDATE</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
                    </tr>
                    `;
                    
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// clean data 