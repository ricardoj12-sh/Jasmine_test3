import UserManager from "../src/userManager.js";

describe("Pruebas de la clase UserManager", () => {
  let userManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  it("Debe agregar un usuario correctamente", () => {
    const user = userManager.addUser("Juan Pérez", "juan@example.com", 25);
    
    console.log("✅ Usuario agregado:", user); //Mensaje en consola

    expect(user).toEqual(jasmine.objectContaining({
      name: "Juan Pérez",
      email: "juan@example.com",
      age: 25
    }));
    expect(userManager.getAllUsers().length).toBe(1);
  });

  it("Debe lanzar un error si los datos del usuario son inválidos", () => {
    expect(() => userManager.addUser("", "juan@example.com", 25)).toThrowError("Datos inválidos. El usuario debe tener nombre, email y ser mayor de edad.");
    expect(() => userManager.addUser("Juan", "", 25)).toThrowError("Datos inválidos. El usuario debe tener nombre, email y ser mayor de edad.");
    expect(() => userManager.addUser("Juan", "juan@example.com", 16)).toThrowError("Datos inválidos. El usuario debe tener nombre, email y ser mayor de edad.");
  });

  it("Debe obtener un usuario por ID", () => {
    const user = userManager.addUser("Ana López", "ana@example.com", 30);
    const foundUser = userManager.getUserById(user.id);

    console.log("🔍 Usuario encontrado por ID:", foundUser); // Mensaje en consola

    expect(foundUser).toEqual(user);
  });

  it("Debe devolver null si el usuario no existe", () => {
    const result = userManager.getUserById(99);

    console.log("❌ Usuario no encontrado (esperado null):", result); //Mensaje en consola

    expect(result).toBeNull();
  });

  it("Debe devolver todos los usuarios", () => {
    userManager.addUser("Pedro", "pedro@example.com", 28);
    userManager.addUser("Laura", "laura@example.com", 22);

    const users = userManager.getAllUsers();

    console.log("📋 Lista de usuarios:", users); //Mensaje en consola

    expect(users.length).toBe(2);
  });

  it("Debe eliminar un usuario correctamente", () => {
    const user = userManager.addUser("Carlos", "carlos@example.com", 40);
    const deletedUser = userManager.deleteUser(user.id);

    console.log("🗑️ Usuario eliminado:", deletedUser); //Mensaje en consola

    expect(deletedUser).toEqual(user);
    expect(userManager.getAllUsers().length).toBe(0);
  });

  it("Debe lanzar un error si se intenta eliminar un usuario inexistente", () => {
    expect(() => userManager.deleteUser(99)).toThrowError("Usuario no encontrado.");
  });

  // Nueva prueba: Obtener usuario desde la API externa
  it("Debe obtener un usuario de la API correctamente", async () => {
    const mockUser = {
      id: 1,
      name: "Leanne Graham",
      email: "leanne@example.com",
    };

    spyOn(global, "fetch").and.returnValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUser)
    }));

    const user = await userManager.fetchUserById(1);

    console.log("🌍 Usuario obtenido de la API:", user); // Mensaje en consola

    expect(user).toEqual(mockUser);
  });

  //Nueva prueba: Manejar error si el usuario no existe en la API
  it("Debe lanzar un error si el usuario no se encuentra en la API", async () => {
    spyOn(global, "fetch").and.returnValue(Promise.resolve({
      ok: false,
    }));

    console.log("⚠️ Intentando obtener usuario inexistente de la API..."); // Mensaje en consola

    await expectAsync(userManager.fetchUserById(999)).toBeRejectedWithError("Usuario no encontrado en la API");
  });
});
