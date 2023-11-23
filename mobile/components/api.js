import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registerUser(name, email, password) {
  try {
    const response = await fetch('http://192.168.2.102:3000/users/create', {
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
    const response = await fetch('http://192.168.2.102:3000/login', {
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

/*export async function verifyTokenOnServer() {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    if (!userToken) {
      throw new Error('Token não encontrado no AsyncStorage');
    }

    const response = await fetch('http://192.168.2.102:3000/users', {
      method: 'POST',
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
*/
export async function saveExercises(selectedExercises) {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await fetch('http://192.168.2.102:3000/exercises/save-workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ selectedExercises }),
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
    const response = await fetch('http://192.168.2.102:3000/exercises');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar exercícios do servidor:', error);
    return null;
  }
}
