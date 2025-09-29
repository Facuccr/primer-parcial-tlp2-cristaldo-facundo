import { UserModel } from "../models/mongoose/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      profile: profile,
    });

    if (newUser) {
      res.status(201).json({
        ok: true,
        msg: "usario creado correctamente",
        data: newUser,
      });
    }
    // TODO: crear usuario con password hasheada y profile embebido

    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, msg: "credenciales incorrectas" });
    }
    const validatePassword = await comparePassword(password, user.password);
    if (!validatePassword) {
      return res
        .status(401)
        .json({ ok: false, msg: "credenciales incorrectas" });
    }

    //crear token:
    const token = signToken({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ msg: "login exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    const user = req.user;

    const userProfile = await UserModel.findOne({ _id: user.id }).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({ msg: "user no encontrado" });
    }

    return res.status(200).json({ ok: true, data: userProfile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
