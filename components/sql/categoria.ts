import axios from 'axios';

const API_URL = 'http://localhost:3000/categorias';

export const obtenerCategorias = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return 0;
    }
};



