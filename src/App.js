import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"


function MyGrid ( props ) {


  
  return (
    <div className='grid-col'>
      
      {
        props.grid.map(
          (roww, idx) => {
            return (
              <div className='grid-row'>
                {
                  roww.map(
                    (cell, idx) => {
                      return (
                        <div className='grid-cell'>
                          {cell}
                        </div>
                      )
                    }
                  )
                }
              </div>
            )
          }
        
          
        )
      }
    </div>
  )
}

function App() {

  
  const [dim, setDim] = useState(4)

  let newGrid = []
  for(let i = 0; i < dim; i++){
    let row = []
    for(let j = 0; j < dim; j++){
      row.push(0)
    }
    newGrid.push(row)
  }

  const [grid, setGrid] = useState(newGrid)

  useEffect( () => {
    // initialize a dim x dim grid
    console.log("grid")
    let newGrid = []
    for(let i = 0; i < dim; i++){
      let row = []
      for(let j = 0; j < dim; j++){
        row.push(0)
      }
      newGrid.push(row)
    }
    
    setGrid(updateGridWithRandom(newGrid));
  }, [dim])

  // useEffect( () => {
  //   console.log("grid")
  //   console.log(grid)
  // }, [grid])

  const handleDimSubmit = (event) => {
    event.preventDefault()
    setDim(event.target.name.value)
  }

  const generateRandom = (max) => {
    let rand = Math.floor(Math.random() * max)
    return rand
  }

  const updateGridWithRandom = (grid) => {
    // only update if there is a 0
    const arr = [];

    for (let i = 0; i < dim; i++){
      for (let j = 0; j < dim; j++){
        if(grid[i][j] === 0){
          arr.push([i, j])
        }
      }
    }
    let randPos = arr[generateRandom(arr.length)];
    let randVal = Math.random() < 0.5 ? 2 : 4;
    let newGrid = [...grid];
    newGrid[randPos[0]][randPos[1]] = randVal;
    return newGrid;
  }
    

  
  const handleKeyDown = (event) => {
    event.preventDefault();

    const tempGrid = grid;
    if(event.key === 'ArrowUp'){
      console.log("up")
      for (let i = 0; i < dim; i++){
        for (let j = 0; j < dim; j++){
          if(grid[i][j] !== 0){
            let k = i;
            while(k > 0 && grid[k - 1][j] === 0){
              tempGrid[k - 1][j] = grid[k][j];
              tempGrid[k][j] = 0;
              k--;
            }
            if(k > 0 && grid[k - 1][j] === grid[k][j]){
              tempGrid[k - 1][j] = grid[k][j] * 2;
              tempGrid[k][j] = 0;
            }
          }
        }
      }
    }
    else if(event.key === 'ArrowDown'){
      console.log("down")
      for (let i = dim - 1; i >= 0; i--){
        for (let j = 0; j < dim; j++){
          if(grid[i][j] !== 0){
            let k = i;
            while(k < dim - 1 && grid[k + 1][j] === 0){
              tempGrid[k + 1][j] = grid[k][j];
              tempGrid[k][j] = 0;
              k++;
            }
            if(k < dim - 1 && grid[k + 1][j] === grid[k][j]){
              tempGrid[k + 1][j] = grid[k][j] * 2;
              tempGrid[k][j] = 0;
            }
          }
        }
      }
    }
    else if(event.key === 'ArrowLeft'){
      console.log("left")
      for (let i = 0; i < dim; i++){
        for (let j = 0; j < dim; j++){
          if(grid[i][j] !== 0){
            let k = j;
            while(k > 0 && grid[i][k - 1] === 0){
              tempGrid[i][k - 1] = grid[i][k];
              tempGrid[i][k] = 0;
              k--;
            }
            if(k > 0 && grid[i][k - 1] === grid[i][k]){
              tempGrid[i][k - 1] = grid[i][k] * 2;
              tempGrid[i][k] = 0;
            }
          }
        }
      }
    }
    else if(event.key === 'ArrowRight'){
      console.log("right")
      for (let i = 0; i < dim; i++){
        for (let j = dim - 1; j >= 0; j--){
          if(grid[i][j] !== 0){
            let k = j;
            while(k < dim - 1 && grid[i][k + 1] === 0){
              tempGrid[i][k + 1] = grid[i][k];
              tempGrid[i][k] = 0;
              k++;
            }
            if(k < dim - 1 && grid[i][k + 1] === grid[i][k]){
              tempGrid[i][k + 1] = grid[i][k] * 2;
              tempGrid[i][k] = 0;
            }
          }
        }
      }
    }
    // console.log(tempGrid)

    setGrid(updateGridWithRandom(tempGrid))

  }

  

  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
      <h1> {`${dim} dim`} 2048</h1>

      <div className='set-dim-container'>
        <form onSubmit={handleDimSubmit}>
          <label>
            Set dimensions: 
            
          </label>
          <input type="text" name="name" />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className='grid-contianer'>
        
        <MyGrid grid={grid}></MyGrid>
      </div>

      

    </div>
  );
}

export default App;
