import { tasacion as unaTasacion } from "../../app/constantes"
import { Tasacion } from "../../models/tasacion"

describe('Tasación', () => {

    let tasacion: Tasacion

    beforeEach(() => {
        tasacion = new Tasacion(unaTasacion)
    })

    describe('válida', () => {
        test('pasa validaciones', () => {
            expect(() => tasacion.validar()).not.toThrow()
        })
        test('calcular valor', () => {
            expect(tasacion.calcularValor(1000)).toBe(343147)
        })
    })
    describe('inválida', () => {
        test('no tiene ambientes', () => {
            tasacion.ambientes = undefined!
            expect(() => tasacion.validar()).toThrow('Debe ingresar cantidad de ambientes')
        })

        test('no tiene superficie', () => {
            tasacion.superficie = undefined!
            expect(() => tasacion.validar()).toThrow('Debe ingresar superficie')
        })
        test('no tiene estado', () => {
            tasacion.estado = undefined!
            expect(() => tasacion.validar()).toThrow('Debe ingresar estado')
        })
        test('no tiene tipo de operación', () => {
            tasacion.tipoDeOperacion = undefined!
            expect(() => tasacion.validar()).toThrow('Debe ingresar tipo de operación')
        })
        test('no tiene tipo de propiedad', () => {
            tasacion.tipoDePropiedad = undefined!
            expect(() => tasacion.validar()).toThrow('Debe ingresar tipo de propiedad')
        })

        test('no tiene dirección', () => {
            tasacion.direccion = undefined!
            expect(() => tasacion.validar()).toThrow('Debe ingresar dirección')
        })
        test('tiene menos de 1 ambiente', () => {
            tasacion.ambientes = 0
            expect(() => tasacion.validar()).toThrow('Los ambientes deben ser un valor entre 1 y 15')
        })

        test('tiene más de 15 ambientes', () => {
            tasacion.ambientes = 16
            expect(() => tasacion.validar()).toThrow('Los ambientes deben ser un valor entre 1 y 15')
        })

        test('la superficie es menor a 15', () => {
            tasacion.superficie = 14
            expect(() => tasacion.validar()).toThrow('La superficie debe ser un valor entre 15 y 2000')
        })

        test('la superficie es mayor a 2000', () => {
            tasacion.superficie = 2001
            expect(() => tasacion.validar()).toThrow('La superficie debe ser un valor entre 15 y 2000')
        })

    })

})