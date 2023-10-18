import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, Disc } from '../App';
import '../styles/Inventory.css'; // Import the CSS file
import { DateTime } from 'luxon';
import { Box, CircularProgress, Divider, FormControl, FormControlLabel, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, TextField, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditDialog from './EditDialog';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import BackToTopButton from './BackToTopButton';
import PullToRefresh from 'react-simple-pull-to-refresh';



// Define a type for row IDs, assuming it's a number
type RowId = number;

function Inventory() {
    const [inventory, setInventory] = useState<Disc[]>([]); // Provide the type 'Disc[]'
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInventory, setFilteredInventory] = useState(inventory); // Initialize with inventory data
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [claimedDisc, setClaimedDisc] = useState<number>(0); // Provide the type 'Disc | null'
    const [sortOption, setSortOption] = useState<keyof Disc>('pickupDeadline'); // Set initial sort option
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Set initial sort direction to DESC
    const [expandedRows, setExpandedRows] = useState<RowId[]>([]);
    const [showPastDeadlines, setShowPastDeadlines] = useState(false);
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const [refreshing, setRefreshing] = useState(false);

    // const handleRefresh = useCallback(() => {
    //   getInventory();
    //   setRefreshing(false);
    // }, []);

    const handleRefresh = async () => {
      getInventory();
    }
    
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

    const getInventory = () => {
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
          //console.log('Inventory:', convertedInventory);
    
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
      
          // setFilteredInventory(filtered);
          const filteredInventory = sortedInventory.filter((disc: Disc) => {
            const isMatch =
              disc.phoneNumber.includes(searchQuery) ||
              disc.disc.includes(searchQuery) ||
              disc.name.includes(searchQuery) ||
              disc.comments?.includes(searchQuery);
          
            // Check if the user wants to see past deadlines and if the pickupDeadline is in the past
            if (showPastDeadlines) {
              return isMatch && (!disc.pickupDeadline || new Date(disc.pickupDeadline) < new Date());
            } else {
              return isMatch;
            }
          });
          
          setFilteredInventory(filteredInventory);
        })
        .catch((error) => {
          console.error('Error fetching inventory:', error);
        });
      };

    useEffect(() => {
      getInventory();
    }, [searchQuery, showPastDeadlines, sortDirection, sortOption]);

    const markAsClaimed = (discId: string) => {
      setIsLoading(true); // Set loading state to true
    
      axios.put(`${API_BASE_URL}/api/mark-claimed/${discId}`)
        .then((response) => {
          //console.log('Disc marked as claimed:', response.data);
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
            //console.log('Disc updated:', response.data);
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

    // const handleSort = (event: SelectChangeEvent<string>) => {
    //   const selectedOption = event.target.value as keyof Disc;
    //   console.log('Selected Option:', selectedOption);
    //   setSortOption(selectedOption);
    // };
    
    // const handleSortDirectionChange = (event: SelectChangeEvent<string>) => {
    //   const selectedDirection = event.target.value as 'asc' | 'desc';
    //   console.log('Selected Direction:', selectedDirection);
    //   setSortDirection(selectedDirection);
    // };

    const toggleShowPastDeadlines = () => {
      setShowPastDeadlines(!showPastDeadlines);
    };

    const markAsFiveDollarBox = (discId: string) => {
      setIsLoading(true);
      console.log("Marking as $5 Box");
    
      // Make an API call to mark the disc as a $5 Box
      axios.put(`${API_BASE_URL}/api/change-status/${discId}`) 
        .then((response) => {
          //console.log('Disc marked as $5 Box:', response.data);
          setIsLoading(false);
          setSuccessMessage('Disc is now in the $5 Box');
          setClaimedDisc(parseInt(discId));
        })
        .catch((error) => {
          console.error('Error marking disc as $5 Box:', error);
          setIsLoading(false);
          setSuccessMessage('Error marking disc as $5 Box');
        });
    };
    

    const formatPhoneNumber = (phoneNumber: string) => {
      // Assuming phoneNumber is in the format "1234567890"
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    };

    const handleSort = (selectedOption: keyof Disc) => {
      if (selectedOption === sortOption) {
        // Toggle sort direction
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortDirection('asc'); // Default to ascending if a new option is selected
      }
      setSortOption(selectedOption);
    };

    // Define a function to render the header with sorting indicator
    const renderColumnHeader = (column: keyof Disc, label: string) => {
      const isSorted = column === sortOption;
      const isAscending = sortDirection === 'asc';
      const arrow = isSorted ? (isAscending ? '▲' : '▼') : null;

      return (
        <th className="table-header" onClick={() => handleSort(column)}>
          {label} {arrow}
        </th>
      );
    };
    
    

  return (
    <PullToRefresh className="ptr-override" onRefresh={handleRefresh}> 
      <div className="page-container"> 
        <div className="col-center">
          {/* <h1>Inventory</h1> */}
          <div className={isMobile? "column" : "row"}>
            <Paper component="form" sx={{ p: '2px 4px', marginRight: "15px", marginLeft: "15px", display: 'flex', alignItems: 'center', marginTop: "5px", width: isMobile? "300px" : "700px" }}>
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "12px" }}
                placeholder="Search by disc, name, or last 4 digits of your phone number"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                type="text"
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            {/* <Box className="sort-options" sx={{ marginTop: isMobile? "15px" : "0px" }}> */}
              {/* <FormControl sx={{ marginRight: "15px", marginLeft: "15px"}}>
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
              </FormControl> */}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={showPastDeadlines}
                    onChange={toggleShowPastDeadlines}
                    color="primary"
                  />
                }
                label="Show Expired Pickups"
              />
            </Box> */}
          </div>
        </div>
        <div className="container">
          <div className="inventory-count">Total Discs: {filteredInventory.length}</div>
          <table className="inventory-table" style={{ tableLayout: 'fixed' }}> 
            <colgroup>
              <col style={{ width: '8%' }} />
              <col style={{ width: '21%' }} /> {/* Adjust the width as needed */}
              <col style={{ width: '21%' }} /> {/* Adjust the width as needed */}
              <col style={{ width: '25%' }} /> {/* Adjust the width as needed */}
              <col style={{ width: '25%' }} /> {/* Adjust the width as needed */}
            </colgroup>
            <thead>
              <tr>
                <th className="table-header"> </th>
                {/* <th className="table-header">ID</th>  */}
                {/* <th className="table-header">Name</th>  */}
                {/* <th className="table-header">Color</th> 
                <th className="table-header">Bin</th> 
                <th className="table-header">Date Found</th> 
                <th className="table-header">Comments</th>  */}

                {renderColumnHeader('name', 'Name')}
                {/* {renderColumnHeader('name', 'Phone Number')} */}
                {/* <th className="table-header">Phone Number</th>  */}
                {renderColumnHeader('disc', 'Disc')}
                {renderColumnHeader('dateFound', 'Date Found')}
                {renderColumnHeader('pickupDeadline', 'Pickup Deadline')}
                
                {/* 
                <th className="table-header">Disc</th> 
                
                <th className="table-header">Actions</th>  */}
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((disc) => (
                <React.Fragment key={disc.id}>
                  <tr onClick={() => toggleRow(disc.id!)} className={new Date(disc.pickupDeadline!) < new Date() ? 'past-deadline-row' : ''}>
                    <td className="table-cell">{expandedRows.includes(disc.id!) ? '▼' : '▶'}</td>
                    {/* <td className="table-cell">{disc.id}</td> */}
                    <td className="table-cell">{disc.name}</td>
                    {/* <td className="table-cell">{formatPhoneNumber(disc.phoneNumber)}</td> */}
                    <td className="table-cell">{disc.disc}</td>
                    <td className="table-cell">{disc.dateFound}</td>
                    <td className="table-cell">{disc.pickupDeadline}</td>
                    <td className="table-cell">
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
                              defaultValue={formatPhoneNumber(disc.phoneNumber)}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                disc.phoneNumber = e.target.value;
                                  setEditedDisc({ ...disc, phoneNumber: e.target.value });
                                }}
                            />
                            ) : (
                              <p><strong>Phone Number: </strong>{formatPhoneNumber(disc.phoneNumber)}</p>
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
                            {/* {editedDiscID === disc.id ? (
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
                            ) : ( */}
                              <p><strong>Status: </strong>{disc.status}</p>
                             {/* )} */}
                          </div>
                          <div className="row">
                            {/* {editedDiscID === disc.id ? (
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
                            ) : ( */}
                              <p><strong>Pickup Deadline: </strong>{disc.pickupDeadline}</p>
                            {/* )} */}
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
                          {isLoading ? (
                    <div><CircularProgress/></div>
                    ) : (
                      <div>
                        {disc.id !== claimedDisc ? (
                          // Check if the pickup deadline is in the past
                          new Date(disc.pickupDeadline!) < new Date() ? (
                            <button className="button" onClick={() => markAsFiveDollarBox(disc.id!.toString())}>
                              Move to $5 Box
                            </button>
                            // <button className="button" onClick={() => markAsClaimed(disc.id!.toString())}>
                            //   Mark as Claimed
                            // </button>
                          ) : (
                            <button className="button" onClick={() => markAsClaimed(disc.id!.toString())}>
                              Mark as Claimed
                            </button>
                          )
                        ) : null}
                      </div>
                    )}
                    {successMessage && disc.id===claimedDisc && <div className="success-message">{successMessage}</div>}
                          
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <BackToTopButton />
        </div>
      </div>
    </PullToRefresh>
  );
}

export default Inventory;
