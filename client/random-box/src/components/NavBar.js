import React from 'react'

const NavBar = ({ toggleGame, gameStatus }) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Saia do seu Quadrado</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li onClick={toggleGame}><a href="#">{ !gameStatus ? 'Iniciar Jogo' : 'Finalizar Jogo' }</a></li>
            <li><a href="#">Reiniciar Jogo</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li onClick={toggleGame}><a href="#">{ !gameStatus ? 'Iniciar Jogo' : 'Finalizar Jogo' }</a></li>
        <li><a href="#">Reiniciar Jogo</a></li>
      </ul>
    </div>
  )
}

export default NavBar;

