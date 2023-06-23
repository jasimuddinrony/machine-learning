import * as React from 'react';
import {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DialogUI from "./DialogUI";
import {reportApi} from "./reportApi";
import PaginationUtil from "./PaginationUtil";

const columns = [
    {field: 'id', headerName: 'SL', sortable: false, width: 100},
    {field: 'rank', headerName: 'Rank', sortable: false, width: 200},
    {field: 'name', headerName: 'Name', sortable: false, width: 350},
    {field: 'value', headerName: 'Value (%)', sortable: false, width: 150},
    {field: 'address', headerName: 'Address', sortable: false, width: 450},
];


export default function DataTable({
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

    const handleRowSelection = (GridEventListener) => {

        console.log(GridEventListener);
        let name = GridEventListener.row.name;
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



    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[20]}
                rowCount={rowCount}
                disableColumnMenu
                autoPageSize={20}
                paginationMode={paginationModel}
                onPaginationModelChange={handleOnPaginationModelChange}
                onRowClick={handleRowSelection}

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
