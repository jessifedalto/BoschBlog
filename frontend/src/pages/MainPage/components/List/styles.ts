import styled from "styled-components";

export const Table = styled.table`
    width: 50%;
    border-collapse: collapse;
    margin: 20px auto;
    border: 1px solid slategray;
    border-radius: 5px;
`;

export const TableHeader = styled.tr`
    background-color: #7CD4FC;
`;

export const TableHead = styled.th`
    padding: 10px;
    color: blue;
    font-weight: bold;  
    border: 1px solid slategray;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const TableData = styled.td`
    padding: 10px;
    border: 1px solid slategray;
    color: grey;
    font-weight: bolder;
`;
