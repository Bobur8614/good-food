import React, {useContext, useRef, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import axios from '../../API/api';
import {Store} from "../../Store";
import {useTranslation} from "react-i18next";
import Button from "../UI/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        fontSize: 12,
        maxWidth: 300,
        minHeight: 40,
        width: '100%',
        color: '#fff',
        background: 'none',
        fontFamily: "Montserrat",
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: "rgba(255, 255, 255, 1)",
            color: '#fff'
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: "#4B74FF",
            color: '#fff'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        "&:focus .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: "#4B74FF",
            color: '#fff'
        },
    },
    input: {
        color: '#fff',
        fontSize: 13
    },
    label: {
        color: '#fff',
        fontSize: 13
    },
    submit: {
        margin: theme.spacing(5, 0, 2, 1),
        border: 'none',
        padding: 8,
        width: 250,
        background: '#7075FF',
        fontSize: 12
    },
    progress: {
        Width: 10,
        margin: theme.spacing(5, 0, 2, 15),
    },
    form: {
        marginTop: 25
    },
    multilineColor: {
        color: '#fff',
        borderColor: '#fff'
    }
}));

export default function Form(props) {
    const {dispatch, state} = useContext(Store);
    const [inputs, setInputs] = useState(props.updateInfo ? props.updateInfo : {});

    const {t} = useTranslation();
    const classes = useStyles();
    const [states, setStates] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);


    const handleInputChange = (event) => {
        event.persist();
        const name = event.target.name;
        if (props.nested) {
            if (name === 'code' || 'name') {
                setInputs(inputs => ({
                    ...inputs,
                    [event.target.name]: event.target.value
                }))
            } else {
                setInputs(inputs => ({
                    ...inputs,
                    [props.nested]: {
                        ...inputs[props.nested],
                        [event.target.name]: event.target.value
                    }
                }))
            }
        } else {
            setInputs(inputs => ({...inputs, [name]: event.target.value}));
        }
    }


    const handleSubmitAuth = (e) => {
        e.preventDefault();
        setStates(true);
        axios.post(props.url, {"username": inputs.login, "password": inputs.password})
            .then(response => {
                localStorage.setItem('id_token', response.data.data.sessionToken)
                return dispatch({type: 'SET_TOKEN', payload: localStorage.getItem('id_token')})
            })
            .catch(error => {
                setErrorAuth(true)
                setStates(false)
                toast.configure();
                toast.error((error.response.data.error.friendlyMessage), {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
    }


    return (
        <div>
            <form className={classes.form} onSubmit={handleSubmitAuth}>
                {props.inputForm.map((element, i) =>
                    <TextField
                        key={i}
                        error={errorAuth}
                        className={classes.inputRoot}
                        InputProps={{
                            className: classes.input,
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        InputLabelProps={{
                            className: classes.label
                        }}
                        variant="outlined"
                        margin="normal"
                        required={element.required}
                        label={element.label}
                        name={element.name}
                        size="small"
                        autoComplete='off'
                        value={inputs[element.value] || null}
                        onChange={handleInputChange}
                        type={element.name}
                    />
                )}
                {states === false ?
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        btnType="submit"
                        className={classes.submit}
                    >
                        {t('signIn')}
                    </Button> :
                    <CircularProgress size={30} className={classes.progress}/>}
            </form>
        </div>
    )
}

const top100Films = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},
    {title: 'The Godfather: Part II', year: 1974},
    {title: 'The Dark Knight', year: 2008},
    {title: '12 Angry Men', year: 1957},
];