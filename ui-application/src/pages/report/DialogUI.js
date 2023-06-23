import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import RestaurantReasonDetailsDataTable from "./RestaurantReasonDetailsDataTable";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';


export default function DialogUI({
                                     data
                                     , name
                                     , open
                                     , handleClickOpen
                                     , handleClose
                                 }) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xlg');

    useEffect(() => {
        setIsOpen(open)
        console.log('opened => ' + open);
    }, [open]);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            <DialogTitle id="responsive-dialog-title">

                <div className={"title-with-icon"}>
                    {/*<div style={{marginRight: "10px"}}>*/}
                    {/*    <Store />*/}
                    {/*</div>*/}
                    <div>
                        <h4 style={{margin: "0px"}} className={"restaurant-page-header"}>{name} 선호하는 이유</h4>
                    </div>
                </div>


                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <RestaurantReasonDetailsDataTable
                        data={data}
                        />

                </DialogContentText>
            </DialogContent>

        </Dialog>
    );
}
