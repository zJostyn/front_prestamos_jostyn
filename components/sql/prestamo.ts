import axios from 'axios';

const API_URL = 'https://back-prestamos-jostyn.onrender.com/prestamos';

export const obtenerPrestamos = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return 0;
    }
};

export const crearPrestamo = async (Prestamo: {
    idprestamo: number;
    cedula: string;
    codigo: number;
    fechaprestamo: string;
    fechaentrega: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/create`, Prestamo);
        return response.data;
    } catch (error) {
        console.error('Error al crear el Prestamo:', error);
        throw error;
    }
};

export const devolverLibro = async (Prestamo: {
    cedula: string;
    codigo: number;
    fechadevuelto: string;
}) => {
    try {
        const response = await axios.put(`${API_URL}/return`, Prestamo);
        return response.data;
    } catch (error) {
        console.error('Error al devolver el Libro:', error);
        throw error;
    }
};