export const handleChange = (e, setFormData, formData) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
export const handleUpdate = async (e, formData, setStatus, update) => {
        e.preventDefault();
        setStatus(null);

        const payload = {
            name: formData.name,
            lastname: formData.lastname,
            email: formData.email,
            dni: formData.dni,
            phone: formData.phone,
            ...(formData.password && {
                password: formData.password,
                password_confirmation: formData.password_confirmation
            })
        };

        const result = await update(payload);
        setStatus(result ? 'success' : 'error');
};


export const disableAccount = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2'));
  
  if (!accountData || !accountData.user) return;

  try {
    // Usamos el ID o el mail según tu API, aquí uso el ID que es más común en DELETE
    const res = await fetch(`http://localhost/public/api/user/${accountData.user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("No se pudo borrar la cuenta. Inténtalo de nuevo.");
      console.error("Disable failed", res.status);
      return;
    }

    // Si todo va bien, limpiamos y redirigimos
    localStorage.removeItem('account2');
    localStorage.removeItem('token2');
    window.location.href = "/"; // Redirección forzada para limpiar el estado global

  } catch (err) {
    console.error("Error disabling account:", err);
    alert("Hubo un error en la conexión.");
  }
};

// Agrega esta función o actualiza la existente en fetches.js

export const handleSubmit = async (e, setError, navigate, emailOrData, password) => {
    e.preventDefault();
    
    // Si context es una función, es setError (Login)
    // Si emailOrData es un objeto, es Register
    const isRegister = typeof emailOrData === 'object';
    
    setError('');

    const url = isRegister 
        ? 'http://localhost/public/api/register' 
        : 'http://localhost/public/api/login';

    const body = isRegister 
        ? JSON.stringify(emailOrData) 
        : JSON.stringify({ email: emailOrData, password });

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });

        const data = await res.json();

        if (res.ok) {
            // En ambos casos solemos recibir token y user
            localStorage.setItem('token2', data.token);
            localStorage.setItem('account2', JSON.stringify(data));
            navigate('/');
        } else {
            // Manejo de errores de validación de Laravel (ej: email ya tomado)
            const errorMessage = data.message || (data.errors ? Object.values(data.errors)[0][0] : 'Error en la operación');
            setError(errorMessage);
        }
    } catch (err) {
        console.error(err);
        setError('Error de conexión con el servidor');
    }
};



export const logout = async () => {
  const token = localStorage.getItem('token2');
  
  try {
    const res = await fetch('http://localhost/public/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error("Logout failed", res.status);
    }

  } catch (err) {
    console.error("Error logging out:", err);
  } finally {
    // Clear localStorage and redirect after request completes
    localStorage.removeItem('account2');
    localStorage.removeItem('token2');
    window.location.reload(); // or navigate('/')
  }
};


export const leaveComment = async() =>{
  
}

export const update = async (userData) => {
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};
  const url = `http://localhost/public/api/user/${accountData.user.id}`;
  console.log("Updating user with data:", accountData.user.id); // Debug
  console.log("Using token:", token); // Debug
  console.log("Url:", url); // Debug
  
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      console.error("Update failed", res.status);
      return null;
    }
    const data = await res.json();
    // Update localStorage with new data
    localStorage.setItem('account2', JSON.stringify({ ...accountData, user: { ...accountData.user, ...userData } }));
    return data;
  } catch (err) {
    console.error("Error updating:", err);
  }
};