import styled from 'styled-components'

export const StyledNavigation = styled.div`
  background-color: ${({ theme }) => theme.colors.primary || '#ADD8E6'};

  nav {
    height: 60px;
  }

  .nav-elements {
    display: block;
    position: absolute;
    z-index: 100;
    right: 0;
    top: 60px;
    background-color: ${({ theme }) => theme.colors.baseHighlight || '#EFEAE6'};
    width: 0px;
    height: calc(100vh - 60px);
    transition: all 0.3s ease-in;
    overflow: hidden;
    white-space: nowrap;
  }

  .nav-elements.active {
    width: 100%;
  }

  .nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .menu-icon {
    display: block;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryContent || '#000'};
  }

  .nav-elements ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    justify-content: space-between;
  }

  .nav-elements ul li {
    display: flex;
    align-items: center;
    margin-top: 22px;
  }

  .username {
    display: block;
  }

  .logged {
    font-weight: 400;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryContent || '#000'};
    text-decoration: none;
    font-weight: 700;
  }

  .logo {
    font-size: 2rem;
  }

  Button {
    margin: 0.2em;
  }

  @media (min-width: ${({ theme }) => theme.mobile || '600px'}) {
    .menu-icon {
      display: none;
    }

    .nav-elements {
      display: flex;
      position: unset;
      z-index: unset;
      right: unset;
      top: unset;
      background-color: unset;
      width: unset;
      height: unset;
      transition: unset;
      overflow: unset;
      white-space: unset;
    }

    .nav-elements ul {
      flex-direction: row;
    }

    .nav-elements ul li {
      margin-top: unset;
    }

    .nav-elements ul li:not(:last-child) {
      margin-right: 40px;
    }
  }

`
