import axios from 'axios';

const API_URL = 'http://localhost:3000/libros';

export const obtenerTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return 0;
    }
};

export const obtenerLibros = async () => {
    try {
        const response = await axios.get(`${API_URL}/libros`);
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return 0;
    }
};

export const obtenerRevistas = async () => {
    try {
        const response = await axios.get(`${API_URL}/revistas`);
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return 0;
    }
};

export const crearLibro = async (Libro: {
    codigo: number;
    tipo: string;
    idcategoria: number;
    editorial: string;
    nombre: string;
    autor: string;
    aniopublicacion: number;
    estado: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/create`, Libro);
        return response.data;
    } catch (error) {
        console.error('Error al crear el Libro:', error);
        throw error;
    }
};

export const actualizarLibro = async (Libro: {
    codigo: number;
    tipo: string;
    idcategoria: number;
    editorial: string;
    nombre: string;
    autor: string;
    aniopublicacion: number;
}) => {
    try {
        const response = await axios.put(`${API_URL}/update`, Libro);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el Libro:', error);
        throw error;
    }
};

export const eliminarLibro = async (codigo: number) => {
    try {
        const response = await axios.delete(`${API_URL}/delete`, {
            data: { codigo },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el Libro:', error);
        throw error;
    }
};

export const colocarEstadoAlquiladoLibro = async (codigo: number) => {
    try {
        let estado = "Si";
        const response = await axios.put(`${API_URL}/state`, {
            codigo,
            estado,
        });
        return response.data;
    } catch (error) {
        console.error('Error al modificar el estado del libro:', error);
        throw error;
    }
};

export const colocarEstadoNoAlquiladoLibro = async (codigo: number) => {
    try {
        let estado = "No";
        const response = await axios.put(`${API_URL}/state`, {
            codigo,
            estado,
        });
        return response.data;
    } catch (error) {
        console.error('Error al modificar el estado del libro:', error);
        throw error;
    }
};