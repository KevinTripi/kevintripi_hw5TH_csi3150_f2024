const carsContainer = document.getElementById("carsContainer");
const applyFilters = document.getElementById("applyFilters");
const carMake = document.getElementById("carMake");
const carColor = document.getElementById("carColor");

// Helper: Populate filter options dynamically
function choicesForCars(carData, selectElement, index) {
  let options = [];
  carData.forEach(car => {
    if (!options.includes(car[index])) {
      options.push(car[index]);
      const option = document.createElement("option");
      option.value = car[index];
      option.textContent = car[index];
      selectElement.appendChild(option);
    }
  });
}



// here is make and color options
choicesForCars(usedCars, carMake, "make");
choicesForCars(usedCars, carColor, "color");

// Function to render cars on to page
function renderCarsResult(cars) {
  carsContainer.innerHTML = ""; // Clear previous stuff
  if (cars.length === 0) {
    carsContainer.innerHTML = "<p>No cars match your search, Try again.</p>";
    return;
  }
  cars.forEach(car => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.innerHTML = `
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p>Mileage: ${car.mileage} miles</p>
     
      <p>Price: $${car.price}</p>
      <p>Color: ${car.color}</p>
      <p>Gas Mileage: ${car.gasMileage}</p>
    `;
    carsContainer.appendChild(carCard);
  });
}

// Filter function
applyFilters.addEventListener("click", () => {
  // what the filter needs
  
  const minYear = document.getElementById("minYear").value;
  const maxYear = document.getElementById("maxYear").value;
  const maxMileage = document.getElementById("maxMileage").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  //makes and colors
  const selectedMakes = Array.from(carMake.selectedOptions).map(option => option.value);
  const selectedColors = Array.from(carColor.selectedOptions).map(option => option.value);


  // Filter cars
  const filteredCars = usedCars.filter(car => {
    let yearMatch = true, mileageMatch = true, priceMatch = true, makeMatch = true, colorMatch = true;

    // year
    if (minYear) yearMatch = car.year >= minYear;
    if (maxYear) yearMatch = yearMatch && car.year <= maxYear;



    // mileage
    if (maxMileage) mileageMatch = car.mileage <= maxMileage;



    // price
    if (minPrice) priceMatch = car.price >= minPrice;
    if (maxPrice) priceMatch = priceMatch && car.price <= maxPrice;

    // make
    if (selectedMakes.length > 0) makeMatch = selectedMakes.includes(car.make);

    // color
    if (selectedColors.length > 0) colorMatch = selectedColors.includes(car.color);

    return yearMatch && mileageMatch && priceMatch && makeMatch && colorMatch;
  });

  renderCarsResult(filteredCars);
});

// Initial render
renderCarsResult(usedCars);
