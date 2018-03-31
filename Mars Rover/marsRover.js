var rover1 = {
  direction: "N",
  row: 0,
  col: 0,
  travelLog: []
};

var rover2 = {
  direction: "N",
  row: 1,
  col: 0,
  travelLog: []
};

var rover3 = {
  direction: "N",
  row: 2,
  col: 0,
  travelLog: []
};

const validInput = new Set(["f", "r", "l", "b"]);

maze = [[false, true, true, true, true, true, false, true, true, true],
        [false, true, false, true, true, true, false, true, true, true],
        [false, true, true, true, true, true, false, true, true, true],
        [true, true, true, true, false, true, true, true, false, true],
        [true, true, true, true, true, true, true, true, false, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, false, false, false, false, true, true, true, true, true],
        [true, true, false, true, true, true, true, true, false, true],
        [true, false, true, true, true, true, true, true, false, true],
        [true, true, true, true, true, true, true, true, false, true]
      ];

function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction){
    case "N":
      rover.direction = "W";
      break;

    case "E":
      rover.direction = "N";
      break;

    case "S":
      rover.direction = "E";
      break;

    default:
      rover.direction = "S";
  }
  console.log(rover.direction);
}

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction){
    case "N":
      rover.direction = "E";
      break;

    case "E":
      rover.direction = "S";
      break;

    case "S":
      rover.direction = "W";
      break;

    default:
      rover.direction = "N";
  }
  console.log(rover.direction);
}


function try_walk(rover, row, col){
  if (0 <= row < 10 && 0 <= col < 10){
    if (maze[row][col]){
      rover.row = row;
      rover.col = col;
      return true;
    }
  }
  return false;
}

function moveForward(rover){
  switch (rover.direction){
    case "N":
      if (try_walk(rover, rover.row - 1, rover.col)){
        rover.travelLog.push([rover.row + 1, rover.col]);
        maze[rover.row + 1][rover.col] = true;
        maze[rover.row][rover.col] = false;
      }
      else
        console.log("Obstacle or Rover in the way");
      break;
        
    case "E":
      if (try_walk(rover, rover.row, rover.col + 1)){
        rover.travelLog.push([rover.row, rover.col - 1]);
        maze[rover.row][rover.col - 1] = true;
        maze[rover.row][rover.col] = false;
      }
      else
        console.log("Obstacle or Rover in the way");
      break;
        
    case "S":
      if (try_walk(rover, rover.row + 1, rover.col)){
        rover.travelLog.push([rover.row - 1, rover.col]);
        maze[rover.row - 1][rover.col] = true;
        maze[rover.row][rover.col] = false;
      }
      else
        console.log("Obstacle or Rover in the way");
      break;
        
    default:
      if (try_walk(rover, rover.row, rover.col - 1)){
        rover.travelLog.push([rover.row, rover.col + 1]);
        maze[rover.row][rover.col + 1] = true;
        maze[rover.row][rover.y] = false;
      }
      else
        console.log("Obstacle or Rover in the way");
  }
  
  console.log(rover.row, rover.col);
}

function movingBackwards(rover){
  switch (rover.direction){
    case "N":
      rover.direction = "S";
      moveForward(rover);
      rover.direction = "N";
      break;

    case "E":
      rover.direction = "W";
      moveForward(rover);
      rover.direction = "E";
      break;

    case "S":
      rover.direction = "N";
      moveForward(rover);
      rover.direction = "S";
      break;

    default:
      rover.direction = "E";
      moveForward(rover);
      rover.direction = "W";
  }
}

function commands(orders, rover){
  for (var i = 0; i < orders.length; i++){
    if (validInput.has(orders[i])){
      switch (orders[i]){
        case "f":
          moveForward(rover);
          break;

        case "l":
          turnLeft(rover);
          break;

        case "b":
          movingBackwards(rover);
          break;

        default:
          turnRight(rover);
      }
    }
    
    else{
      console.log("Invalid command: " + orders[i]);
      break;
    }
  }
  console.log(rover.travelLog);
}

// Small test
commands("rfflbrfbil", rover1);
