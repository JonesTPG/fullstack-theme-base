/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PasswordDialog from './PasswordDialog';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
  { title: 'Email / Username', field: 'username' },
  { title: 'Name', field: 'firstName' },
  { title: 'Surname', field: 'lastName' },
  { title: 'Dark Theme', field: 'darkTheme' },
  { title: 'Roles', field: 'roles' }
];

const UserTable = ({ users, addUser, editUser, removeUser }) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const handleClose = e => {
    e.preventDefault();
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSign = value => {
    addUser({
      variables: {
        ...data,
        password: value,
        darkTheme: data.darkTheme === 'true' ? true : false
      }
    });
    setData(null);
    setOpen(false);
  };
  return (
    <div style={{ maxWidth: '100%' }}>
      {open && (
        <PasswordDialog
          open={open}
          handleSign={handleSign}
          handleClose={handleClose}
        />
      )}
      <MaterialTable
        icons={tableIcons}
        title="Registered Users"
        columns={columns}
        data={users}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              handleOpen();
              setData(newData);
              setTimeout(() => {
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  editUser({
                    variables: { ...newData }
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                removeUser({
                  variables: { ...oldData }
                });
              }, 600);
            })
        }}
      />
    </div>
  );
};

export default UserTable;
