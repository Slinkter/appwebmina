import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Typography,
    Stack,
    CircularProgress,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

import DashboardWrapper from "../components/DashboardWrapper";

import FormField from "../components/FormField";

import { addNewEmployer } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectAuthStatus, selectCurrentUser } from "../redux/authSlice";

const areas = [
    { value: "a1", label: "Area 1" },
    { value: "a2", label: "Area 2" },
    { value: "a3", label: "Area 3" },
];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 20,
    p: 4,
};

const newEmployer = {
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    email: "",
    area: "",
};

const validationMessages = {
    required: "Campo faltante",
    firstNameMax: "El límite es de 25 caracteres",
    lastNameMax: "El límite es de 25 caracteres",
    dniLength: "El DNI debe tener exactamente 8 caracteres",
    dniFormat: "El DNI debe contener solo números",
    phoneFormat: "El teléfono debe contener solo números",
    emailInvalid: "Correo electrónico inválido",
    areaSelect: "Debe seleccionar un área",
};

function NewEmployer() {
    //

    const currentUser = useSelector(selectCurrentUser);
    const authStatus = useSelector(selectAuthStatus);
    const navigate = useNavigate();
    //
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // Este console.log solo se ejecutará cuando el valor de currentUser cambie.
        console.log("El estado de usuario de Redux ha cambiado:", currentUser);
    }, [currentUser]); // La dependencia `currentUser` hace que se ejecute solo cuando el valor cambia.

    //
    const formik = useFormik({
        initialValues: newEmployer, // Set initial value for area
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(25, validationMessages.firstNameMax)
                .required(validationMessages.required),
            lastName: Yup.string()
                .max(25, validationMessages.lastNameMax)
                .required(validationMessages.required),
            dni: Yup.string()
                .length(8, validationMessages.dniLength)
                .matches(/^\d{8}$/, validationMessages.dniFormat)
                .required(validationMessages.required),
            phone: Yup.string()
                .matches(/^\d+$/, validationMessages.phoneFormat)
                .required(validationMessages.required),
            email: Yup.string()
                .email(validationMessages.emailInvalid)
                .required(validationMessages.required),
            area: Yup.string()
                .notOneOf([""], validationMessages.areaSelect) // Campo de selección validado
                .required(validationMessages.required),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            setOpen(true);
            try {
                // values.createdAt = new Date().toISOString();
                values.createdAt = new Date().toLocaleString("sv");
                values.adminUid = currentUser.uid;
                const rpta = await addNewEmployer(values);
                console.log("rpta ; ", rpta);
                console.log("JSON : ", JSON.stringify(values, null, 2));
                navigate("/dashboard");
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
                setOpen(false);
            }
        },
    });

    if (open) {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack
                    sx={style}
                    alignItems="center"
                    spacing={2}
                    borderRadius={4}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Creando empleado...
                    </Typography>
                    <CircularProgress />
                </Stack>
            </Modal>
        );
    }

    return (
        <DashboardWrapper>
            <Container component="main" maxWidth="sm">
                <Box
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack>
                        <Box sx={{ pt: 2 }}>
                            <Typography color="textPrimary" variant="h4">
                                Crear empleado
                            </Typography>
                        </Box>
                        <form onSubmit={formik.handleSubmit}>
                            <FormField
                                name="firstName"
                                label="Nombres"
                                formik={formik}
                                required
                            />
                            <FormField
                                name="lastName"
                                label="Apellidos"
                                formik={formik}
                                required
                            />
                            <FormField
                                name="dni"
                                label="DNI"
                                formik={formik}
                                required
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );
                                    formik.setFieldValue("dni", newValue);
                                }}
                            />
                            <FormField
                                name="phone"
                                label="Teléfono"
                                type="number"
                                formik={formik}
                            />
                            <FormField
                                name="email"
                                label="Correo"
                                type="email"
                                formik={formik}
                                required
                            />
                            <FormField
                                name="area"
                                label="Area de Trabajo"
                                formik={formik}
                                select
                                options={areas}
                            />

                            <Box sx={{ py: 2 }}>
                                <Button
                                    margin="normal"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting
                                        ? "Creando..."
                                        : "Crear"}
                                </Button>
                            </Box>

                            <Box sx={{ py: 2 }}>
                                <Button
                                    margin="normal"
                                    color="error"
                                    fullWidth
                                    component={Link}
                                    to="/dashboard"
                                    variant="outlined"
                                >
                                    Regresar
                                </Button>
                            </Box>
                        </form>
                    </Stack>
                </Box>
            </Container>
        </DashboardWrapper>
    );
}

export default NewEmployer;
