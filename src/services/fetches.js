
export const handleChange = (e, setFormData, formData) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



export const handleSubmitPost = async (e, postContent, imageFile, setPostSuccess) => {
  e.preventDefault();
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};

  if (!token || !accountData.user) {
    setPostSuccess('Debes estar autenticado para publicar');
    return;
  }

  try {
    // 1. Crear el post
    const res = await fetch(`http://localhost/public/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: postContent, user_id: accountData.user.id })
    });

    if (!res.ok) {
      setPostSuccess('Error al publicar');
      return;
    }

    const data = await res.json();
    const postId = data.data.id;

    // 2. Si hay imagen, subirla
    if (imageFile) {
      const formData = new FormData();
      formData.append('file_path', imageFile);

      const imgRes = await fetch(`http://localhost/public/api/posts/${postId}/image`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
          // No pongas Content-Type aquí, FormData lo gestiona solo
        },
        body: formData
      });

      if (!imgRes.ok) {
        setPostSuccess('Post creado pero error al subir la imagen');
        return;
      }
    }

    setPostSuccess('Post publicado con éxito');
  } catch (err) {
    console.error("Error submitting post:", err);
    setPostSuccess('Error al publicar');
  }
};




export const handleUpdate = async (e, formData, setStatus) => {
        e.preventDefault();
        console.log("Updating with data:", formData); // Debug
        setStatus(null);
            const token = localStorage.getItem('token2');
        const accountData = JSON.parse(localStorage.getItem('account2'));
        const payload = {
            name: formData.name,
            lastname: formData.lastname,
            email: formData.email,
            dni: formData.dni,
            phone: formData.phone,
            tier_id: formData.tier_id,
            ...(formData.password && {
                password: formData.password,
                password_confirmation: formData.password_confirmation
            })
        };
      console.log("Payload for update:", payload); // Debug
       const res = await fetch(`http://localhost/public/api/users/${accountData.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        setStatus(res ? 'success' : 'error');
};



export const handleSubmitComment = async (e, postId, commentText, setCommentSuccess) => {
  e.preventDefault();
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};
 if (!token || !accountData.user) {
    setCommentError('Debes estar autenticado para comentar');
    return;
  }
  try {
    const res = await fetch(`http://localhost/public/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: commentText, post_id: postId })
    });
    if (!res.ok) {
      setCommentSuccess(false);
      return;
    }
    setCommentSuccess(true);
  } catch (err) {
    console.error("Error submitting comment:", err);
    setCommentSuccess(false);
  }
};


export const handleDeleteComment = async (e, commentId) => {
  e.preventDefault();
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};
 if (!token || !accountData.user) {
    return;
  }
  try {
    const res = await fetch(`http://localhost/public/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      return;
    }
  } catch (err) {
    console.error("Error submitting comment:", err);
  }
};


export const checkFollow = async ( userId) => {
  try {
    const token = localStorage.getItem('token2');
    const res = await fetch(`http://localhost/public/api/followers/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error checking user:", err);
    return null;
  }
}

export const checkUser = async (userId) => {
  try {
    const token = localStorage.getItem('token2');
    const res = await fetch(`http://localhost/public/api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error checking user:", err);
    return null;
  }
}





export const checkPremium = async () => {
  
  try {
    const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2'));
  console.log(`http://localhost/public/api/user/${accountData.user.id}/is_tier_premium`); // Debug
    const res = await fetch(`http://localhost/public/api/user/${accountData.user.id}/is_tier_premium`, {
      headers: {
        'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`

      },
    });
    const data = await res.json();
    // console.log(data.is_premium); // Debug
    return data.is_premium;
} catch (err) {
    console.error("Error checking premium status:", err);
    return false;
  }
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

export const followUser = async (e, follow, userId) => {
  e.preventDefault();
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};
    if (follow){
      const res = await fetch(`http://localhost/public/api/followers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        following_id: userId
        })
    });
    if (!res.ok) {
      console.error("Follow/Unfollow failed", res.status);
    }
   
    }
    else {      
      const res = await fetch(`http://localhost/public/api/followers/${userId}`, {
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });   
}};
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





export const fetchPosts = async (setPosts, setLoading, setError) => {
  try {
      const token = localStorage.getItem('token2');

    console.log("Fetching posts..."); // Debug
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost/public/api/posts", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log("Response status:", response.status); // Debug

    if (!response.ok) {
      throw new Error(`Cuenta necesaria para ver los posts (status ${response.status})`);
    }

    const data = await response.json();
    console.log("Data received:", data); // Debug

    if (data.data) {
      // Si es Resource::collection
      setPosts(data.data);
    } else if (Array.isArray(data)) {
      // Si es un array directo
      setPosts(data);
    } else {
      console.error("Formato de datos inesperado:", data);
      setPosts([]);
    }
  } catch (err) {
    setError(err.message);
    console.error("Error fetching posts:", err);
    setPosts([]);
  } finally {
    setLoading(false);
  }
}





export const leaveComment = async (postId, commentText, setCommentError, setCommentSuccess) => {
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};
  
  if (!token || !accountData.user) {
    setCommentError('Debes estar autenticado para comentar');
    return;
  }

  try {
    const res = await fetch(`http://localhost/public/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        content: commentText
      })
    });

    if (!res.ok) {
      const data = await res.json();
      setCommentError(data.message || 'Error al dejar el comentario');
      return;
    }

    const data = await res.json();
    setCommentSuccess('Comentario añadido exitosamente');
    return data;
  } catch (err) {
    console.error("Error leaving comment:", err);
    setCommentError('Error de conexión');
  }
}






export const likePost = async (liked, postId, likeId) => {
  const token = localStorage.getItem('token2');
  const accountData = JSON.parse(localStorage.getItem('account2')) || {};
  const url = liked ? 'http://localhost/public/api/likes' : `http://localhost/public/api/likes/${likeId}`;
  try {
    if (liked){
      const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post_id: postId
        })
    });
    if (!res.ok) {
      console.error("Like/Unlike failed", res.status);
    }
    }
    else {      
      const res = await fetch(url, {
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
       body: JSON.stringify({
        like_id: likeId 
      })
      });
      if (!res.ok) {
      console.error("Like/Unlike failed", res.status);
    }
    }

  } catch (err) {
    console.error("Error like/unlike:", err);
  }
} 






export const fetchPostById = async (postId, setPost, setLoading, setError) => {
  try {
    const token = localStorage.getItem('token2');
    
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost/public/api/posts/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el post (status ${response.status})`);
    }

    const data = await response.json();
    
    if (data.data) {
      setPost(data.data);
    } else {
      setPost(data);
    }
  } catch (err) {
    setError(err.message);
    console.error("Error fetching post:", err);
  } finally {
    setLoading(false);
  }
};