export const fetchCompanies = (companies, setCompanies) => {
    fetch("https://recruitment.hal.skygate.io/companies")
       .then((response) => response.json())
       .then((data) => {
          setCompanies((companies = data));
       })
       .catch((error) => {
          console.error("Error:", error);
       });
 };
 export const fetchIncomes = (companies, incomeArray, setIncomeArray) => {
    for (let i = 0; i < companies.length; i++) {
       fetch(`https://recruitment.hal.skygate.io/incomes/${companies[i].id}`)
          .then((response) => response.json())
          .then((data) => {
             incomeArray.push(data);
          })
          .catch((error) => {
             console.error("Error:", error);
          });
    }
 };