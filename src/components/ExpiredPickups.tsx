import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, Disc } from '../App';
import '../styles/Inventory.css'; // Import the CSS file
import { DateTime } from 'luxon';
import { CircularProgress, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditDialog from './EditDialog';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material';


// Define a type for row IDs, assuming it's a number
type RowId = number;

function ExpiredPickups() {
    const [inventory, setInventory] = useState<Disc[]>([]); // Provide the type 'Disc[]'
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInventory, setFilteredInventory] = useState(inventory); // Initialize with inventory data
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [claimedDisc, setClaimedDisc] = useState<number>(0); // Provide the type 'Disc | null'
    const [sortOption, setSortOption] = useState<keyof Disc>('dateFound'); // Default sorting option
    const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction
    const [expandedRows, setExpandedRows] = useState<RowId[]>([]);


    const toggleRow = (rowId: RowId) => {
      if (expandedRows.includes(rowId)) {
        setExpandedRows(expandedRows.filter((id) => id !== rowId));
      } else {
        setExpandedRows([...expandedRows, rowId]);
      }
    };

    const convertToEST = (utcTimestamp: string) => {
      const dateUTC = DateTime.fromISO(utcTimestamp, { zone: 'utc' });
      // const dateEST = dateUTC.setZone('America/New_York');
      
      // Format the date to display only the date (without time)
      //return dateEST.toFormat('yyyy-MM-dd');
      return dateUTC.toFormat('yyyy-MM-dd');
    };

    useEffect(() => {
      axios.get(`${API_BASE_URL}/api/inventory`)
        .then((response) => {
          // Convert UTC timestamps to EST
          const convertedInventory = response.data.map((disc: Disc) => ({
            ...disc,
            dateFound: convertToEST(disc.dateFound),
            dateTexted: disc.dateTexted ? convertToEST(disc.dateTexted) : null,
            dateClaimed: disc.dateClaimed ? convertToEST(disc.dateClaimed) : null,
            pickupDeadline: disc.pickupDeadline ? convertToEST(disc.pickupDeadline) : null,
          }));
          console.log('Inventory:', convertedInventory);
    
          setInventory(convertedInventory);

          const sortedInventory = [...convertedInventory].sort((a: Disc, b: Disc) => {
            const aValue = a[sortOption] as string; // Cast to string
            const bValue = b[sortOption] as string; // Cast to string
          
            if (sortDirection === 'asc') {
              return aValue.localeCompare(bValue);
            } else {
              return bValue.localeCompare(aValue);
            }
          });
    
          // Filter the inventory based on the search query
          const filtered = sortedInventory.filter((disc: Disc) =>
            disc.phoneNumber.includes(searchQuery) ||
            disc.disc.includes(searchQuery) ||
            disc.name.includes(searchQuery) ||
            disc.comments?.includes(searchQuery)
          );
    
          setFilteredInventory(filtered);
        })
        .catch((error) => {
          console.error('Error fetching inventory:', error);
        });
    }, [searchQuery, sortDirection, sortOption]);

    const markAsClaimed = (discId: string) => {
      setIsLoading(true); // Set loading state to true
    
      axios.put(`${API_BASE_URL}/api/mark-claimed/${discId}`)
        .then((response) => {
          console.log('Disc marked as claimed:', response.data);
          setIsLoading(false); // Set loading state to false
          setSuccessMessage('Disc claimed successfully'); // Set success message
          setClaimedDisc(parseInt(discId)); // Set claimedDisc to the ID of the disc being marked as claimed
        })
        .catch((error) => {
          console.error('Error marking disc as claimed:', error);
          setIsLoading(false); // Set loading state to false in case of an error
          setSuccessMessage('Error marking disc as claimed'); // Set error message
        });
    };

    const [editedDiscID, setEditedDiscID] = useState<number>(-1);
    const [editedDisc, setEditedDisc] = useState<Disc | null>(null);

    const startEditing = (disc: Disc) => {
      setEditedDisc(disc);
      setEditedDiscID(disc.id!);
    };

    const stopEditing = () => {
      saveEditedDisc(editedDisc!);
    };

    const saveEditedDisc = (editedDiscIn: Disc) => {
      if (editedDiscIn) {
        axios.put(`${API_BASE_URL}/api/edit-disc/${editedDiscIn.id}`, editedDiscIn)
          .then((response) => {
            console.log('Disc updated:', response.data);
            // Refresh the inventory or handle success as needed
          })
          .catch((error) => {
            console.error('Error updating disc:', error);
            // Handle error or display an error message
          });
      }
      setEditedDisc(null);
      setEditedDiscID(-1);
    };

    const handleSort = (event: SelectChangeEvent<string>) => {
      const selectedOption = event.target.value as keyof Disc;
      console.log('Selected Option:', selectedOption);
      setSortOption(selectedOption);
    };
    
    const handleSortDirectionChange = (event: SelectChangeEvent<string>) => {
      const selectedDirection = event.target.value as 'asc' | 'desc';
      console.log('Selected Direction:', selectedDirection);
      setSortDirection(selectedDirection);
    };
    

  return (
    <div className="page-container"> 
      <div className="col-center">
        {/* <h1>Inventory</h1> */}
        <div className="row">
          <Paper component="form" sx={{ p: '2px 4px', marginRight: "15px", marginLeft: "15px", display: 'flex', alignItems: 'center', marginTop: "5px", width: 300 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by phone number, disc, or name"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div className="sort-options">
            <FormControl sx={{ marginRight: "15px", marginLeft: "15px"}}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={handleSort}>
                <MenuItem value="dateFound">Date Found</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="pickupDeadline">Pickup Deadline</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ marginRight: "15px", marginLeft: "15px"}}>
              <InputLabel>Sort Direction</InputLabel>
              <Select value={sortDirection} onChange={handleSortDirectionChange}>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
    </div>
    <div className="container">
      <table className="inventory-table"> 
        <thead>
          <tr>
            <th className="table-header"> </th>
            {/* <th className="table-header">ID</th>  */}
            <th className="table-header">Name</th> 
            <th className="table-header">Phone Number</th> 
            <th className="table-header">Disc</th> 
            {/* <th className="table-header">Color</th> 
            <th className="table-header">Bin</th> 
            <th className="table-header">Date Found</th> 
            <th className="table-header">Comments</th>  */}
            <th className="table-header">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((disc) => (
            <React.Fragment key={disc.id}>
              <tr onClick={() => toggleRow(disc.id!)}>
                <td className="table-cell">{expandedRows.includes(disc.id!) ? '▼' : '▶'}</td>
                {/* <td className="table-cell">{disc.id}</td> */}
                <td className="table-cell">{disc.name}</td>
                <td className="table-cell">{disc.phoneNumber}</td>
                <td className="table-cell">{disc.disc}</td>
                <td className="table-cell">
                {isLoading ? (
                <div><CircularProgress/></div>
                ) : (
                    <div>
                      
                        {disc.id!==claimedDisc && <button className="button" onClick={() => markAsClaimed(disc.id!.toString())}>Mark as Claimed</button>}
                    </div>
                    )}
                {successMessage && disc.id===claimedDisc && <div className="success-message">{successMessage}</div>}
              </td>
              </tr>
              {/* Additional details row */}
              {expandedRows.includes(disc.id!) && (
                <tr>
                  <td colSpan={8}> {/* Use appropriate colspan */}
                    <div>
                      {/* Display all fields related to the disc here */}
                      {editedDiscID===disc.id
                      ? <SaveOutlinedIcon sx={{ cursor: "pointer", marginRight: "10px"}} onClick={stopEditing}></SaveOutlinedIcon>
                      : <EditOutlinedIcon sx={{ cursor: "pointer"}} onClick={() => startEditing(disc)}></EditOutlinedIcon>
                      }
                      <p><strong>ID:</strong> {disc.id}</p>
                      <p><strong>Course: </strong>{disc.course}</p>
                      <div>
                        {editedDiscID === disc.id ? (
                          <TextField
                          id="outlined-uncontrolled"
                          sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                          label="Name"
                          defaultValue={disc.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.name = e.target.value;
                              setEditedDisc({ ...disc, name: e.target.value });
                            }}
                        />
                        ) : (
                          <p><strong>Name: </strong>{disc.name}</p>
                        )}
                      </div>
                      <div>
                        {editedDiscID === disc.id ? (
                          <TextField
                          id="outlined-uncontrolled"
                          sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                          label="Phone Number"
                          defaultValue={disc.phoneNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            disc.phoneNumber = e.target.value;
                              setEditedDisc({ ...disc, phoneNumber: e.target.value });
                            }}
                        />
                        ) : (
                          <p><strong>Phone Number: </strong>{disc.phoneNumber}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Disc Name"
                            defaultValue={disc.disc}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.disc = e.target.value;
                              setEditedDisc({ ...disc, disc: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Disc: </strong>{disc.disc}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Color"
                            defaultValue={disc.color}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.color = e.target.value;
                              setEditedDisc({ ...disc, color: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Color: </strong>{disc.color}</p>
                        )}
                      </div>
                      <div>
                        {editedDiscID === disc.id ? (
                          <TextField
                          id="outlined-uncontrolled"
                          sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                          label="Bin"
                          defaultValue={disc.bin}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            disc.bin = e.target.value;
                            setEditedDisc({ ...disc, bin: e.target.value });
                            }}
                        />
                        ) : (
                          <p><strong>Bin: </strong>{disc.bin}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Date Found"
                            defaultValue={disc.dateFound}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.dateFound = e.target.value;
                              setEditedDisc({ ...disc, dateFound: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Date Found: </strong>{disc.dateFound}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Date Texted"
                            defaultValue={disc.dateTexted}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.dateTexted = e.target.value;
                              setEditedDisc({ ...disc, dateTexted: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Date Texted: </strong>{disc.dateTexted}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Date Claimed"
                            defaultValue={disc.dateClaimed}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.dateClaimed = e.target.value;
                              setEditedDisc({ ...disc, dateClaimed: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Date Claimed: </strong>{disc.dateClaimed}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Status"
                            defaultValue={disc.status}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.status = e.target.value;
                              setEditedDisc({ ...disc, status: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Status: </strong>{disc.status}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Pickup Deadline"
                            defaultValue={disc.pickupDeadline}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.pickupDeadline = e.target.value;
                              setEditedDisc({ ...disc, pickupDeadline: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Pickup Deadline: </strong>{disc.pickupDeadline}</p>
                        )}
                      </div>
                      <div className="row">
                        {editedDiscID === disc.id ? (
                          <TextField
                            id="outlined-uncontrolled"
                            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}
                            label="Comments"
                            defaultValue={disc.comments}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              disc.comments = e.target.value;
                              setEditedDisc({ ...disc, comments: e.target.value });
                              }}
                          />
                        ) : (
                          <p><strong>Comments: </strong>{disc.comments}</p>
                        )}
                      </div>
                      
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
        {/* <tbody>
            {filteredInventory.map((disc: Disc) => (
            <tr key={disc.id}>
              {editedDiscID===disc.id
              ? <td className="table-cell"><SaveOutlinedIcon sx={{ cursor: "pointer"}} onClick={stopEditing}></SaveOutlinedIcon></td>
              : <td className="table-cell"><EditOutlinedIcon sx={{ cursor: "pointer"}} onClick={() => startEditing(disc)}></EditOutlinedIcon></td>
              }
              <td className="table-cell">{disc.id}</td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="text"
                    value={disc.name}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.name = e.target.value;
                      setEditedDisc({ ...disc, name: e.target.value });
                    }}
                  />
                ) : (
                  disc.name
                )}
              </td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="number"
                    value={disc.phoneNumber}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.phoneNumber = e.target.value;
                      setEditedDisc({ ...disc, phoneNumber: e.target.value });
                    }}
                  />
                ) : (
                  disc.phoneNumber // Display text when not editing
                )}
              </td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="text"
                    value={disc.disc}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.disc = e.target.value;
                      setEditedDisc({ ...disc, disc: e.target.value });
                    }}
                  />
                ) : (
                  disc.disc // Display text when not editing
                )}
              </td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="text"
                    value={disc.color}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.color = e.target.value;
                      setEditedDisc({ ...disc, color: e.target.value });
                    }}
                  />
                ) : (
                  disc.color // Display text when not editing
                )}
              </td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="text"
                    value={disc.bin}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.bin = e.target.value;
                      setEditedDisc({ ...disc, bin: e.target.value });
                    }}
                  />
                ) : (
                  disc.bin // Display text when not editing
                )}
              </td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="date"
                    value={disc.dateFound}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.dateFound = e.target.value;
                      setEditedDisc({ ...disc, dateFound: e.target.value });
                    }}
                  />
                ) : (
                  disc.dateFound // Display text when not editing
                )}
              </td>
              <td className="table-cell">
                {editedDiscID === disc.id ? (
                  <input
                    type="text"
                    value={disc.comments!}
                    style={{ width: '90%' }}
                    onChange={(e) => {
                      disc.comments = e.target.value;
                      setEditedDisc({ ...disc, comments: e.target.value });
                    }}
                  />
                ) : (
                  disc.comments // Display text when not editing
                )}
              </td>
              <td className="table-cell">
                {isLoading ? (
                <div><CircularProgress/></div>
                ) : (
                    <div>
                        {disc.id!==claimedDisc && <button className="button" onClick={() => markAsClaimed(disc.id!.toString())}>Mark as Claimed</button>}
                    </div>
                    )}
                {successMessage && disc.id===claimedDisc && <div className="success-message">{successMessage}</div>}
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
    </div>
  );
}

export default ExpiredPickups;
