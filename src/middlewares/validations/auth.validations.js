export const registerValidation = [
  // TODO: completar las validaciones para el registro
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario solo puede contener letras y números")
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({ email });
      if (emailExiste) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
    ),

  body("role")
    .optional()
    .isIn(["secretary", "administrator"])
    .withMessage("El rol debe ser 'secretary' o 'administrator'"),

  body("profile.first_name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo puede contener letras"),

  body("profile.last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El apellido debe tener entre 2 y 30 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El apellido solo puede contener letras"),

  body("profile.employee_number")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("profile.phone")
    .optional()
    .isURL()
    .withMessage("El avatar debe ser una URL válida"),
];

export const loginValidation = [
  // TODO: completar las validaciones para el login
];
