import React from "react";
import {
   TextField,
   SelectField,
   ClearButton,
} from "../style/filterComponentStyles";
export const FilterComponent = ({ filterText, onFilter, onClear }) => (
   <>
      <SelectField id='filter'>
         <option id='choose' value='' hidden>
            Choose filter
         </option>
         <option id='id' value='id'>
            ID
         </option>
         <option id='name' value='name'>
            Name
         </option>
         <option id='city' value='city'>
            City
         </option>
         <option id='total_income' value='total_income'>
            Total income
         </option>
         <option id='average_income' value='average_income'>
            Average income
         </option>
         <option id='last_month_income' value='last_month_income'>
            Last month income
         </option>
      </SelectField>
      <TextField
         id='search'
         type='text'
         placeholder='Filter By Name'
         value={filterText}
         onChange={onFilter}
      />
      <ClearButton type='button' onClick={onClear}>
         X
      </ClearButton>
   </>
);
