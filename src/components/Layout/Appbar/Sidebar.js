import React, {useContext} from 'react';
import Drawer from "@material-ui/core/Drawer";
import {useTranslation} from "react-i18next";
import Badge from "@material-ui/core/Badge";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {Link, useLocation} from 'react-router-dom';
import style from "./layout.module.css";
import {Store} from '../../../Store';
import {SideData} from "./SidebarData";


const drawerWidth = 240;

const StyledBadge = withStyles((theme) => ({
   badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
         position: 'absolute',
         top: -1,
         left: -1,
         width: '100%',
         height: '100%',
         borderRadius: '50%',
         animation: '$ripple 1.5s infinite ease-in-out',
         border: '1px solid currentColor',
         content: '""',
      },
   },
   '@keyframes ripple': {
      '0%': {
         transform: 'scale(.8)',
         opacity: 1,
      },
      '100%': {
         transform: 'scale(2.4)',
         opacity: 0,
      },
   },
}))(Badge);

const useStyles = makeStyles((theme, state) => ({
   drawer: {
      width: drawerWidth,
      flexShrink: 0,
   },
   drawerPaper: {
      width: drawerWidth,
      background: '#fff',
      paddingTop: 62,
      boxShadow: '0px 1px 3px #6edade'
   },
   drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
   },
}));

export default function Sidebar(props) {
   const {state} = useContext(Store);
   const classes = useStyles(state);
   const {i18n} = useTranslation();
   const location = useLocation();
   const [openId, setOpen] = React.useState(false);
   const handleClick = (i) => {
      setOpen(openId === i ? -1 : i);
   };


   return (
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={props.open}
          classes={{
             paper: classes.drawerPaper,
          }}
      >
         {SideData.map((el, i) =>
            <div key={i}>
               <Link to={`/${el.link}`}>
                  <div
                     className={props.open === true ? [style.toolsOpen, location.pathname === el.active ? style.activeSide : null].join(' ')
                        : [style.toolsClose, location.pathname === '/' + el.link && openId === i ? style.activeSide : null].join(' ')}
                     onClick={() => handleClick(i)}>
                     <img src={el.img} alt=""/>
                     {props.open === true ?
                        <p>{i18n.language === "ru" ? el.name.ru : (i18n.language === "en" ? el.name.en : el.name.uz)}</p> : null}
                     <div className={style.anchor}>{props.open === true && el.nodes.length !== 0 ? (openId === i ?
                        <ExpandMore/> :
                        <KeyboardArrowRightIcon style={{color: '#000'}}/>) : null}</div>
                  </div>
               </Link>
               <Collapse in={openId === i} timeout="auto" unmountOnExit>
                  {el.nodes.map((tree, i) =>
                     <Link to={`/${tree.link}`}>
                        <div
                           className={[style.nested, location.pathname === '/' + tree.link ? style.nestedActive : null].join(' ')}
                           key={i}>
                           <img src={tree.img} alt=""/>
                           <p>{i18n.language === "ru" ? tree.name.ru : (i18n.language === "en" ? tree.name.en : tree.name.uz)}</p>
                           <p className={(tree.badge !== null ? [style.badge] : null)}>{tree.badge}</p>
                        </div>
                     </Link>
                  )}
               </Collapse>
            </div>
         )}
      </Drawer>
   )

}