import React, {  useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const TodoItems = ({setTodos,todos}) => {


        // const [sortedData,setSortedData] = useState([todos])
  
    
    //  console.log(sortedData,'sorted')
    const handleChange = (item) => {
          let payload ={
            ...item,
            status:!item.status
          } 
          updateTodos(item.id,payload)
        }

    const updateTodos =(id,payload)=>{
        axios.patch(`http://localhost:8080/todo/${id}`,payload)
       .then(res=>{
          console.log(res );
          setTodos(prev=>{
            return prev.map(item=>item.id === id? res.data : item)
          })
       })
       .catch(err=>{
        console.log(err)
       })

    }


    const handleDelete=(id)=>{
      axios.delete(`http://localhost:8080/todo/${id}`)
      .then(res=>{
        setTodos(prev=>{
          return prev.filter(item=>item.id !== id)
        })
      })
      .catch(err=>{
       console.log(err)
      })
    }

    
    const handleSort=()=>{
     
    }




  return (
    < >
      <Box width={"70%"} margin={"auto"} mt={"20px"}>
      <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Todo Tasks</StyledTableCell>
            <StyledTableCell align="left">Status<IconButton color='primary' onClick={handleSort}><ImportExportIcon/></IconButton></StyledTableCell>
            <StyledTableCell align="left">Complete</StyledTableCell>
            <StyledTableCell align="left">Delete</StyledTableCell>
            
          </TableRow>
        </TableHead>   
        <TableBody >
            {
                todos?.map(item=>(
                    <TableRow  key={item.id}>
                            <StyledTableCell style={{textDecoration:!item.status?"none":"line-through"}} align="left">{item.title}</StyledTableCell>
                            <StyledTableCell align="left">{item.status?"Complete":"Not Complete"}</StyledTableCell>
                            <StyledTableCell align="left"><Button onClick={()=>handleChange(item)}>{item.status?"inComplete":"Complete"}</Button></StyledTableCell>
                            <StyledTableCell align="left"><Button onClick={()=>handleDelete(item.id)}>Delete</Button></StyledTableCell>
                     </TableRow> 
                )
                ).reverse()
            }
            </TableBody>
        
      </Table>
    </TableContainer>
    </Box>
    </>
  )
}

export default TodoItems