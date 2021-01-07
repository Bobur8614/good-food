import React, {useContext} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import style from "./layout.module.css";
import {Store} from "../../../Store";
import leftLight from '../../../assets/images/leftLightAnchor.svg';
import rightDark from '../../../assets/images/rightDarkAnchor.svg';
import leftDark from '../../../assets/images/leftDarkAnchor.svg';
import Settings from "./Settings";
import {useTranslation} from "react-i18next";

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      width: 'calc(100%)',
      height: 62,
      boxShadow: 'none',
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100%)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   hide: {
      display: 'none',
   }
}));

export default function Appbar(props) {
   const {t} = useTranslation();
   const classes = useStyles();
   const {state, dispatch} = useContext(Store);

   const handleDrawerOpen = () => {
      props.setOpen(true);
   };
   const handleDrawerClose = () => {
      props.setOpen(false);
   };

   const handleChangeMode = () => {
      if (state.mode === 'dark') {
         return dispatch({type: 'MODE', payload: 'light'});
      } else {
         return dispatch({type: 'MODE', payload: 'dark'});
      }
   }

   return (
      <AppBar
         position="fixed"
         className={clsx([classes.appBar, "dark"].join(' '), {
            [classes.appBarShift]: props.open,
         })}
         id={state.mode}
      >
         <Toolbar className={classes.toolbar}>
            <div className={[style.myLogo].join(' ')}>
               {<p className={style.goodFood}>GoodFood</p>}
            </div>
            <div className={[classes.menuButton, style.vector].join(' ')}>
               {props.open === false ?
                  <div onClick={handleDrawerOpen}>
                     {state.mode === 'light' ? <img src={leftLight} alt=""/> : <img src={rightDark} alt=""/>}
                  </div>
                  :
                  <div onClick={handleDrawerClose}>
                     {state.mode === 'light' ? <img src={leftLight} alt=""/> : <img src={leftDark} alt=""/>}
                  </div>
               }
            </div>
            <div className={style.sun}>
               {/*<Button btnType="vector" clicked={handleChangeMode}><img src={sun} alt=""/></Button>*/}
               <Settings/>
            </div>
         </Toolbar>
      </AppBar>
   )
}