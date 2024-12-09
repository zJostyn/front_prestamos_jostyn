import axios from 'axios';

const API_URL = 'https://back-prestamos-jostyn.onrender.com/estudiantes';

export const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return 0;
    }
};

export const verificarEstudiante = async (cedula: string, sancionado: string) => {
  try {
      const response = await axios.post(`${API_URL}/get`, {
          cedula, sancionado
      });
      return response.data;
  } catch (error) {
      console.log(error);
  }
};

export const crearEstudiante = async (estudiante: {
    cedula: string;
    nombre: string;
    apellido: string;
    sexo: string;
    fechanacimiento: string;
    sancionado: string;
  }) => {
  try {
      const response = await axios.post(`${API_URL}/create`, estudiante);
      return response.data;
  } catch (error) {
      console.error('Error al crear el estudiante:', error);
      throw error;
  }
};

export const actualizarEstudiante = async (estudiante: {
  cedula: string;
  nombre: string;
  apellido: string;
  sexo: string;
  fechanacimiento: string;
}) => {
  try {
      const response = await axios.put(`${API_URL}/update`, estudiante);
      return response.data;
  } catch (error) {
      console.error('Error al actualizar el estudiante:', error);
      throw error;
  }
};

export const eliminarEstudiante = async (cedula: string) => {
  try {
      const response = await axios.delete(`${API_URL}/delete`, {
          data: { cedula },
      });
      return response.data;
  } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
      throw error;
  }
};

export const sancionarEstudiante = async (cedula: string, sancionado: string) => {
  try {
      const response = await axios.put(`${API_URL}/sanction`, {
          cedula,
          sancionado,
      });
      return response.data;
  } catch (error) {
      console.error('Error al sancionar el estudiante:', error);
      throw error;
  }
};
