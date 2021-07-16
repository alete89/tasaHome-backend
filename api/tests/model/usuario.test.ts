import { Usuario } from "../../models/usuario";

describe('Usuario', () => {

  const hoy = new Date()
  const hace20Anios = new Date((hoy.getFullYear() - 20), 1, 1)

  let usuario: Usuario

  beforeEach(() => {
    usuario = new Usuario({ nombre: "Carlos", apellido: "Gomez", email: "Carlos@gmail.com", genero: "Masculino", fecha_nacimiento: hace20Anios, contrasenia: "12345678" })
  })

  describe('válido', () => {
    test('tiene campos requeridos y su nombre, apellido contraseña y edad pasan validaciones ', () => {
      expect(() => usuario.validar()).not.toThrow()
    })

  })

  describe('inválido...', () => {

    test('no tiene nombre', () => {
      usuario.nombre = undefined!
      expect(() => usuario.validar()).toThrow('Debe ingresar nombre')
    })

    test('no tiene apellido', () => {
      usuario.apellido = undefined!
      expect(() => usuario.validar()).toThrow('Debe ingresar apellido')
    })
    test('no tiene email', () => {
      usuario.email = undefined!
      expect(() => usuario.validar()).toThrow('Debe ingresar email')
    })
    test('no tiene genero', () => {
      usuario.genero = undefined!
      expect(() => usuario.validar()).toThrow('Debe ingresar genero')
    })
    test('no tiene contraseña', () => {
      usuario.contrasenia = undefined!
      expect(() => usuario.validar()).toThrow('Debe ingresar contraseña')
    })

    test('su contraseña es muy corta', () => {
      usuario.contrasenia = "1"
      expect(() => usuario.validar()).toThrow('La contraseña debe tener al menos 8 carácteres')
    })

    test('su contraseña tiene 7 caracteres', () => {
      usuario.contrasenia = "1234567"
      expect(() => usuario.validar()).toThrow('La contraseña debe tener al menos 8 carácteres')
    })

    test('su contraseña es muy larga', () => {
      usuario.contrasenia = [...Array(100)].map(() => "a").join('')
      expect(() => usuario.validar()).toThrow('La contraseña no puede tener más de 72 carácteres')
    })

    test('su contraseña tiene 73 caracteres', () => {
      usuario.contrasenia = [...Array(73)].map(() => "a").join('')
      expect(() => usuario.validar()).toThrow('La contraseña no puede tener más de 72 carácteres')
    })

    test('tiene menos de 18 años', () => {
      usuario.fecha_nacimiento = new Date()
      expect(() => usuario.validar()).toThrow('Debe ser tener más de 18 años')
    })
    test('tiene más de 100 años', () => {
      const hace101Anios = new Date((new Date().getFullYear() - 101), 1, 1)
      usuario.fecha_nacimiento = hace101Anios
      expect(() => usuario.validar()).toThrow("La edad debe ser menor a 100")
    })

  })


})