import styled from "styled-components";
import DataTable from "react-data-table-component";
export const MobileStyle = styled(DataTable)`
   font-family: "open sans", sans-serif;
   font-size: 16px;
   @media only screen and (max-width: 760px),
      (min-device-width: 768px) and (max-device-width: 1024px) {
      .rdt_TableCell,
      .rdt_TableCol {
         padding: 0;
         min-width: calc(95vw / 6);
         text-align: left;
         padding-right: 15px;
      }
      .rdt_Table {
         width: 95vw;
      }
   }
`;
