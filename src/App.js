import React from "react";
import { columns } from "./components/columns";
import { FilterComponent } from "./components/FilterComponent";
import { fetchCompanies, fetchIncomes } from "./components/fetch";
import { MobileStyle } from "./style/mobileStyle";

export const App = () => {
   const [filterText, setFilterText] = React.useState("");
   let [companies, setCompanies] = React.useState([]);
   let [incomeArray, setIncomeArray] = React.useState([]);
   let [combineArray] = React.useState([]);
   let [arrayAfterMath] = React.useState([]);
   let [filterValue, setFilterValue] = React.useState("name");
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
      false
   );
   let filteredItems = [];

   React.useEffect(() => {
      let filter = document.getElementById("filter");
      filter.onchange = (e) => {
         setFilterValue((filterValue = e.target.value));
      };
      if (incomeArray.length !== companies.length && companies.length === 300) {
         fetchIncomes(companies, incomeArray, setIncomeArray);
      }
      fetchCompanies(companies, setCompanies);
   }, [filterValue, companies, incomeArray, arrayAfterMath]);
   if (companies !== null) {
      if (incomeArray.length === companies.length) {
         incomeArray.forEach((object, id) => {
            companies.forEach((singleCompany, id) => {
               if (object.id === singleCompany.id) {
                  let obj = Object.assign(object, singleCompany);
                  combineArray.push(obj);
               }
            });
         });
      }
   }
   if (combineArray.length === companies.length) {
      companies.forEach((companie, key) => {
         combineArray.forEach((singleCombineObj, id) => {
            const sum = singleCombineObj.incomes.reduce(function (
               previousValue,
               currentValue
            ) {
               return {
                  value: Math.round(
                     parseFloat(previousValue.value) +
                        parseFloat(currentValue.value)
                  ),
               };
            });
            let currnetMonth = [];

            singleCombineObj.incomes.forEach((obj) => {
               const today = new Date();
               const year = today.getFullYear() - 1;
               let zeroInMonth = "0";
               if (today.getMonth() + 1 > 9) {
                  zeroInMonth = null;
               } else {
                  zeroInMonth = "0";
               }
               const month = zeroInMonth + (today.getMonth());
               const objYear = obj.date.slice(0, 4);
               const objMonth = obj.date.slice(5, 7);
               if (companie.id === singleCombineObj.id) {
                  if (
                     parseInt(objYear) === year &&
                     parseInt(objMonth) === parseInt(month)
                  ) {
                     currnetMonth.push(obj);
                  }
               }
            });
            let monthSum;
            if (currnetMonth.length !== 0) {
               monthSum = currnetMonth.reduce(function (
                  previousValue,
                  currentValue
               ) {
                  return {
                     value: Math.round(
                        parseFloat(previousValue.value) +
                           parseFloat(currentValue.value)
                     ),
                  };
               });
            }
            if (companie.id === singleCombineObj.id) {
               companie["total_income"] = sum.value;
               if (monthSum !== undefined) {
                  companie["last_month_income"] = monthSum.value;
               }
               const average = sum.value / incomeArray[id].incomes.length;
               companie["average_income"] = average;
               arrayAfterMath.push(companie);
            }
         });
      });
   }
   if (companies && filterValue !== null && arrayAfterMath.length === 300) {
      if (filterValue === "name") {
         filteredItems = arrayAfterMath.filter(
            (item) => item.name && item.name.includes(filterText)
         );
      }
      if (filterValue === "id") {
         filteredItems = arrayAfterMath.filter(
            (item) => item.id && item.id.toString().includes(filterText)
         );
      }
      if (filterValue === "city") {
         filteredItems = arrayAfterMath.filter(
            (item) => item.city && item.city.includes(filterText)
         );
      }
      if (filterValue === "total_income") {
         filteredItems = arrayAfterMath.filter(
            (item) =>
               item.total_income &&
               item.total_income.toString().includes(filterText)
         );
      }
      if (filterValue === "average_income") {
         filteredItems = arrayAfterMath.filter(
            (item) =>
               item.average_income &&
               item.average_income.toString().includes(filterText)
         );
      }
      if (filterValue === "last_month_income") {
         filteredItems = arrayAfterMath.filter(
            (item) =>
               item.last_month_income &&
               item.last_month_income.toString().includes(filterText)
         );
      }
   }

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
         }
      };
      return (
         <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
         />
      );
   }, [filterText, resetPaginationToggle]);

   return (
      <MobileStyle
         title='Companies List'
         columns={columns}
         data={filteredItems}
         defaultSortAsc={false}
         noDataComponent='Loading data ...'
         pagination
         paginationResetDefaultPage={resetPaginationToggle}
         subHeader
         subHeaderComponent={subHeaderComponentMemo}
         persistTableHead
      />
   );
};
