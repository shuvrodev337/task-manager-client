import { NavLink } from 'react-router-dom';

const MyNavLink = ({ isActive, to, children }) => {
  return (
    <NavLink className={`NavLink ${isActive ? 'active' : ''}`} to={to}>
      {children}
    </NavLink>
  );
};

export default MyNavLink;
