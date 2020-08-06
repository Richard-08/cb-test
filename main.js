/* ------------------------Elements----------------------- */

const table = document.querySelector('.table');
const preloader = document.querySelector('.preloader');
const dataUrl = ['cars-1', 'cars-2', 'cars-3', 'cars-4', 'cars-5',]
let currentData = 0;

/* ------------------------Functions----------------------- */

function loading() {
    preloader.classList.toggle('active');
}

async function fetchCarsData() {
    const carsData = [];
    loading();
    let response = await fetch(`./data/${dataUrl[currentData]}.json`)
        .then(response => response.json())
        .then(data => {
            carsData.push(...data);
            loading();
        });

    render(carsData);
}

const toHTML = (car) => `
<div class="table__row">
    <div class="table__cell">${car.Name}</div>
    <div class="table__cell">${car.Miles_per_Gallon}</div>
    <div class="table__cell">${car.Cylinders}</div>
    <div class="table__cell">${car.Displacement}</div>
    <div class="table__cell">${car.Horsepower}</div>
    <div class="table__cell">${car.Weight_in_lbs}</div>
    <div class="table__cell">${car.Acceleration}</div>
    <div class="table__cell">${car.Year}</div>
    <div class="table__cell">${car.Origin}</div>
</div>`;

function render(cars) {
    const html = cars.map(toHTML).join('')
    table.insertAdjacentHTML('beforeend', html);
}


/* ------------------------Listeners----------------------- */

document.addEventListener("DOMContentLoaded", fetchCarsData);

window.addEventListener('scroll', () => {
    if (currentData === dataUrl.length - 1) {
        return;
    }

    if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
        currentData += 1;
        fetchCarsData();
    }
})