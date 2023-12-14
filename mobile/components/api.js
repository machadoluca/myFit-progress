import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registerUser(name, email, password) {
  try {
    const response = await fetch('http://localhost:3000/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro desconhecido');
    }

    return { success: true };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return { error: error.message };
  }
}


export async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      console.log('Login bem-sucedido');
      await AsyncStorage.setItem('userToken', data.token);
      return data; 
    } else {
      console.error('Erro ao fazer login');
      return null; 
    }
  } catch (error) {
    console.error('Erro na solicitação de login:', error);
    return null; 
  }
}

export async function verifyTokenOnServer() {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    if (!userToken) {
      throw new Error('Token não encontrado no AsyncStorage');
    }

    const response = await fetch('http://localhost:3000/users/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`, 
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data; 
    } else {
      throw new Error('Erro ao verificar token no servidor');
    }
  } catch (error) {
    console.error('Erro ao verificar token com o servidor:', error);
    throw error;
  }
}

export async function getUserDetails() {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch('http://localhost:3000/users/???', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data; 
    } else {
      throw new Error('Erro ao buscar detalhes do usuário');
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do usuário:', error);
    throw error;
  }
}

export async function updateProfile(name, weight, image) {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('weight', weight);
    formData.append('profileImage', {
      uri: image.uri,
      type: image.type,
      name: 'profileImage.jpg',
    });

    const response = await fetch('http://localhost:3000/users/update-profile', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro ao atualizar perfil');
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw error;
  }
}

export async function saveExercises(selectedExercises, dayOfWeek) {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(dayOfWeek)

    const response = await fetch('http://localhost:3000/users/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ selectedExercises, dayOfWeek }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Erro ao salvar exercícios:', error);
    return null;
  }
}

export async function getExercisesFromServer() {
  try {
    const response = await fetch('http://localhost:3000/exercises');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar exercícios do servidor:', error);
    return null;
  }
}

export async function getScheduleByDayOfWeek(weekDay) {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(`http://localhost:3000/users/schedule?weekDay=${weekDay}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.scheduleExercises;
    } else {
      throw new Error('Erro ao buscar agenda de exercícios');
    }
  } catch (error) {
    console.error('Erro ao buscar agenda de exercícios:', error);
    throw error;
  }
}