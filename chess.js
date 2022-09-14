const h = getHeight();
const w = getWidth();
let unit;
if (h > w) unit = "vw";
else unit = "vh";

class Board {
  constructor(piecesPreset = false, render = true) {
    this.pieces = { white: [], black: [] };
    this.checkmateMoves = { white: [], black: [] };
    this.colorScheme = {
      even: "#a3a3a3",
      odd: "#575757"
    };
    if (render) {
      this.element = new Element("div", {
        styles: {
          position: "relative",
          height: `calc(8 * (50${unit} / 8))`,
          width: `calc(8 * (50${unit} / 8))`
        }
      })
      this.squares = {};
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (!this.squares[x]) {
            this.squares[x] = {};
          }
          this.squares[x][y] = new Square(x, y, this);
        }
      }
    }
    if (piecesPreset) {
      for (const color of ["black", "white"]) {
        for (const piece of piecesPreset[color]) {
          switch (piece.name) {
            case "Pawn":
              new Pawn(piece.x, piece.y, color, this);
              break;
            case "Rook":
              new Rook(piece.x, piece.y, color, this);
              break;
            case "Knight":
              new Knight(piece.x, piece.y, color, this);
              break;
            case "Bishop":
              new Bishop(piece.x, piece.y, color, this);
              break;
            case "King":
              new King(piece.x, piece.y, color, this);
              break;
            case "Queen":
              new Queen(piece.x, piece.y, color, this);
              break;
            default:
              throw "undefined piece type.";
          }
        }
      }
    } else {
      new Pawn(0, 1, "black", this);
      new Pawn(1, 1, "black", this);
      new Pawn(2, 1, "black", this);
      new Pawn(3, 1, "black", this);
      new Pawn(4, 1, "black", this);
      new Pawn(5, 1, "black", this);
      new Pawn(6, 1, "black", this);
      new Pawn(7, 1, "black", this);
      new Rook(0, 0, "black", this);
      new Knight(1, 0, "black", this);
      new Bishop(2, 0, "black", this);
      new King(3, 0, "black", this);
      new Queen(4, 0, "black", this);
      new Bishop(5, 0, "black", this);
      new Knight(6, 0, "black", this);
      new Rook(7, 0, "black", this);

      new Pawn(0, 6, "white", this);
      new Pawn(1, 6, "white", this);
      new Pawn(2, 6, "white", this);
      new Pawn(3, 6, "white", this);
      new Pawn(4, 6, "white", this);
      new Pawn(5, 6, "white", this);
      new Pawn(6, 6, "white", this);
      new Pawn(7, 6, "white", this);
      new Rook(0, 7, "white", this);
      new Knight(1, 7, "white", this);
      new Bishop(2, 7, "white", this);
      new King(3, 7, "white", this);
      new Queen(4, 7, "white", this);
      new Bishop(5, 7, "white", this);
      new Knight(6, 7, "white", this);
      new Rook(7, 7, "white", this);
    }
  }
  listAllValidMoves(color) {
    const pieces = this.pieces;
    const checkmateMoves = [];
    const allMoves = [];
    for (const piece of pieces[color]) {
      for (const move of piece.listValidMoves()) {
        if (move.collisionEnemy.name == "King") checkmateMoves.push(move);
        allMoves.push(move);
      }
    }

    if (checkmateMoves.length > 0) {
      this.checkmateMoves[color] = checkmateMoves;
      return checkmateMoves;
    }
    this.checkmateMoves[color] = false;
    return allMoves;
  }
  clone(render) {
    return new Board(this.pieces, render);
  }
}

class Square {
  constructor(x, y, board) {
    this.board = board;
    this.x = x;
    this.y = y;
    if (isEven(x + y)) this.color = this.board.colorScheme.even;
    else this.color = this.board.colorScheme.odd;
    if (this.board.element) {
      this.element = new Element("div", {
        styles: {
          "background-color": this.color,
          position: "absolute",
          top: `calc(${y} * (50${unit} / 8))`,
          left: `calc(${x} * (50${unit} / 8))`,
          width: `calc(50${unit} / 8)`,
          height: `calc(50${unit} / 8)`
        },
        actions: {
          highlight: (self) => {
            self.style("background-color", "#66b367");
          },
          unhighlight: (self) => {
            self.style("background-color", this.color);
          }
        }
      }).appendTo(this.board.element);
    }
  }
}

class Piece {
  constructor(x, y, color, iconClass, name, board) {
    this.board = board;
    this.name = name;
    this.x = x;
    this.y = y;
    this.board.pieces[color].push(this);
    this.color = color;
    if (this.board.element) {
      this.element = new Element("div", {
        styles: {
          transition: "top 0.3s, left 0.3s",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          width: `calc(50${unit} / 8)`,
          height: `calc(50${unit} / 8)`,
          position: "absolute",
          top: `calc(${y} * (50${unit} / 8))`,
          left: `calc(${x} * (50${unit} / 8))`
        },
        actions: {
          highlight: (self) => {
            self.style("background-color", "rgba(245, 224, 66, 0.9)");
          },
          unhighlight: (self) => {
            self.style("background-color", "rgba(0,0,0,0)");
          }
        },
        ready: (self) => {
          self.append(
            (this.element = new Element("i", {
              classes: ["fa-solid", iconClass],
              styles: {
                "font-size": `calc((50${unit} / 8) * 0.75)`,
                color: color
              }
            }))
          );
        }
      }).appendTo(board.element);
    }
  }
  listValidMoves() {
    const validMoves = [];
    for (const move of this.moves) {
      const moveIterations = iterateMove(this.board, this, move, []);
      for (const iteration of moveIterations) {
        validMoves.push(iteration);
      }
    }
    return validMoves;
  }
  move(validMove) {
    this.x = validMove.x;
    this.y = validMove.y;
    if (validMove.collisionEnemy) validMove.collisionEnemy.delete();
    if (this.element) {
      this.element.style("top", `calc(${this.y} * (50${unit} / 8))`);
      this.element.style("left", `calc(${this.x} * (50${unit} / 8))`);
    }
    // Calculate new possible moves in case of check condition (observed by listValidMoves of opposite color).
    this.board.listAllValidMoves(this.color, this.board.pieces);
    return validMove;
  }
  delete() {
    //pieces[this.color] = pieces[this.color].filter(el => el != this)
    removeObjFromArray(this, this.board.pieces[this.color]);
    if (this.element) this.element.delete();
  }
}

// PAWN

class Pawn extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, "fa-chess-pawn-piece", "Pawn", board);

    // moves calculated from perspective of player where +1 is away from player, -1 is toward player
    this.moves = [{
        x: 0,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return (
            (sourceY == 1 || sourceY == 6) &&
            iteration == 0 &&
            collisionFriendly == false &&
            collisionEnemy == false
          );
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        }
      },
      {
        x: 1,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == true;
        }
      },
      {
        x: -1,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == true;
        }
      }
    ];
  }
}

// ROOK

class Rook extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, "fa-chess-rook-piece", "Rook", board);

    // moves calculated from perspective of player where +1 is away from player, -1 is toward player
    this.moves = [{
        x: 0,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 0,
        y: -1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: 0,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 0,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      }
    ];
  }
}

// KNIGHT

class Knight extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, "fa-chess-knight-piece", "Knight", board);

    // moves calculated from perspective of player where +1 is away from player, -1 is toward player
    this.moves = [{
        x: 2,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 2,
        y: -1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: 2,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: -2,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -2,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -2,
        y: -1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 2,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: -2,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      }
    ];
  }
}

// BISHOP

class Bishop extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, "fa-chess-bishop-piece", "Bishop", board);

    // moves calculated from perspective of player where +1 is away from player, -1 is toward player
    this.moves = [{
        x: 1,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: -1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: -1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      }
    ];
  }
}

// QUEEN

class Queen extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, "fa-chess-queen-piece", "Queen", board);

    // moves calculated from perspective of player where +1 is away from player, -1 is toward player
    this.moves = [{
        x: 1,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: -1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: -1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 0,
        y: 1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 0,
        y: -1,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: 0,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 0,
        repeat: (
          sourceX,
          sourceY,
          iteration,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false && collisionEnemy == false;
        },
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      }
    ];
  }
}

// KING

class King extends Piece {
  constructor(x, y, color, board) {
    super(x, y, color, "fa-chess-king-piece", "King", board);

    // moves calculated from perspective of player where +1 is away from player, -1 is toward player
    this.moves = [{
        x: 1,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: -1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: -1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 0,
        y: 1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 0,
        y: -1,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: 1,
        y: 0,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      },
      {
        x: -1,
        y: 0,
        repeat: false,
        condition: (
          sourceX,
          sourceY,
          targetX,
          targetY,
          collisionFriendly,
          collisionEnemy
        ) => {
          return collisionFriendly == false;
        }
      }
    ];
  }
}

function isEven(n) {
  return n % 2 == 0;
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function iterateMove(board, piece, move, validMoves, iteration = 0) {
  const validMove = testMove({ x: piece.x, y: piece.y },
    move,
    board.pieces,
    piece.color,
    iteration
  );
  validMove.piece = piece;
  //if (piece.name == 'Rook') console.log(piece.name, move, validMove)
  if (validMove) {
    validMoves.push(validMove);
    if (
      move.repeat &&
      move.repeat(
        piece.x,
        piece.y,
        iteration,
        validMove.collisionFriendly,
        validMove.collisionEnemy
      )
    ) {
      validMoves = iterateMove(board, piece, move, validMoves, iteration + 1);
    }
  }
  return validMoves;
}

function removeObjFromArray(obj, arr) {
  // the simplest way to do this is:
  // arr = arr.filter(el => el != obj)
  // but this instantiates a new array
  // and wastes resources in the process.
  // instead:
  const indexOfObject = arr.findIndex((object) => {
    return object === obj;
  });
  arr.splice(indexOfObject, 1);
}

function inBounds(x, y) {
  if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
}

function testMove(pos, move, pieces, color, iteration) {
  let moveX, moveY;
  if (color == "white") {
    moveX = -1 * (move.x + move.x * iteration);
    moveY = -1 * (move.y + move.y * iteration);
  } else {
    moveX = move.x + move.x * iteration;
    moveY = move.y + move.y * iteration;
  }
  const newX = pos.x + moveX;
  const newY = pos.y + moveY;
  let collisionFriendly = false;
  let collisionEnemy = false;
  for (const piece of pieces["white"]) {
    //console.log('checking for collision', 'test piece', piece.x, piece.y, 'target', newX, newY)
    if (newX == piece.x && newY == piece.y) {
      if (color == "white") {
        collisionFriendly = piece;
      } else {
        collisionEnemy = piece;
      }
      break;
    }
  }
  for (const piece of pieces["black"]) {
    //console.log('checking for collision', 'test piece', piece.x, piece.y, 'target', newX, newY)
    if (newX == piece.x && newY == piece.y) {
      if (color == "black") {
        collisionFriendly = piece;
      } else {
        collisionEnemy = piece;
      }
      break;
    }
  }
  //console.log('collisionFriendly', collisionFriendly, 'collisionEnemy', collisionEnemy)
  if (!inBounds(newX, newY)) {
    //console.log('out of bounds')
    return false;
  }
  if (
    !move.condition(pos.x, pos.y, newX, newY, collisionFriendly, collisionEnemy)
  ) {
    //console.log('move condition failed', move.condition)
    return false;
  }
  const result = {
    x: newX,
    y: newY,
    collisionFriendly: collisionFriendly,
    collisionEnemy: collisionEnemy
  };
  return result;
}

function debugValidMoves(pieces, i = 0) {
  return new Promise((resolve) => {
    let moves;
    //console.log('db-2')
    if (pieces instanceof Piece) {
      moves = pieces.listValidMoves();
      pieces.element.actions.highlight();
    } else {
      moves = pieces[i].listValidMoves();
      pieces[i].element.actions.highlight();
    }
    //console.log('db-1')
    for (const move of moves) {
      squares[move.x][move.y].element.actions.highlight();
    }
    //console.log('db1')
    setTimeout(() => {
      //console.log('db2')
      if (pieces instanceof Piece) {
        pieces.element.actions.unhighlight();
        for (const move of moves) {
          squares[move.x][move.y].element.actions.unhighlight();
        }
      } else {
        pieces[i].element.actions.unhighlight();
        for (const move of moves) {
          squares[move.x][move.y].element.actions.unhighlight();
        }
        if (i < pieces.length - 1) {
          debugValidMoves(pieces, i + 1);
        } else {
          resolve();
        }
      }
    }, 1000);
  });
}

function iterateMoveQueue(moves, delay=100, i = 0, res = false) {
  return new Promise(resolve => {
    if (!res) res = resolve
    const move = moves[i]
    move.piece.move(move)
    setTimeout(() => {
      i++
      if (i < moves.length) {
        iterateMoveQueue(moves, delay, i, res)
      } else {
        res()
      }
    }, delay)
  })

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRandomValidMove(moves) {
  const chosenMove = moves[getRandomInt(0, moves.length - 1)];
  chosenMove.piece.move(chosenMove);
}

function getOppositeColor(color) {
  if (color == "white") return "black";
  else if (color == "black") return "white";
  else throw "Invalid color provided.";
}

function makeRandomTurnCycle(board, count = 1, i = 0, res = false) {
  return new Promise((resolve, reject) => {
    if (!res) res = resolve
    const pieces = board.pieces;
    const whiteMoves = board.listAllValidMoves("white", pieces);
    if (whiteMoves.length == 0) {
      console.log("No moves available for White");
      return false;
    }
    makeRandomValidMove(whiteMoves);
    const blackMoves = board.listAllValidMoves("black", pieces);
    if (blackMoves.length == 0) {
      console.log("No moves available for Black");
      return false;
    }
    makeRandomValidMove(blackMoves);
    i++;
    setTimeout(() => {
      if (i < count) {
        makeRandomTurnCycle(board, count, i, res);
      } else {
        res(true)
      }
    }, 100);
  })
}
