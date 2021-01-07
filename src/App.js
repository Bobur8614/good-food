import React, {useContext, useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {Store} from "./Store";
import style from './app.module.css';
import NotFound from "./404";
import Login from "./Authorization/Login";
import Appbar from "./components/Layout/Appbar/Appbar";
import Sidebar from "./components/Layout/Appbar/Sidebar";

import clsx from "clsx";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


function App() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const {state} = useContext(Store);
    // const {i18n} = useTranslation();

    // const routes = [
    // {
    //   path: "/dashboard",
    //   component: Dashboard
    // }
    // ]

    if (state.token) {
        return (
            <div className={[style[state.mode], state.mode === 'dark' ? style.backgLight : style.backgDark].join(' ')}
                 style={{display: 'flex'}}>
                <Appbar setOpen={setOpen} open={open}/>
                <Sidebar open={open}  />
                <div
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={style.toolbar}/>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
                        <Route exact path="/login" render={() => <Redirect to="/dashboard"/>}/>
                        {/*{routes.map(r =>*/}
                        {/*    <Route exact path={r.path} component={r.component}/>*/}
                        {/*)}*/}
                        <Route exact path='*' render={() => <NotFound/>}/>
                    </Switch>
                </div>
                {/*<DefaultMap/>*/}
            </div>
        );
    } else {
        return (
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="*" render={() => <Redirect to="/login"/>}/>
            </Switch>
        )
    }
}

export default App;
