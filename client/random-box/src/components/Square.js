import React from 'react'

const Square = (props) => {
  const { coordinate: { x, y }, newCoordinates } = props;
  console.log('x e y: ', x, y);
  return (
    <div className="game-area">
      <button
        className="square"
        style={{ top: `${x}px`, left: `${y}px` }}
        onClick={newCoordinates}
      />
    </div>
  )
}

export default Square;
