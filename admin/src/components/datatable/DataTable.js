import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatableSources";
import { Link } from "react-router-dom";
import "./datatable.css";
import { useStore } from "../../store";
import { deleteUserApi } from "../../api/index";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

const DataTable = () => {
  const allUser = useStore((state) => state.allUser);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [idUserDelete, setIdUserDelete] = React.useState(null);
  const deleteUser = useStore((state) => state.deleteUser);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => deleteUserHandler(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const deleteUserHandler = (id) => {
    setIsOpenDialog(true);
    setIdUserDelete(id);
  };

  const submitDeleteUser = async () => {
    if (idUserDelete) {
      const res = await deleteUserApi(idUserDelete);
      const resData = await res.data;
      if (resData.success) {
        deleteUser(idUserDelete);
        toast.success("Delete user success", {
          icon: "🦄",
        });
      } else {
        toast.error(resData.message, {
          icon: "🦄",
        });
      }
    }
    setIsOpenDialog(false);
  };

  return (
    <div className="h-[600px] p-[20px]">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={allUser}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
      <Dialog
        open={isOpenDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This user will be deleted, and all data will be lost...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={submitDeleteUser} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
