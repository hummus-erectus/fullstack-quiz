import styled from 'styled-components'

export const StyledNavigation = styled.div`
  background-color: ${({ theme }) => theme.colors.primary || '#ADD8E6'};

  nav {
    height: 60px;
    /* align-items: center; */
    /* position: relative; */
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
    display: none;
  }

  .nav-elements {
    display: flex;
  }

  .nav-elements ul {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
  }

  .nav-elements ul li {
    display: flex;
    align-items: center;

    margin-right: 40px;
  }

  .nav-elements ul li span {
    display: block;
  }

  .nav-elements ul a.active {
    color: #B98389;
    font-weight: 500;
    position: relative;
  }

  /* .nav-elements ul a.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 800%;
    height: 2px;
    background-color: #69b3fd;
  } */

  span {
    font-weight: 700;
  }

  p {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryContent || '#000'};
    text-decoration: none;
    font-weight: 700;
  }

  .logo {
    font-size: 2rem;
    /* position: absolute;
    left: 50%;
    transform: translateX(-50%); */
  }

  Button {
    margin: 0.2em;
  }

  @media (max-width: 600px) {
    .menu-icon {
      display: block;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primaryContent || '#000'};
    }

    .nav-elements {
      display: block;
      position: absolute;
      z-index: 100;
      right: 0;
      top: 60px;
      background-color: #B98389;
      width: 0px;
      height: calc(100vh - 60px);
      transition: all 0.3s ease-in;
      overflow: hidden;
      white-space: nowrap;
    }

    .nav-elements.active {
      width: 100%;
    }

    .nav-elements ul {
      display: flex;
      flex-direction: column;
    }

    .nav-elements ul li {
      margin-right: unset;
      margin-top: 22px;
    }
  }

`
