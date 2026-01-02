/* eslint-disable jsx-a11y/alt-text */
import { Button } from '@mui/material';
import { colors } from '../themes/styles';
import './Buttons.css';
const style = {
  YellowBtn: {
    color: colors.SECONDARY_COLOR,
    backgroundColor: colors.PRIMARY_COLOR,
    textTransform: 'none',
    '&:hover': {
      color: colors.WHITE_COLOR,
      backgroundColor: colors.PRIMARY_COLOR,
    },
  },

  EditBtn: {
    color: colors.WHITE_COLOR,
    backgroundColor: colors.SECONDARY_COLOR,
    textTransform: 'none',
    margin: '10px',
    '&:hover': {
      color: colors.PRIMARY_COLOR,
      backgroundColor: colors.SECONDARY_COLOR,
    },
  },

  BlackBtn: {
    color: colors.WHITE_COLOR,
    backgroundColor: colors.SECONDARY_COLOR,
    borderRadius: '5px',
    textTransform: 'none',
    '&:hover': {
      color: colors.PRIMARY_COLOR,
      backgroundColor: colors.SECONDARY_COLOR,
    },
  },

  SecondaryBtn: {
    color: colors.SECONDARY_COLOR,
    backgroundColor: colors.WHITE_COLOR,
    textTransform: 'none',
    border: `1px solid ${colors.LIGHT_YELLOW}`,
    '&:hover': {
      color: colors.SECONDARY_COLOR,
      backgroundColor: colors.LIGHT_YELLOW,
    },
  },

  DashboardBtn: {
    color: colors.SECONDARY_COLOR,
    backgroundColor: colors.WHITE_COLOR,
    textTransform: 'none',
    border: `1px solid ${colors.PRIMARY_COLOR}`,
    borderRadius: '2px',
    height: '50px',
    width: '220px',

    fontWeight: 'bold',
    '&:hover': {
      color: colors.SECONDARY_COLOR,
      backgroundColor: colors.PRIMARY_COLOR,
    },
  },
  DashboardBtnText: {
    marginLeft: '10px',
    marginTop: '3px',
    fontWeight: '400',
  },
  BlackBtnIcon: {
    fontSize: '12px',
  },
  chipStyle: {
    color: colors.SECONDARY_COLOR,
    backgroundColor: colors.PRIMARY_COLOR,
  },
};
//Buttons
export const HrmYellowBtn = ({
  label,
  icon,
  onClick,
  size,
  height,
  width,
  className,
  isActive,
  disabled,
  endIcon,
}) => {
  return (
    <Button
      startIcon={icon}
      endIcon={endIcon}
      variant="contained"
      sx={style.YellowBtn}
      size={size}
      height={height}
      // width={width}
      width="50px"
      onClick={onClick}
      className={className}
      disabled={isActive || disabled}
    >
      {label}
    </Button>
  );
};
export const HrmBlackBtn = ({
  label,
  icon,
  onClick,
  size,
  height,
  width,
  className,
  type,
  disabled,
}) => {
  return (
    <Button
      // endIcon={icon}
      variant="contained"
      sx={style.BlackBtn}
      size={size}
      height={height}
      width={width}
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {<span className="blackBtn-label">{label}</span>}
      {icon ? <span className="blackBtn-icon">{icon}</span> : null}
    </Button>
  );
};
export const HrmSecondaryBtn = ({ label, icon, onClick }) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      sx={style.SecondaryBtn}
      size="large"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
export const HrmSpecificDetailsButton = ({ label, icon, onClick }) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      sx={style.SecondaryBtn}
      size="large"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export const HrmEditDetails = ({ label, icon, onClick, disabled, size }) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      sx={style.EditBtn}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export const HrmOutlinebBtn = ({
  label,
  icon,
  onClick,
  className,
  size,
  disabled,
  style,
}) => {
  return (
    <Button
      startIcon={icon}
      variant="outlined"
      disabled={disabled}
      size={size || 'small'}
      onClick={onClick}
      className={className}
      style={style}
    >
      {label}
    </Button>
  );
};

export const HrmDashboardbBtn = ({
  label,
  icon,
  onClick,
  className,
  size,
  disabled,
}) => {
  return (
    <Button
      variant="outlined"
      disabled={disabled}
      size={size || 'small'}
      onClick={onClick}
      className={className}
      sx={style.DashboardBtn}
    >
      <img height="22px" src={icon} />
      <span style={style.DashboardBtnText}>{label}</span>
    </Button>
  );
};

export const HrmYellowSubmitBtn = ({
  label,
  icon,
  onClick,
  size,
  height,
  width,
  className,
  disabled,
}) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      className={`custom-btn btn-10 ${className}`}
      size={size}
      height={height}
      width={width}
      onClick={onClick}
      disabled={disabled}
      style={{ textTransform: 'none' }}
    >
      {label}
    </Button>
  );
};

export const HrmNextBtn = ({
  label,
  icon,
  onClick,
  size,
  height,
  width,
  className,
  isActive,
}) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      className={`custom-btn btn-15 ${className}`}
      size={size}
      height={height}
      width={width}
      onClick={onClick}
      style={{ textTransform: 'none' }}
      disabled={isActive}
    >
      {label}
    </Button>
  );
};

export const HrmBackBtn = ({
  label,
  icon,
  onClick,
  size,
  height,
  width,
  className,
  isActive,
}) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      className={`custom-btn btn-16 ${className}`}
      size={size}
      height={height}
      width={width}
      style={{ textTransform: 'none' }}
      onClick={onClick}
      disabled={isActive}
    >
      {label}
    </Button>
  );
};

export const HrmDeleteBtn = ({
  label,
  icon,
  onClick,
  size,
  height,
  width,
  className,
  isActive,
  disable,
}) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      className={`custom-btn btn-14 ${className}`}
      size={size}
      height={height}
      width={width}
      onClick={onClick}
      style={{ textTransform: 'none' }}
      disabled={isActive || disable}
    >
      {label}
    </Button>
  );
};
