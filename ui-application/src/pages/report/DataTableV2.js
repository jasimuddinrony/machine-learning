import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DialogUI from "./DialogUI";
import {reportApi} from "./reportApi";
import PaginationUtil from "./PaginationUtil";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    {field: 'id', headerName: 'SL', sortable: false, width: 100},
    {field: 'rank', headerName: 'Rank', sortable: false, width: 200},
    {field: 'name', headerName: 'Name', sortable: false, width: 350},
    {field: 'value', headerName: 'Value (%)', sortable: false, width: 150},
    {field: 'address', headerName: 'Address', sortable: false, width: 450},
];


export default function DataTableV2({
                                      data
                                      , handleChangePageInfo
    , selectedASP
                                  }) {

    const [rows, setRows] = React.useState([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState();
    const [selectedName, setSelectedName] = React.useState("");
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0, pageSize: 20
    });

    useEffect(() => {
        if (data && data.results && data.results.length > 0) {
            const _rows = data.results.map((item, index) => ({
                id: (index + 1) + ((data.page - 1) * data.limit),
                rank: item.rank,
                name: item.name,
                value: item.value ? (Math.round(item.value * 100) / 100) : item.value,
                address: item.address
            }));
            setRows(_rows);
            setRowCount(data.limit * data.total_pages);
        }
    }, [data]);

    const handleOnPaginationModelChange = (gridPaginationModel, gridCallbackDetails) => {

        setPaginationModel(gridPaginationModel)
        if (handleChangePageInfo && gridPaginationModel) {
            handleChangePageInfo(gridPaginationModel)
        }
    }

    const handleRowSelection = (name) => {

        // console.log(GridEventListener);
        // let name = GridEventListener.row.name;
        console.log(name);

        let request = {
            asp: selectedASP
            , restaurantName: name
        }

        reportApi.getReportReasonData(request)
            .then((response) => {
                console.log(response)
                setDialogData(response.data);
                setSelectedName(name);
                setDialogOpen(true);
            })
            .catch(err => {
                console.error(err);
            })
    }


    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handlePageClick = (event) => {
        let _pageNumber =  event.selected;
        if(handleChangePageInfo){
            handleChangePageInfo(_pageNumber);
        }
        console.log(
            `User requested page number ${event.selected}`
        );
    };

    return (
        <div style={{height: '100%', width: '100%'}}>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="15%">순위</TableCell>
                            <TableCell width="30%">이름</TableCell>
                            <TableCell width="15%" align="center">선호도 (%)</TableCell>
                            <TableCell width="40%">주소</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={event => {handleRowSelection(row.name)}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.rank}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.value}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <PaginationUtil
                handlePageClick={handlePageClick}
                totalPages={data.total_pages}
                currentPage={(data.page? data.page - 1 : 0)}
            />

            <DialogUI
                data={dialogData}
                name={selectedName}
                open={dialogOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            />

        </div>
    );
}
