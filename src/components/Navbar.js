import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavSection = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Icon = styled.i`
  height: 60px;
  background: #343a40;
  color: #ccc;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
  width: calc(100% / 3);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: #343a40;
`

const StyledLinkDisabled = styled.div`
  width: calc(100% / 3);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #343a40;

  > * {
    color: #94d82d;
  }
`

export default class Navbar extends Component {
  render() {
    return (
      <NavSection>
        <StyledLinkDisabled>
          <Icon className="fas fa-list-ul fa-2x" />
        </StyledLinkDisabled>
        <StyledLink to="/addRoute">
          <Icon className="far fa-plus-square fa-2x" />
        </StyledLink>
        <StyledLink to="/addRoute">
          <Icon className="far fa-map fa-2x" />
        </StyledLink>
      </NavSection>
    )
  }
}
