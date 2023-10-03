// Função para fazer a solicitação de login
export async function loginUser(email, password) {
  try {
    const response = await fetch('http://192.168.20.104:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      console.log('Login bem-sucedido');
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

