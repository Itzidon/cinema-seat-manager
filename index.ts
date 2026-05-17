type Seat = 0 | 1;
type CinemaRoom = Seat[][];

const ROWS = 8;
const COLUMNS = 10;

// Crear sala
function createRoom(): CinemaRoom {
  const room: CinemaRoom = [];

  for (let row = 0; row < ROWS; row++) {
    const seats: Seat[] = [];

    for (let column = 0; column < COLUMNS; column++) {
      seats.push(0);
    }

    room.push(seats);
  }

  return room;
}

// Mostrar sala
function showRoom(room: CinemaRoom): void {
  console.log("\nEstado de la sala:");
  console.log("   " + [...Array(COLUMNS)].map((_, i) => i).join(" "));

  for (let row = 0; row < room.length; row++) {
    let rowText = `${row}  `;

    for (let column = 0; column < room[row].length; column++) {
      rowText += room[row][column] === 1 ? "X " : "L ";
    }

    console.log(rowText);
  }
}

// Reservar asiento
function reserveSeat(
  room: CinemaRoom,
  row: number,
  column: number
): boolean {
  if (
    row < 0 ||
    row >= room.length ||
    column < 0 ||
    column >= room[row].length
  ) {
    console.log(`Asiento inválido: fila ${row}, columna ${column}`);
    return false;
  }

  if (room[row][column] === 1) {
    console.log(`El asiento ${row}-${column} ya está ocupado`);
    return false;
  }

  room[row][column] = 1;
  console.log(`Reserva confirmada para ${row}-${column}`);

  return true;
}

// Contar asientos
function countSeats(room: CinemaRoom): void {
  let occupied = 0;
  let available = 0;

  for (let row = 0; row < room.length; row++) {
    for (let column = 0; column < room[row].length; column++) {
      if (room[row][column] === 1) {
        occupied++;
      } else {
        available++;
      }
    }
  }

  console.log(`Ocupados: ${occupied}`);
  console.log(`Disponibles: ${available}`);
}

// Buscar dos asientos juntos
function findContiguousSeats(
  room: CinemaRoom
): [number, number, number] | null {
  for (let row = 0; row < room.length; row++) {
    for (let column = 0; column < room[row].length - 1; column++) {
      if (room[row][column] === 0 && room[row][column + 1] === 0) {
        console.log(
          `Asientos contiguos encontrados en fila ${row}: ${column} y ${column + 1}`
        );

        return [row, column, column + 1];
      }
    }
  }

  console.log("No hay asientos contiguos disponibles");
  return null;
}

// -------------------
// PRUEBAS
// -------------------

console.log("SALA VACÍA");
const emptyRoom = createRoom();
showRoom(emptyRoom);
countSeats(emptyRoom);
findContiguousSeats(emptyRoom);

console.log("\nSALA PARCIALMENTE OCUPADA");
const cinema = createRoom();

reserveSeat(cinema, 0, 0);
reserveSeat(cinema, 0, 1);
reserveSeat(cinema, 3, 5);

showRoom(cinema);
countSeats(cinema);
const contiguousSeats = findContiguousSeats(cinema);
console.log(contiguousSeats);

console.log("\nINTENTANDO RESERVAR UN ASIENTO OCUPADO");
reserveSeat(cinema, 0, 0);

console.log("\nINTENTANDO RESERVAR UN ASIENTO INVÁLIDO");
reserveSeat(cinema, 10, 20);

console.log("\nSALA CASI LLENA CON ASIENTOS SUELTOS");
const almostFullRoom = createRoom();

for (let row = 0; row < ROWS; row++) {
  for (let column = 0; column < COLUMNS; column++) {
    if (column % 2 === 0) {
      almostFullRoom[row][column] = 1;
    }
  }
}

showRoom(almostFullRoom);
countSeats(almostFullRoom);
findContiguousSeats(almostFullRoom);

console.log("\nSALA COMPLETAMENTE LLENA");
const fullRoom = createRoom();

for (let row = 0; row < ROWS; row++) {
  for (let column = 0; column < COLUMNS; column++) {
    fullRoom[row][column] = 1;
  }
}

showRoom(fullRoom);
countSeats(fullRoom);
findContiguousSeats(fullRoom);
