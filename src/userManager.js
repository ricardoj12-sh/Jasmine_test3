export default class UserManager {
    constructor() {
      this.users = [];
    }
  
    addUser(name, email, age) {
      if (!name || !email || age < 18) {
        throw new Error("Datos inválidos. El usuario debe tener nombre, email y ser mayor de edad.");
      }
      const user = { id: this.users.length + 1, name, email, age };
      this.users.push(user);
      return user;
    }
  
    getUserById(id) {
      return this.users.find(user => user.id === id) || null;
    }
  
    getAllUsers() {
      return this.users;
    }
  
    deleteUser(id) {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) {
        throw new Error("Usuario no encontrado.");
      }
      return this.users.splice(index, 1)[0];
    }
  
    //Nuevo método: Obtener usuario de una API externa
    async fetchUserById(id) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error("Usuario no encontrado en la API");
        }
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }