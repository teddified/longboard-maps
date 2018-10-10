import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavSection = styled.div`
  height: ${props => props.navHeight};
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
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
    const path = window.location.pathname
    console.log(path)
    switch (path) {
      case '/routeCollection':
        return (
          <NavSection navHeight={this.props.navHeight}>
            <StyledLink to="/">
              <Icon className="fas fa-list-ul fa-2x" />
            </StyledLink>
            <StyledLink to="/addRoute">
              <Icon className="far fa-plus-square fa-2x" />
            </StyledLink>
            <StyledLinkDisabled>
              <Icon className="far fa-map fa-2x" />
            </StyledLinkDisabled>
          </NavSection>
        )
      case '/addRoute':
      case '/saveTrip':
        return (
          <NavSection navHeight={this.props.navHeight}>
            <StyledLink to="/">
              <Icon className="fas fa-list-ul fa-2x" />
            </StyledLink>
            <StyledLinkDisabled>
              <Icon className="far fa-plus-square fa-2x" />
            </StyledLinkDisabled>
            <StyledLink to="/routeCollection">
              <Icon className="far fa-map fa-2x" />
            </StyledLink>
          </NavSection>
        )
      case '/':
        return (
          <NavSection navHeight={this.props.navHeight}>
            <StyledLinkDisabled>
              <Icon className="fas fa-list-ul fa-2x" />
            </StyledLinkDisabled>
            <StyledLink to="/addRoute">
              <Icon className="far fa-plus-square fa-2x" />
            </StyledLink>
            <StyledLink to="/routeCollection">
              <Icon className="far fa-map fa-2x" />
            </StyledLink>
          </NavSection>
        )
      default:
        return (
          <NavSection navHeight={this.props.navHeight}>
            <StyledLink to="/">
              <Icon className="fas fa-list-ul fa-2x" />
            </StyledLink>
            <StyledLink to="/addRoute">
              <Icon className="far fa-plus-square fa-2x" />
            </StyledLink>
            <StyledLink to="/routeCollection">
              <Icon className="far fa-map fa-2x" />
            </StyledLink>
          </NavSection>
        )
    }
  }
}
